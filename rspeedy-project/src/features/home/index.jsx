// src/features/home/index.jsx
/**
 * Home Feature Module
 * Feature ini akan di-load secara dynamic dan di-cache
 */

import { useEffect, useState } from 'react';

export default function HomeFeature() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    // Simulate API call
    setTimeout(() => {
      setData({
        title: 'Home Feature',
        description:
          'This feature is dynamically loaded from CDN and cached locally!',
        version: '1.0.0',
        features: [
          '✅ Dynamic loading dari CDN',
          '✅ Cached di local storage',
          '✅ Version control otomatis',
          '✅ Update on-demand',
        ],
      });
      setLoading(false);
    }, 500);
  }

  if (loading) {
    return (
      <view style={styles.container}>
        <text style={styles.loading}>Loading home...</text>
      </view>
    );
  }

  return (
    <view style={styles.container}>
      {/* Header */}
      <view style={styles.header}>
        <text style={styles.title}>{data.title}</text>
        <text style={styles.version}>v{data.version}</text>
      </view>

      {/* Description */}
      <text style={styles.description}>{data.description}</text>

      {/* Features List */}
      <view style={styles.featuresContainer}>
        <text style={styles.featuresTitle}>Features:</text>
        {data.features.map((feature, index) => (
          <text key={index} style={styles.featureItem}>
            {feature}
          </text>
        ))}
      </view>

      {/* Info Card */}
      <view style={styles.card}>
        <text style={styles.cardTitle}>ℹ️ How it works</text>
        <text style={styles.cardText}>
          1. App checks version dari CDN{'\n'}
          2. Download jika berbeda dengan local{'\n'}
          3. Cache di device untuk offline access{'\n'}
          4. Update hanya saat user trigger
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  version: {
    fontSize: 14,
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  featureItem: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    paddingLeft: 8,
  },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  cardText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
  loading: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 100,
  },
};
