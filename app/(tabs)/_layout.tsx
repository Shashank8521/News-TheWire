import { Navigator, Tabs, withLayoutContext } from "expo-router";
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
const TopTabs =withLayoutContext(Navigator)
export default function TabLayout() {
 
 return(
  <>
    <Tabs screenOptions={{ headerShown: false,
      headerStyle:{height:80},
      headerTitle:()=><SmallBrandTitle/>,
      headerTitleAlign: "center",
      sceneStyle :{backgroundColor:"#f6efdeff"}

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
