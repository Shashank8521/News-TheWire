import { Tabs } from "expo-router";
import { Text, View } from "react-native";


function SmallBrandTitle(){
  return(
     
    <>
   
      <View style={{alignSelf:"center",}}>
          <Text style={{fontSize:30, fontWeight:'800'}}> The WIRE </Text>
        </View>
  
</>
  )
}
export default function TabLayout() {
 
 return(
  <>
    <Tabs screenOptions={{ headerShown: true,
      headerStyle:{height:80},
      headerTitle:()=><SmallBrandTitle/>,
       headerTitleAlign: "center",
    }}>
        <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="video" options={{ title: "Video" }} />
       <Tabs.Screen name="audio" options={{ title: "Audio" }} />
         <Tabs.Screen name="more" options={{ title: "More" }} />
         <Tabs.Screen name="politics" options={{ title: "Politics" }} />


    </Tabs>
    </>
  )
}
