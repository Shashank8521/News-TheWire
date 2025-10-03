import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
//import { SafeAreaView } from "react-native";

function SmallBrandTitle(){
  return(
     
    <>
   
      <View style={{alignSelf:"center",height:80}}>
          <Text style={{fontSize:30, fontWeight:'800'}}> The WIRE </Text>
        </View>
  
</>
  )
}

export default function RootLayout() {
  return (
    <>
      <Stack 
      screenOptions={{ headerShown:false,
      
      headerTitle:()=><SmallBrandTitle/>,
       headerTitleAlign: "center",
      }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      
      <StatusBar style='inverted' />
   
    </>
  );
}
