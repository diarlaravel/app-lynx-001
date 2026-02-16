// Button, Checkbox, & Badge
// Gunakan Pressable dari React Native Documentation karena lebih ringan dan responsif daripada TouchableOpacity

import React, { memo } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

// TOMBOL
export const Button = memo(({ title, onPress, color = '#007AFF' }) => (
  <Pressable 
    onPress={onPress} 
    style={({ pressed }) => [styles.btn, { backgroundColor: color, opacity: pressed ? 0.7 : 1 }]}
  >
    <Text style={styles.btnText}>{title}</Text>
  </Pressable>
));

// CHECKBOX
export const CheckButton = memo(({ checked, onChange, label }) => (
  <Pressable onPress={() => onChange(!checked)} style={styles.row}>
    <View style={[styles.box, checked && styles.boxChecked]} />
    <Text style={styles.label}>{label}</Text>
  </Pressable>
));

// BADGE
export const Badge = memo(({ text, color = '#FF3B30' }) => (
  <View style={[styles.badge, { backgroundColor: color }]}>
    <Text style={styles.badgeText}>{text}</Text>
  </View>
));

const styles = StyleSheet.create({
  btn: { padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 5 },
  btnText: { color: '#FFF', fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  box: { width: 22, height: 22, borderWidth: 2, borderColor: '#007AFF', borderRadius: 4, marginRight: 10 },
  boxChecked: { backgroundColor: '#007AFF' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, alignSelf: 'flex-start' },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
});
