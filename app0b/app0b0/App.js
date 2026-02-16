import React, { useState } from 'react';
import PageContainer from './src/components/shared/PageContainer';
import Input from './src/components/ui/Input';
import { Button, CheckButton, Badge } from './src/components/ui/Controls';

export default function App() {
  const [checked, setChecked] = useState(false);

  return (
    <PageContainer>
      <Badge text="NEW VERSION 2026" />
      
      <Input label="Nama Lengkap" placeholder="Ketik nama..." />
      <Input label="Umur" type="number" placeholder="0" />
      <Input label="Harga (Desimal)" type="decimal" placeholder="0.00" />
      
      <CheckButton 
        label="Setuju Syarat & Ketentuan" 
        checked={checked} 
        onChange={setChecked} 
      />
      
      <Button title="SUBMIT DATA" onPress={() => alert('Data Sent!')} />
    </PageContainer>
  );
}
