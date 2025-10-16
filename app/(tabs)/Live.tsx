import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const [more,setMore]=useState(4)
  return (
    <SafeAreaView>
    <View className='pt-20'>
      <Text style={{fontSize: 30,color:"#350606ff"}}> hellow from Live {more}</Text>
      <Button title='Just in' onPress={()=>setMore(more+1)}></Button>
    </View>
    </SafeAreaView>
  )}