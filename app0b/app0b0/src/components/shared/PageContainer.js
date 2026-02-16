// Layer Utama (Base Screen)
// Komponen ini menggunakan memo agar konten di dalamnya tidak di-render ulang secara tidak sengaja oleh sistem luar.

import React, { memo } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const PageContainer = memo(({ children, style }) => (
  <SafeAreaView style={styles.safe}>
    <View style={[styles.content, style]}>
      {children}
    </View>
  </SafeAreaView>
));

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, padding: 20 },
});

export default PageContainer;
