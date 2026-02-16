// src/features/profile/index.jsx
/**
 * Profile Feature Module
 */

import { useEffect, useState } from 'react';

export default function ProfileFeature() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    // Simulate data loading
    setTimeout(() => {
      setProfile({
        name: 'Lynx User',
        email: 'user@example.com',
        version: '1.0.0',
        joinDate: '2026-02-16',
      });
    }, 300);
  }

  if (!profile) {
    return (
      <view style={styles.container}>
        <text style={styles.loading}>Loading profile...</text>
      </view>
    );
  }

  return (
    <view style={styles.container}>
      {/* Avatar */}
      <view style={styles.avatar}>
        <text style={styles.avatarText}>👤</text>
      </view>

      {/* Profile Info */}
      <view style={styles.infoCard}>
        <text style={styles.label}>Name</text>
        <text style={styles.value}>{profile.name}</text>
      </view>

      <view style={styles.infoCard}>
        <text style={styles.label}>Email</text>
        <text style={styles.value}>{profile.email}</text>
      </view>

      <view style={styles.infoCard}>
        <text style={styles.label}>Member Since</text>
        <text style={styles.value}>{profile.joinDate}</text>
      </view>

      <view style={styles.infoCard}>
        <text style={styles.label}>Feature Version</text>
        <text style={styles.value}>v{profile.version}</text>
      </view>

      {/* Status */}
      <view style={styles.statusCard}>
        <text style={styles.statusText}>✅ Profile loaded from cache</text>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  avatarText: {
    fontSize: 48,
  },
  infoCard: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  statusCard: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#2E7D32',
  },
  loading: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 100,
  },
};
