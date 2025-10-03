import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
//import { SafeAreaView } from "react-native";

function SmallBrandTitle(){
  return(
     
    <>
   
      <View style={{alignSelf:"center",justifyContent:"center",height:50}}>
          <Text style={{fontSize:30, fontWeight:'800'}}> The WIRE </Text>
        </View>
  
</>
  )
}

export default function RootLayout() {
  return (
    <>
      <Stack 
      screenOptions={{ headerShown:true,
        
      // /headerStyle:{height:100},
      headerTitle:()=><SmallBrandTitle/>,
       headerTitleAlign: "center",
      }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      
      <StatusBar style='inverted' />
   
    </>
  );
}
