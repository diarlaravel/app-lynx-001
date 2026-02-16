// src/components/Loader.jsx
/**
 * Loading Component
 * Ditampilkan saat feature sedang di-load/download
 */

export default function Loader({ message = 'Loading...' }) {
  return (
    <view style={styles.container}>
      <view style={styles.spinner}>
        <text style={styles.spinnerText}>⏳</text>
      </view>
      <text style={styles.message}>{message}</text>
    </view>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  spinner: {
    marginBottom: 16,
  },
  spinnerText: {
    fontSize: 48,
    // Note: Lynx belum support animation, jadi pakai emoji statis
  },
  message: {
    fontSize: 16,
    color: '#666666',
  },
};
