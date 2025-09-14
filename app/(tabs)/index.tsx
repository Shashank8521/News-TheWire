import { Text, useWindowDimensions, View } from "react-native";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

const {width}=useWindowDimensions();

interface Article {
  ID?: number;
  post_date?: string;
  post_content: string;
  post_title: string;
  featured_image: [string, number, number, boolean];
  featured_image_caption?: string;
}

//const [article, setArticle] = useState<Article | null>(null);


export default function HomeScreen() {
 return(
<View>
    <Text>
      hellow from home
    </Text>
  </View>
 )
  ;
}
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


