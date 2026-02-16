// src/components/UpdateButton.jsx
/**
 * Update Button Component
 * Panel untuk trigger version check & update
 */

export default function UpdateButton({
  onCheckUpdates,
  onUpdateAll,
  loading,
  stats,
}) {
  return (
    <view style={styles.container}>
      {/* Stats Display */}
      <view style={styles.statsContainer}>
        <text style={styles.statsText}>
          📦 Features: {stats.upToDate}/{stats.total} up to date
        </text>
        {stats.needUpdate > 0 && (
          <text style={styles.statsUpdate}>
            ⚠️ {stats.needUpdate} update(s) available
          </text>
        )}
      </view>

      {/* Buttons */}
      <view style={styles.buttons}>
        <view
          onClick={loading ? null : onCheckUpdates}
          style={[
            styles.button,
            styles.buttonPrimary,
            loading && styles.buttonDisabled,
          ]}
        >
          <text style={styles.buttonText}>
            {loading ? '⏳ Checking...' : '🔍 Check Updates'}
          </text>
        </view>

        {stats.needUpdate > 0 && (
          <view
            onClick={loading ? null : onUpdateAll}
            style={[
              styles.button,
              styles.buttonSuccess,
              loading && styles.buttonDisabled,
            ]}
          >
            <text style={styles.buttonText}>
              ⬇️ Update All ({stats.needUpdate})
            </text>
          </view>
        )}
      </view>
    </view>
  );
}

const styles = {
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statsContainer: {
    marginBottom: 12,
  },
  statsText: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  statsUpdate: {
    fontSize: 13,
    color: '#FF9500',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonSuccess: {
    backgroundColor: '#34C759',
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
};
