// src/utils/storage.js
/**
 * Storage Manager untuk handle persistent data
 * Menggunakan AsyncStorage API dari Lynx
 */

class StorageManager {
  constructor() {
    // Simulate AsyncStorage untuk development
    // Di production, ini akan menggunakan native AsyncStorage
    this.storage =
      typeof window !== 'undefined' && window.AsyncStorage
        ? window.AsyncStorage
        : this.createMockStorage();
  }

  // Mock storage untuk development
  createMockStorage() {
    const data = {};
    return {
      async setItem(key, value) {
        data[key] = value;
        console.log(`[Storage] Set: ${key} = ${value.substring(0, 50)}...`);
      },
      async getItem(key) {
        const value = data[key] || null;
        console.log(`[Storage] Get: ${key} = ${value ? 'found' : 'null'}`);
        return value;
      },
      async removeItem(key) {
        delete data[key];
        console.log(`[Storage] Remove: ${key}`);
      },
      async clear() {
        Object.keys(data).forEach((key) => delete data[key]);
        console.log('[Storage] Cleared all data');
      },
    };
  }

  /**
   * Save data ke storage
   * @param {string} key - Storage key
   * @param {any} value - Value to store (akan di-JSON.stringify)
   */
  async set(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await this.storage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('[Storage] Set error:', error);
      return false;
    }
  }

  /**
   * Get data dari storage
   * @param {string} key - Storage key
   * @returns {Promise<any|null>}
   */
  async get(key) {
    try {
      const jsonValue = await this.storage.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('[Storage] Get error:', error);
      return null;
    }
  }

  /**
   * Save version info untuk feature
   * @param {string} featureName - Nama feature (home, profile, settings)
   * @param {string} version - Version string (1.0.0)
   */
  async setVersion(featureName, version) {
    return await this.set(`version_${featureName}`, version);
  }

  /**
   * Get version info untuk feature
   * @param {string} featureName
   * @returns {Promise<string|null>}
   */
  async getVersion(featureName) {
    return await this.get(`version_${featureName}`);
  }

  /**
   * Save feature bundle code
   * @param {string} featureName
   * @param {string} bundleCode - Code dari CDN
   */
  async setFeatureBundle(featureName, bundleCode) {
    return await this.set(`bundle_${featureName}`, bundleCode);
  }

  /**
   * Get feature bundle code
   * @param {string} featureName
   * @returns {Promise<string|null>}
   */
  async getFeatureBundle(featureName) {
    return await this.get(`bundle_${featureName}`);
  }

  /**
   * Mark feature as cached
   * @param {string} featureName
   * @param {boolean} cached
   */
  async setCached(featureName, cached = true) {
    return await this.set(`cached_${featureName}`, cached);
  }

  /**
   * Check if feature is cached
   * @param {string} featureName
   * @returns {Promise<boolean>}
   */
  async isCached(featureName) {
    const cached = await this.get(`cached_${featureName}`);
    return cached === true;
  }

  /**
   * Remove specific key
   * @param {string} key
   */
  async remove(key) {
    try {
      await this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error('[Storage] Remove error:', error);
      return false;
    }
  }

  /**
   * Clear all storage (use with caution!)
   */
  async clearAll() {
    try {
      await this.storage.clear();
      console.log('[Storage] All data cleared');
      return true;
    } catch (error) {
      console.error('[Storage] Clear error:', error);
      return false;
    }
  }

  /**
   * Get all stored feature info
   * @returns {Promise<Object>}
   */
  async getAllFeatureInfo() {
    const features = ['home', 'profile', 'settings'];
    const info = {};

    for (const feature of features) {
      info[feature] = {
        version: await this.getVersion(feature),
        cached: await this.isCached(feature),
      };
    }

    return info;
  }
}

// Export singleton instance
export const storage = new StorageManager();
