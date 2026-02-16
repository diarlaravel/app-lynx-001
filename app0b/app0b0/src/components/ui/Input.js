// Input Pintar (Text, Angka, Desimal)
// Komponen ini otomatis menyesuaikan keyboard berdasarkan tipe yang Anda minta.

import React, { memo } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const Input = memo(({ label, type = 'text', value, onChangeText, placeholder }) => {
  const keyboardType = type === 'number' ? 'number-pad' : type === 'decimal' ? 'decimal-pad' : 'default';

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="#999"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#FDFDFD' },
});

export default Input;
