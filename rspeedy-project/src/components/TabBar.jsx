// src/components/TabBar.jsx
/**
 * Tab Bar Component
 * Navigation untuk switch antar features
 */

export default function TabBar({ currentTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <view style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;

        return (
          <view
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <text style={styles.icon}>{tab.icon}</text>
            <text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </text>
          </view>
        );
      })}
    </view>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: 60,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    cursor: 'pointer',
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#007AFF',
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#666666',
  },
  labelActive: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
};
