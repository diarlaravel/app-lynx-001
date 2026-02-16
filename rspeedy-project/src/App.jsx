// src/App.jsx
/**
 * Main App Container
 * Orchestrates dynamic feature loading, tab navigation, and updates
 */

import { lazy, Suspense, useEffect, useState } from 'react';
import Loader from './components/Loader.jsx';
import TabBar from './components/TabBar.jsx';
import UpdateButton from './components/UpdateButton.jsx';
// Import features statically untuk development
// Untuk production, ini akan di-replace dengan dynamic loading dari CDN
import HomeFeature from './features/home/index.jsx';
import ProfileFeature from './features/profile/index.jsx';
import SettingsFeature from './features/settings/index.jsx';
import { storage } from './utils/storage.js';
import { updater } from './utils/updater.js';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [updateStats, setUpdateStats] = useState({
    total: 3,
    cached: 0,
    needUpdate: 0,
    upToDate: 0,
  });

  useEffect(() => {
    initializeApp();
  }, []);

  async function initializeApp() {
    console.log('[App] Initializing...');

    // Check cache status
    await checkCacheStatus();

    // Preload features jika belum di-cache
    await preloadFeatures();
  }

  async function checkCacheStatus() {
    const stats = await updater.getUpdateStats();
    setUpdateStats(stats);
    console.log('[App] Cache stats:', stats);
  }

  async function preloadFeatures() {
    // Untuk development, kita skip actual download
    // Karena features sudah di-import statically

    // Di production dengan CDN, uncomment ini:
    // const features = ['home', 'profile', 'settings']
    // for (const feature of features) {
    //   await updater.preloadFeature(feature)
    // }

    console.log('[App] Features preloaded (dev mode)');
  }

  async function handleCheckUpdates() {
    setLoading(true);
    console.log('[App] Checking for updates...');

    try {
      const results = await updater.checkAllVersions();

      let updatesAvailable = 0;
      for (const [feature, result] of Object.entries(results)) {
        if (result.needUpdate) {
          updatesAvailable++;
          console.log(`[App] Update available for ${feature}:`, result);
        }
      }

      if (updatesAvailable > 0) {
        alert(
          `🎉 ${updatesAvailable} update(s) available!\n\nClick "Update All" to download.`,
        );
      } else {
        alert('✅ All features are up to date!');
      }

      await checkCacheStatus();
    } catch (error) {
      console.error('[App] Update check failed:', error);
      alert(
        '❌ Failed to check updates. Please check your internet connection.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateAll() {
    setLoading(true);
    console.log('[App] Updating all features...');

    try {
      const results = await updater.updateAll();

      let successCount = 0;
      for (const [feature, result] of Object.entries(results)) {
        if (result.success && result.updated) {
          successCount++;
          console.log(`[App] ${feature} updated successfully`);
        }
      }

      if (successCount > 0) {
        alert(
          `✅ Successfully updated ${successCount} feature(s)!\n\nRestart the app to apply changes.`,
        );
      } else {
        alert('ℹ️ All features were already up to date.');
      }

      await checkCacheStatus();
    } catch (error) {
      console.error('[App] Update failed:', error);
      alert('❌ Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleTabChange(tabId) {
    console.log('[App] Switching to tab:', tabId);
    setCurrentTab(tabId);
  }

  function renderFeature() {
    // Di development, load features statically
    // Di production, ini akan load dari cache atau CDN
    switch (currentTab) {
      case 'home':
        return <HomeFeature />;
      case 'profile':
        return <ProfileFeature />;
      case 'settings':
        return <SettingsFeature />;
      default:
        return (
          <view style={styles.errorContainer}>
            <text style={styles.errorText}>Unknown feature: {currentTab}</text>
          </view>
        );
    }
  }

  return (
    <view style={styles.app}>
      {/* Header dengan info */}
      <view style={styles.header}>
        <text style={styles.headerTitle}>🚀 Lynx Dynamic App</text>
        <text style={styles.headerSubtitle}>
          Dynamic loading • Version control • CDN powered
        </text>
      </view>

      {/* Tab Navigation */}
      <TabBar currentTab={currentTab} onTabChange={handleTabChange} />

      {/* Feature Container */}
      <view style={styles.featureContainer}>
        <Suspense fallback={<Loader message="Loading feature..." />}>
          {renderFeature()}
        </Suspense>
      </view>

      {/* Update Panel */}
      <UpdateButton
        onCheckUpdates={handleCheckUpdates}
        onUpdateAll={handleUpdateAll}
        loading={loading}
        stats={updateStats}
      />
    </view>
  );
}

const styles = {
  app: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingTop: 40, // Safe area for status bar
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#E3F2FD',
  },
  featureContainer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
};
