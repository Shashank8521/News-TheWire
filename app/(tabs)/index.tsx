import { useNavigation, useRouter } from "expo-router";

import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { JSX } from "react/jsx-runtime";
//import { View } from "react-native-reanimated/lib/typescript/Animated";



interface Article {
  ID?: number;
  post_date?: string;
  post_content: string;
  post_title: string;
  featured_image: [string, number, number, boolean];
  featured_image_caption?: string;
}

//const [article, setArticle] = useState<Article | null>(null);
const BUTTONS = [
  { id: "news", label: "Home" },
  { id: "Politics", label: "Politics" },
  { id: "Economy", label: "Economy" },
  { id: "World", label: "World" },
  { id: "Security", label: "Security" },
  { id: "Law", label: "Law" },
  { id: "Science" , label: "Science" },
  { id: "Society", label: "Society" },
  { id: "Culture", label: "Culture" },
  { id: "more", label: "More" },
];


export default function HomeScreen():JSX.Element {
  const {width}=useWindowDimensions()
  const router=useRouter()
  const navigation=useNavigation
  const itemWidth=Math.min(Math.round(width/3))

  // const router = useRouter()

  const handlePress=(id:string)=>{
    router.push({
      pathname : '/[id]',
      params :{id}
    })
    
  }

return (
    // <SafeAreaView style={{ flex: 1}}>
    <>
      <View style={{ paddingTop: 0, paddingHorizontal: 4, flex: 1 }}>


         {/* <Text> hello from home</Text>
              <Text> hello from home</Text>
               <Text> hello from home</Text>
                <Text> hello from home</Text>

                 <Text> hello from home</Text>
                  <Text> hello from home</Text>
                   <Text> hello from home</Text>
                    <Text> hello from home</Text>
                     <Text> hello from home</Text>
                      <Text> hello from home</Text>
                       <Text> hello from home</Text> */}


        {/* Horizontal buttons */}
        <View style={{marginBottom: 2,flex:0}}>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={ { flexWrap:"wrap",alignItems:"flex-start",paddingLeft:1,paddingRight:1,}}
            // snapToInterval={itemWidth + 12} // optional snapping
            decelerationRate="fast"
          >
            {BUTTONS.map((b,i) => (
                <View key={b.id} style={{ flexDirection: "row", alignItems:"flex-start",justifyContent:'flex-start' }}>

              <Pressable
                key={b.id}
                style={({pressed})=>[styles.button,{borderBottomColor:pressed ? "#000" : "#fff",backgroundColor:pressed ? "#444" :"#08cc43ff" }]}
                onPress={() => handlePress(b.id)}
                // activeOpacity={0.75}
              >
                <Text style={{fontSize:15}}>{b.label}</Text>
              </Pressable>
              
            
             {/* {i < BUTTONS.length - 1 && (
       <View style={{
         width: 0,
         height: 0,
         backgroundColor: "#000", // light gray
                     // justifyContent:'center'
          alignSelf:"center",
                    }} />
             )
            } */}
            </View>
            ))
            }
            {/* <View>
             <Text> hello from home</Text>
              <Text> hello from home</Text>
               <Text> hello from home</Text>
                <Text> hello from home</Text>

                 <Text> hello from home</Text>
                  <Text> hello from home</Text>
                   <Text> hello from home</Text>
                    <Text> hello from home</Text>
                     <Text> hello from home</Text>
                      <Text> hello from home</Text>
                       <Text> hello from home</Text>
                       </View> */}
            </ScrollView>

          
        </View>

        {/* Rest of home content */}
        {/* <View >
          <Text style={{ color: "#444" }}>
            Your home page content goes here. The row above is only on the Home page.
          </Text>
        </View> */}
        <Text> hello from home</Text>
      </View>
      <View>
       <Text> hello from home10</Text>
       </View> 
       </>
    // </SafeAreaView>
  );
}


 const styles = StyleSheet.create({
  safe: { flex: 1},
  container: { paddingTop: 0, paddingHorizontal: 5, flex: 1 },
  heading: { fontSize: 10, fontWeight: "700", marginBottom: 2 },
  rowWrap: {marginBottom: 2,
  // alignItems: "center",
  },
  scrollContent: {
    alignItems: "center",
    paddingLeft:1,
    paddingRight:1,
    },
  // button: {
  // shadowOffset: { width: 0, height: 1 },
  //   },
  // buttonText: { fontSize: 15, fontWeight: "700", color: "#111" },
   button: {
    height: 25,
    marginRight: 2,
    // minWidth: "1%",
    // maxWidth:"100%",
    borderRadius: 1,
    backgroundColor: "#08cc43ff",
    justifyContent: "center",
    alignItems: 'center',
    alignSelf:"flex-start",
    // elevation: 2, // android shadow
    // shadowColor: "#000",
    // shadowOpacity: 0.06,
    // shadowOffset: { width: 0, height: 1 },
    // shadowRadius: 4,
    paddingHorizontal: 5,
    },
    buttonText:{
      fontSize: 30, fontWeight: "700", color: "#111"
    },
    // body: { marginTop: 1,  },
    verticalDivider: {
      width: 0,
      height: 0, // line height relative to button
      backgroundColor: "#fff", // light gray
      // justifyContent:'center'
      alignSelf:"center",
    },
    });
  


//  return(
// <View>
//     <Text>
//       hellow from home
//     </Text>
//   </View>
//  )
//   ;
// }
// import React from "react";
// import { View } from "react-native";
// import YoutubePlayer from "react-native-youtube-iframe";

// export default function MyVideo() {
//   return (
//     <View style={{ flex: 1 }}>
//       <YoutubePlayer
//         height={250}
//         play={false}
//         videoId={"MMyzDT12bQM"} // <-- Extract from your iframe src
//       />
//     </View>
//   );
// }
// import React from "react";
// import { Dimensions } from "react-native";
// import RenderHtml from "react-native-render-html";
// import YoutubePlayer from "react-native-youtube-iframe";

// const { width } = Dimensions.get("window");

// const renderers = {
//   iframe: ({ src }) => {
//     if (src.includes("youtube.com")) {
//       const videoId = src.split("/embed/")[1].split("?")[0];
//       return <YoutubePlayer height={250} play={false} videoId={videoId} />;
//     }
//     return null;
//   },
// };

// export default function MyHtmlRenderer({ htmlContent }) {
//   return <RenderHtml contentWidth={width} source={{ html: htmlContent }} renderers={renderers} />;
// }
// import React from "react";
// import { Platform, StyleSheet, View } from "react-native";
// import YoutubePlayer from "react-native-youtube-iframe";

// type Props = {
//   videoId: string; // YouTube video ID like "MMyzDT12bQM"
//   height?: number;
// };

// const YouTubeEmbed: React.FC<Props> = ({ videoId, height = 250 }) => {
//   if (Platform.OS === "web") {
//     // Render normal iframe on web
//     return (
//       <View style={styles.container}>
        
//         <iframe
//           width="100%"
//           height={height}
//           src={`https://www.youtube.com/embed/${videoId}`}
//           title="YouTube video player"
//           frameBorder={0}
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowFullScreen
//         />
//       </View>
//     );
//   }

//   // Render native player on Android/iOS
//   return (
//     <YoutubePlayer
//       height={height}
//       play={false}
//       videoId={videoId}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "50%",
//     alignItems: "center",
//   },
// });

// export default YouTubeEmbed;


