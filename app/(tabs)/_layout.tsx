import { Ionicons } from '@expo/vector-icons';
import { Navigator, Tabs, withLayoutContext } from "expo-router";
import { Text, View } from "react-native";

function SmallBrandTitle(){
  return(
     
    <>
   
      <View style={{alignSelf:"center",}}>
          <Text style={{fontSize:30, fontWeight:'800'}}> The WIR </Text>
        </View>
  
</>
  )
}
const TopTabs =withLayoutContext(Navigator)
export default function TabLayout() {
 
 return(
  <>
    <Tabs screenOptions={{ headerShown: false,
      headerStyle:{height:0},
      headerTitle:()=><SmallBrandTitle/>,
      headerTitleAlign: "center",
      sceneStyle :{backgroundColor:"#f6efdeff"}

    }}>
      
        <Tabs.Screen name="index" options={{ title: "Home" ,tabBarIcon:({color,size})=>(
          <Ionicons name="home-outline" size={size} color={color}/>
        )}} />
        <Tabs.Screen name="AUDI" options={{ title: "AUDI" ,tabBarIcon:({color,size})=>(
          <Ionicons name="headset-outline" size={size} color={color}/>
        )}} />
        <Tabs.Screen name="Video" options={{ title: "Video",tabBarIcon:({color,size})=>(
          <Ionicons name="videocam-outline" size={size} color={color}/>
        ) }} />
         <Tabs.Screen name="Live" options={{ title: "Live",tabBarIcon:({color,size})=>(
          <View>
          <Ionicons name="radio" size={size} color={color}/>
          <View style={{height:8,width:8,backgroundColor:"red",borderRadius:4,position:"absolute",top:-4,right:-6,borderWidth:1,borderColor:"white"}}></View>
          </View>
        ) }} />
        <Tabs.Screen name="more" options={{ title: "More",tabBarIcon:({color,size})=>(
        
          <Ionicons name="ellipse-outline" size={size} color={color}/>
         
        ) }} />
       
       <Tabs.Screen name="audio" options={{ title: "Audio", href:null}} />
        {/* <Tabs.Screen name="" options={{ title: "Audio", href:null}} /> */}

       <Tabs.Screen name="World" options={{title:"World", href:null}} />
         {/* <Tabs.Screen name="more" options={{ title: "More" }} /> */}
         {/* <Tabs.Screen name="AUDI" options={{ title: "AUDI" }} /> */}
         <Tabs.Screen name="politics" options={{ title: "Politics", href:null }} />


    </Tabs>
    </>
  )
}
