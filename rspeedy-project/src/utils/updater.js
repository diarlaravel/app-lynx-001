// src/utils/updater.js
/**
 * Update Manager untuk handle version checking & downloading
 * Features akan di-download dari CDN dan di-cache lokal
 */

import { storage } from './storage.js';

// CDN Base URL - GANTI INI dengan URL CDN Anda
const CDN_BASE = process.env.CDN_URL || 'https://username.github.io/my-app-cdn';

class UpdateManager {
  constructor() {
    this.features = ['home', 'profile', 'settings'];
    this.cdnBase = CDN_BASE;
  }

  /**
   * Check version untuk single feature
   * @param {string} featureName
   * @returns {Promise<{needUpdate: boolean, localVersion: string|null, remoteVersion: string}>}
   */
  async checkFeatureVersion(featureName) {
    try {
      console.log(`[Updater] Checking version for ${featureName}...`);

      // Fetch remote version dari CDN
      const versionUrl = `${this.cdnBase}/features/${featureName}/version.json`;
      const response = await fetch(versionUrl);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const remoteVersion = data.version;

      // Get local version
      const localVersion = await storage.getVersion(featureName);

      console.log(
        `[Updater] ${featureName}: Local=${localVersion}, Remote=${remoteVersion}`,
      );

      return {
        needUpdate: remoteVersion !== localVersion,
        localVersion,
        remoteVersion,
        changelog: data.changelog || [],
      };
    } catch (error) {
      console.error(
        `[Updater] Version check failed for ${featureName}:`,
        error,
      );
      return {
        needUpdate: false,
        localVersion: null,
        remoteVersion: 'unknown',
        error: error.message,
      };
    }
  }

  /**
   * Check version untuk semua features
   * @returns {Promise<Object>}
   */
  async checkAllVersions() {
    console.log('[Updater] Checking all feature versions...');
    const results = {};

    for (const feature of this.features) {
      results[feature] = await this.checkFeatureVersion(feature);
    }

    return results;
  }

  /**
   * Download feature bundle dari CDN
   * @param {string} featureName
   * @returns {Promise<{success: boolean, version?: string, error?: string}>}
   */
  async downloadFeature(featureName) {
    try {
      console.log(`[Updater] Downloading ${featureName}...`);

      // Download bundle
      const bundleUrl = `${this.cdnBase}/features/${featureName}/index.bundle.js`;
      const bundleResponse = await fetch(bundleUrl);

      if (!bundleResponse.ok) {
        throw new Error(
          `Failed to download bundle: ${bundleResponse.statusText}`,
        );
      }

      const bundleCode = await bundleResponse.text();

      // Get version info
      const versionInfo = await this.checkFeatureVersion(featureName);

      // Save ke storage
      await storage.setFeatureBundle(featureName, bundleCode);
      await storage.setVersion(featureName, versionInfo.remoteVersion);
      await storage.setCached(featureName, true);

      console.log(
        `[Updater] ${featureName} downloaded successfully (v${versionInfo.remoteVersion})`,
      );

      return {
        success: true,
        version: versionInfo.remoteVersion,
        message: 'Download successful',
      };
    } catch (error) {
      console.error(`[Updater] Download failed for ${featureName}:`, error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Update specific feature jika ada update
   * @param {string} featureName
   * @returns {Promise<{success: boolean, updated: boolean, message: string}>}
   */
  async updateFeature(featureName) {
    const check = await this.checkFeatureVersion(featureName);

    if (check.needUpdate) {
      console.log(
        `[Updater] Update available for ${featureName}, downloading...`,
      );
      const result = await this.downloadFeature(featureName);
      return {
        ...result,
        updated: result.success,
      };
    } else {
      console.log(`[Updater] ${featureName} already up to date`);
      return {
        success: true,
        updated: false,
        message: 'Already up to date',
      };
    }
  }

  /**
   * Update semua features yang perlu update
   * @returns {Promise<Object>}
   */
  async updateAll() {
    console.log('[Updater] Updating all features...');
    const results = {};

    for (const feature of this.features) {
      results[feature] = await this.updateFeature(feature);
    }

    return results;
  }

  /**
   * Get update statistics
   * @returns {Promise<{total: number, cached: number, needUpdate: number, upToDate: number}>}
   */
  async getUpdateStats() {
    const versions = await this.checkAllVersions();

    let cached = 0;
    let needUpdate = 0;
    let upToDate = 0;

    for (const [feature, info] of Object.entries(versions)) {
      const isCached = await storage.isCached(feature);

      if (isCached) cached++;
      if (info.needUpdate) needUpdate++;
      if (isCached && !info.needUpdate) upToDate++;
    }

    return {
      total: this.features.length,
      cached,
      needUpdate,
      upToDate,
    };
  }

  /**
   * Preload feature (download jika belum cached)
   * @param {string} featureName
   */
  async preloadFeature(featureName) {
    const isCached = await storage.isCached(featureName);

    if (!isCached) {
      console.log(`[Updater] Preloading ${featureName}...`);
      return await this.downloadFeature(featureName);
    }

    console.log(`[Updater] ${featureName} already cached`);
    return { success: true, message: 'Already cached' };
  }
}

// Export singleton instance
export const updater = new UpdateManager();
