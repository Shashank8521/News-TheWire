import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
//import { SafeAreaView } from "react-native";

;

function SmallBrandTitle(){
  return(
     
    <>
   
      <View style={{ flexDirection:"row",justifyContent:"center",height:50,marginTop:5}}>
          <Text style={{fontSize:30, fontWeight:'800'}}> The WIRE </Text>
        </View>
  
</>
  )
}




export function Butt(){
  const BUTTONS = [
  { id: "home", label: "Home" },
  { id: "politics", label: "Politics" },
  { id: "economy", label: "Economy" },
  { id: "world", label: "World" },
  { id: "security", label: "Security" },
  { id: "law", label: "Law" },
  { id: "science" , label: "Science" },
  { id: "society", label: "Society" },
  { id: "culture", label: "Culture" },
  // { id: "more", label: "More" },
]
const[activebutton,setActivebutton] = useState("home");

  const router = useRouter();

  const handlePress=(id:string)=>{
    if (id == "home"){
    router.push({
      pathname : "/(tabs)",
    })}
    else{
      router.push({
        pathname:"/(tabs)/World",
        params :{id}
      })
    }
   }

  

      
    
  
    return(
       <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={ { flexWrap:"wrap",alignItems:"flex-start",paddingLeft:0,paddingRight:0,}}
                  // snapToInterval={itemWidth + 12} // optional snapping
                  decelerationRate="fast"
                >
                  {BUTTONS.map((b,i) => (
                      <View key={b.id} style={{ flexDirection: "row", alignItems:"flex-start",justifyContent:'flex-start' }}>
      
                    <Pressable
                      key={b.id}
                      style={({pressed})=>[{
                        height:25,
                        marginRight:0,
                         borderRadius: 1,
                        //  backgroundColor: "#08cc43ff",
                          justifyContent: "center",
                          alignItems: 'center',
                          alignSelf:"flex-start",
                          paddingHorizontal: 5,
                          borderBottomWidth:5,
                          borderWidth:2,
                          borderColor:"#f6efdeff",
                          
                          borderBottomColor : activebutton === b.id ? "#ef1212ff" :pressed ? "#444" :"#f6d484ff" ,
                          backgroundColor:pressed ? "#444" :"#f6efdeff" }]}
                      onPress={() => {
                        setActivebutton(b.id) ;
                        handlePress(b.id)}
                      }
                      // activeOpacity={0.75}
                    >
                      <Text style={{fontSize:15}}>{b.label}</Text>
                    </Pressable>
                    </View>
                  )
    )
    
  }
  </ScrollView>
  
)
}
// 

export default function RootLayout() {
  // const router = useRouter();
  const router = useRouter()
 const handlePress2 = () => {
    router.push({
      pathname : "/menu"
    })
   }
  
  return (
    <>

      <Stack 

      screenOptions={{ headerShown:true,
        
      // /headerStyle:{height:100},
       headerLeft:() => (
        <Pressable
        onPress={handlePress2}
        style={{marginRight:10,}}>
           <Ionicons name="search" size={24} color="#0f0c0cff" />
        </Pressable>
       ),
      headerTitle:()=><SmallBrandTitle/>,
       headerTitleAlign: "center",
      
      }}>
        <Stack.Screen name="(tabs)" />
            <StatusBar style="dark" translucent={true} backgroundColor="#e90c0cff" />

      </Stack>

       <View
        style={{
          position: "absolute",
          top: 48, // adjust based on your header height
          left: 0,
          right: 0,
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <Butt />
      </View>
      
      
      
      

    </>
  );
}

