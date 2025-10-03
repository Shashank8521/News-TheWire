import axios from "axios";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { JSX, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


interface Article {
  ID: number;
  post_date: string;
  post_content: string;
  post_title: string;
  featured_image: {source_url:string};
  featured_image_caption?: string;
  post_author_name?: { author_name: string; cd?: string; pl?: string }[];
  post_excerpt?: string;
}



export default function Politics():JSX.Element {
// const [articles, setArticles] = useState<Article | null>(null);
const[highlight,setHighlight]=useState<Record<string,Article>>({});
const[recent,setRecent]=useState<Record<string,Article>>({});
const[article1,setArticle1]=useState<Article | null>(null);
//    const [videoIds, setVideoIds] = useState<string[]>([]);
const [html, setHtml] = useState<string>("")
const [html2, setHtml2] = useState<string>("")
const [html1, setHtml1] = useState<string>("")
const { width } = useWindowDimensions(); // ✅ move inside component
const[fontLoaded]=useFonts({
    MyFontItalic:require("../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf"),
    MyFontBasic:require("../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
  //  MySuperBasic:require("../../assets/fonts/SpaceMono-Regular")
  })
//   const playerHeight = Math.round((width * 9) / 16);
var size
useEffect(() => {
    axios
    .get("https://wire-proxy-backend.onrender.com/law")
    .then((res) => {
        const first=(res.data)|| ""
        // setArticles(first.generic)
        // console.log(first.generic.length);
        setHighlight(first["highlights"]);
        setRecent(first["recent-stories"])
       

        // const postContent=articles.map[(data)=>]
        // setHtml(()=>first.generic.length)
        setHtml1(()=>first.highlights["0"].ID)
        // setHtml2(()=>first["recent-stories"]["0"])


        // setHighlight(()=>first.highlights.length);
        // size=first.recent-stories.length
        // setRecent(()=>first["recent-stories"]?.length ?? 0);
        //  const ids = extractYouTubeIdsFromHtml(postContent);
        // setVideoIds(ids);
        }
)
.catch((err) => console.error(err));
  
}, []);
//    const htmlWithoutIframes = html.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");



  const router = useRouter()

const handlePress =(article:Article)=>{
  router.push({
    pathname:"/(tabs)/audio",
    params:{article1:JSON.stringify(article)}
  })
}




  return (
  <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
    <SafeAreaView style={{ marginTop: 10 }}>
      <View style={{marginBottom:10}}>
      <View style={{ paddingHorizontal: 0,}}>
        <Text style={{ fontWeight: "bold", fontSize: 30, fontFamily: "MyFontBasic" }}>
          Articles from law
          </Text>
          <View>
            {Object.values(highlight).map((article: Article, index: number) => (
             <Pressable key={article.ID ?? index} onPress={()=>handlePress(article) }
    // android_ripple={{color:'#3b3c3eff'}} 
    style=
    {({pressed})=>
      [{flexDirection:"column",justifyContent:"center",backgroundColor:pressed ? "#1D4ED8":"#FFF",paddingTop:20,
    paddingBottom:10,
    marginBottom:5,
    borderBottomWidth:0.2,borderColor:"#444",shadowOpacity:0.1,elevation:2}]
  }>

        {/* {/* </Text>
        <Text style={{ fontWeight: "bold", fontSize: 30, fontFamily: "MyFontBasic" }}>
            {html}
            
        </Text> */}
        {/* <Text style={{fontWeight:"bold",fontSize:30,fontFamily:"MyFontBasic"}}>
            {html1}
        </Text>
        <Text style={{fontWeight:"bold",fontSize:30,fontFamily:"MyFontBasic"}}>
            {html2}
        </Text> */}
         {article?.featured_image?.source_url && (
        <Image
          source={{ uri: article.featured_image.source_url }}
          style={{
            width: width,
            height: width * 0.6,
            resizeMode: "cover",
          }}
        />
      )}
       <View style={{marginHorizontal:10 }}>
        <Text style={{ fontFamily:'MyBasicFont',paddingTop: 2, fontWeight: "bold", fontSize: 25 }}>
          {article?.post_title}
        </Text>

        {/* <Text style={{ marginTop: 15, marginBottom: 15 }}>
          {articles?.post_date}
        </Text> */}

        <Text style={{ fontSize: 15, fontWeight: "700", paddingBottom: 5 }}>
          {article?.post_author_name?.[0].author_name}
        </Text>
        </View>

        {/* <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "500", marginBottom: 10, fontFamily: "MyFontItalic" }}>
          {articles?.post_excerpt}
        </Text> */}
      {/* </View> */}

      
      </Pressable>
            ))}
      </View>
      
      
      
    <View>
    {Object.values(recent).map((article: Article, index: number) => (

    <Pressable key={article.ID ?? index} onPress={()=>handlePress(article) }
    // android_ripple={{color:'#1D4ED8'}} 
    style=
    {({pressed})=>
      [{flexDirection:"row",justifyContent:"center",backgroundColor:pressed ? "#1D4ED8":"#FFF",paddingTop:20,
    paddingRight:10,paddingBottom:10,
    marginRight:5,marginBottom:5,marginLeft:5,
    borderBottomWidth:0.2,borderColor:"#444",shadowOpacity:0.1,elevation:2}]
  }>
        {/* <View style={{flex:1,flexDirection:"row",paddingRight:20}}> */}
        <View style={{flex:1,flexDirection:"row",marginLeft:10}}>
        {article?.featured_image?.source_url && (
            <Image
            source={{uri:article.featured_image.source_url}}
            style={{width:50,height:80,flex:1}}/>
        )}
        {/* </View> */}
        <View style={{flex:2,justifyContent:"space-between",marginLeft:10}}>
            <Text style={{fontFamily:'MyBasicFOnt',fontWeight:'bold',fontSize:15}}>
                {article.post_title}
            </Text>
            <Text style={{fontSize:10,paddingTop:15}}>
                {article.post_date}
            </Text>
            {/* <Text style={{fontSize:5}}>
                {artic}
            </Text> */}
            {/* <Text style={{fontFamily:'MyBasicFOnt',fontSize:5}}>
                {article.}
            </Text> */}
        </View>
        </View>
         </Pressable>
        
  ))}
</View>

</View>
</View>


      {/* <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 10, color: "gray", marginTop: 4 }}>
          {articles?.featured_image_caption}
        </Text>

       
        <RenderHtml
          contentWidth={width}
          source={{ html: articles?.post_content ?? "" }}
          enableExperimentalBRCollapsing={true}
           baseStyle={{ fontFamily: "MyFontBasic" }}
            systemFonts={["MyFontBasic", "MyFontItalic"]} 
          tagsStyles={{
            p: {fontFamily: "MyFontBasic", fontWeight:'300',fontSize: 18, lineHeight: 24, marginBottom: 12, color: "#000" },
            strong: { fontFamily: "MyFontBasic", fontWeight: "900", color: "#111" },
            em: { fontFamily: "MyFontBasic", fontStyle: "italic",fontWeight:'bold', color: "#555" },
            h1: { fontFamily: "MyFontBasic",fontSize: 28, fontWeight: "bold", marginBottom: 12 },
            h2: { fontFamily: "MyFontBasic",fontSize: 24, fontWeight: "900", marginBottom: 10 },
            h3: { fontFamily: "MyFontBasic",fontSize: 20, fontWeight: "900", marginBottom: 8 },
            a: { color: "#1D4ED8", textDecorationLine: "underline" },
            blockquote: {
              borderLeftWidth: 4,
              borderLeftColor: "#ccc",
              paddingLeft: 12,
              fontStyle: "italic",
              color: "#444",
              marginVertical: 10,
            },
          }}
        />
          </View> */}

          {/* {videoIds.length > 0 ? (
        videoIds.map((id) => (
          <View key={id} style={{ width, height: playerHeight, marginBottom: 12, paddingRight:10, paddingLeft:10 }}>
            <YoutubePlayer height={playerHeight} play={false} videoId={id} />
          </View> */}
        {/* )) */}
      {/* ) : (
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: "gray" }}>No YouTube iframes found in content.</Text>
        </View>
      )} */}

    
    </SafeAreaView>
  </ScrollView>
)}
