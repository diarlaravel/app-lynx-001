// src/features/settings/index.jsx
/**
 * Settings Feature Module
 */

import { useState } from 'react';
import { storage } from '../../utils/storage.js';

export default function SettingsFeature() {
  const [cacheInfo, setCacheInfo] = useState(null);
  const [clearing, setClearing] = useState(false);

  useState(() => {
    loadCacheInfo();
  }, []);

  async function loadCacheInfo() {
    const info = await storage.getAllFeatureInfo();
    setCacheInfo(info);
  }

  async function handleClearCache() {
    if (!confirm('Clear all cached features? App will need to re-download.')) {
      return;
    }

    setClearing(true);
    await storage.clearAll();
    alert('Cache cleared! Please check for updates.');
    await loadCacheInfo();
    setClearing(false);
  }

  return (
    <view style={styles.container}>
      <text style={styles.title}>Settings</text>

      {/* App Info */}
      <view style={styles.section}>
        <text style={styles.sectionTitle}>📱 App Information</text>
        <view style={styles.infoRow}>
          <text style={styles.infoLabel}>App Version</text>
          <text style={styles.infoValue}>1.0.0</text>
        </view>
        <view style={styles.infoRow}>
          <text style={styles.infoLabel}>Framework</text>
          <text style={styles.infoValue}>Lynx (ReactLynx)</text>
        </view>
      </view>

      {/* Cache Info */}
      <view style={styles.section}>
        <text style={styles.sectionTitle}>💾 Cache Status</text>
        {cacheInfo &&
          Object.entries(cacheInfo).map(([feature, info]) => (
            <view key={feature} style={styles.cacheRow}>
              <text style={styles.cacheFeature}>{feature}</text>
              <view style={styles.cacheDetails}>
                <text style={styles.cacheVersion}>
                  {info.version || 'Not cached'}
                </text>
                <text
                  style={
                    info.cached ? styles.cacheBadgeYes : styles.cacheBadgeNo
                  }
                >
                  {info.cached ? '✅ Cached' : '❌ Not cached'}
                </text>
              </view>
            </view>
          ))}
      </view>

      {/* Actions */}
      <view style={styles.section}>
        <text style={styles.sectionTitle}>⚙️ Actions</text>

        <view
          onClick={clearing ? null : handleClearCache}
          style={[
            styles.button,
            styles.buttonDanger,
            clearing && styles.buttonDisabled,
          ]}
        >
          <text style={styles.buttonText}>
            {clearing ? '🗑️ Clearing...' : '🗑️ Clear All Cache'}
          </text>
        </view>
      </view>

      {/* Info */}
      <view style={styles.infoBox}>
        <text style={styles.infoBoxText}>
          💡 Clearing cache will remove all downloaded features. You'll need to
          update again to re-download.
        </text>
      </view>
    </view>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000000',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
  },
  infoValue: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  cacheRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cacheFeature: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  cacheDetails: {
    alignItems: 'flex-end',
  },
  cacheVersion: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  cacheBadgeYes: {
    fontSize: 11,
    color: '#34C759',
  },
  cacheBadgeNo: {
    fontSize: 11,
    color: '#FF3B30',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    cursor: 'pointer',
  },
  buttonDanger: {
    backgroundColor: '#FF3B30',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  infoBoxText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 20,
  },
};
