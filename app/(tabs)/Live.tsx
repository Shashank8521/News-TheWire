import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function TabTwoScreen() {
  const [more,setMore]=useState(4)
  return (
    <View className='pt-20'>
      <Text> hellow from more {more}</Text>
      <Button title='audio increase' onPress={()=>setMore(more+1)}></Button>
    </View>
  )}