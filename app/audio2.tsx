import axios from "axios";
import { useFonts } from "expo-font";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import RenderHtml from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";

interface Article {
  ID?: number;
  post_date: string;
  post_content: string;
  post_title: string;
  featured_image: [string, number, number, boolean];
  featured_image_caption?: string;
  post_author_name?: { author_name: string; author_slug?: string; author_avatar?: string }[];
  post_excerpt?: string;
  post_name:string;
  date_time_display?:string;
  prime_category?:{name:string,slug:string}[]

}
interface Related {
  ID?: number;
  post_date: string;
  post_content: string;
  post_title: string;
  featured_image: string;
  featured_image_caption?: string;
  post_author_name?: string;
  date_time_display?:string;
  post_name:string;
  prime_category?:string

}
function extractYouTubeIdsFromHtml(html: string): string[] {
  const ids = new Set<string>();
  // handle common youtube URL formats (embed, youtu.be, watch?v=)
  const patterns = [
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/g,
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{6,})/g,
    /youtu\.be\/([A-Za-z0-9_-]{6,})/g,
    /v=([A-Za-z0-9_-]{6,})/g,
  ];
  for (const pat of patterns) {
    let m: RegExpExecArray | null;
    // eslint-disable-next-line no-cond-assign
    while ((m = pat.exec(html)) !== null) {
      if (m[1]) ids.add(m[1]);
    }
  }
  return Array.from(ids);
}

export default function Audio() {
  const [articles, setArticles] = useState<Article | null>(null);
  const [html, setHtml] = useState<string>("")
  
  const { width } = useWindowDimensions(); // ✅ move inside component
  const {article1} = useLocalSearchParams();
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [related,setRelated] = useState<Related[] >([]);

  let parsedarticle1:any = null;
  let parsedrelated:unknown = null;
// console.log(`article1 is this ${article1}`)
  try {
    // console.log(parsedarticle1)
    // console.log(JSON)
  parsedarticle1 = article1 ? JSON.parse(article1 as string) : null;
//   console.log(parsedarticle1)
} catch (err) {
  console.error("❌ Failed to parse article1:", article1, err);
}
// 

const category:string = parsedarticle1.prime_category[0].slug
const postname:string = parsedarticle1["post_name"]
  
  const[fontLoaded]=useFonts({
    MyFontItalic:require("../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf"),
    MyFontBasic:require("../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
  //  MySuperBasic:require("../../assets/fonts/SpaceMono-Regular")
  })
  // console.log(`parsed is this ${parsedarticle1}`)
const playerHeight = Math.round((width * 9) / 16);
const handlePress = ()=>{
  router.push({
    pathname:"/author",
    params:{
      author:JSON.stringify(articles?.post_author_name?.[0])
    }
  })
}
const handlePress2 = (related:Related)=>{
  const convertedRelated : Article ={
 ID: related.ID,
  post_date: related.post_date,
  post_content: related.post_content,
  post_title: related.post_title,
  featured_image: [related.featured_image, 0, 0, true],
  featured_image_caption:"",
  post_excerpt:"",
  post_name:related.post_name,
  post_author_name: related.post_author_name ? [{ author_name:related.post_author_name,author_slug : "", author_avatar : ""  }]:[],
  date_time_display:related.date_time_display,
  prime_category:related.prime_category ? [{name:related.prime_category,slug:related.prime_category}]:[]
  }
  router.push({
    pathname :"/(tabs)/audio",
    params:{article1:JSON.stringify(convertedRelated)}
  })
}
  useEffect(() => {
   
    if( !parsedarticle1 || !parsedarticle1?.["post_name"]  ){
    //   console.log(`parsed is not ready${parsedarticle1}`) 
      return
    }
    // console.log("Related:", related);

   
  const fetchData = async () => {
    try {  
  const [res1,res2] = await Promise.all([
    axios.get(`https://wire-proxy-backend.onrender.com/articles/${parsedarticle1["post_name"]}`),
    axios.get(`https://wire-proxy-backend.onrender.com/related/${encodeURIComponent(`${category}/${postname}`)}`)])
      // .then(
        setArticles(res1.data["post-detail"][0])
       
        const postContent=(res1.data?.post_content) ||"" 
        setHtml(postContent)
         const ids = extractYouTubeIdsFromHtml(postContent);
         if(ids){
        setVideoIds(ids);
         }
        setRelated(res2.data)
        }
     catch(err){
      console.log(err)
     };
    }

    fetchData()
      
      
}, []);


// console.log(related);
// {related.map((article: Related, index: number) => (console.log(`hellow from inside ${article}`)))}

  const htmlWithoutIframes = html.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");

  return (
  <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
    <SafeAreaView style={{ marginTop: 0 }}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 30, fontFamily: "MyFontBasic" }}>
          Articles from Express/
        </Text>

        <Text style={{ fontFamily:'MyBasicFont',paddingTop: 2, fontWeight: "bold", fontSize: 25 ,paddingLeft:6}}>
          {articles?.post_title}
        </Text>

        
        <Pressable onPress={handlePress}>
        <View style = {{flexDirection:"row",alignItems:"center"}}>
        <View style={{paddingLeft:6}}>
          <Image
          source={{uri:articles?.post_author_name?.[0].author_avatar}}
          style = {{width:35,height:35,borderRadius:30,borderWidth:1.5,borderColor:"#fff"}}/>
          </View>
          <View style={{flexDirection:"column",paddingLeft:10,paddingTop:10}}>

        <Text style={{ fontSize: 15, fontWeight: "700", paddingBottom: 0,paddingLeft:0 }}>
          {articles?.post_author_name?.[0].author_name}
        </Text>
        <Text style={{ marginTop: 0, marginBottom: 10,paddingTop:3,color:"#726d6dff" }}>
          {articles?.date_time_display}
         </Text>
        </View>
        </View>
        </Pressable>

      

        

        <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "500", paddingBottom: 20, fontFamily: "MyFontItalic",paddingLeft:6 }}>
          {articles?.post_excerpt}
        </Text>
      </View>

      {articles?.featured_image && (
        <Image
          source={{ uri: articles.featured_image[0] }}
          style={{
            width: width,
            height: width * 0.6,
            resizeMode: "cover",
          }}
        />
      )}

      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 10, color: "gray", marginTop: 4,paddingLeft:6}}>
          {articles?.featured_image_caption}
        </Text>
        <View style={{paddingLeft:6,paddingTop:30}}>
      
        <RenderHtml
          contentWidth={width}
          source={{ html: articles?.post_content ?? "" }}
          ignoredDomTags={['iframe']}
          enableExperimentalBRCollapsing={true}
           baseStyle={{ fontFamily: "MyFontBasic" }}
            systemFonts={["MyFontBasic", "MyFontItalic"]} 
          tagsStyles={{
            p: {fontFamily: "MyFontBasic", fontWeight:"normal",fontSize: 16, lineHeight: 24, marginBottom: 12, color: "#000" },
            strong: { fontFamily: "MyFontBasic", fontWeight: "900", color: "#111" },
            em: { fontFamily: "MyFontBasic", fontStyle: "italic",fontWeight:'bold', color: "#555" },
            h1: { fontFamily: "MyFontBasic",fontSize: 15, fontWeight: "bold", marginBottom: 12 },
            h2: { fontFamily: "MyFontBasic",fontSize: 23, fontWeight: "bold", marginBottom: 10 },
            h3: { fontFamily: "MyFontBasic",fontSize: 23, fontWeight: "bold", marginBottom: 8 },
            a: { color: "#920e19ff", textDecorationLine: "underline", },
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
        </View>
      </View>
      
      {videoIds.length > 0 ? (
        videoIds.map((id) => (
          <View key={id} style={{ width, height: playerHeight, marginBottom: 12, paddingRight:10, paddingLeft:10 }}>
            <YoutubePlayer height={playerHeight} play={false} videoId={id} />
          </View>
        ))
      ): (
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: "gray" }}></Text>
        </View>
      )}
   
        <View style={{paddingLeft:6}}>
        <Text style={{fontSize:30,fontWeight:"heavy",color:"#9c1717ff"}}>
          Related Articles
        </Text>


           {related.map((article: Related, index: number) => (
            
       
           <Pressable key={article.ID ?? index} onPress={()=>handlePress2(article) }
           // android_ripple={{color:'#1D4ED8'}} 
           style=
           {({pressed})=>
             [{flexDirection:"row",justifyContent:"center",backgroundColor:pressed ? "rgb(235, 210, 153)":"#f6efdeff",paddingTop:20,
           paddingRight:10,paddingBottom:10,
           marginRight:5,marginBottom:5,marginLeft:5,
           borderBottomWidth:0.2,borderColor:"#444",shadowOpacity:0.1,elevation:2}]
         }>
            
               <View style={{flex:1,flexDirection:"row",paddingRight:20}}>
               <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",marginLeft:10}}>
               {article?.featured_image && (
                   <Image
                   source={{uri:article.featured_image}}
                   style={{width:50,height:80,flex:1}}/>
               )}
               </View>

               <View style={{flex:2,justifyContent:"space-between",marginLeft:10,marginBottom:"auto"}}>
                   <View style={{ flex:1,flexDirection:"column",justifyContent:'space-between',alignItems:"flex-start"}}>
                      <Text style={{fontSize:15,fontWeight:"400",color:"#97032191",paddingBottom:8}}>
                       {article?.prime_category}
                       </Text>
                       <Text style={{fontFamily:'MyBasicFOnt',fontWeight:'bold',fontSize:15}}>
                       {article.post_title}
                        </Text>
                    {/* <Text style={{ fontSize: 10, paddingTop:8 }}>
                 {article?.post_author_name?.[0].author_name}
               </Text> */}
               </View>
                   {/* <Text style={{fontSize:10,paddingTop:15}}>
                       {article.post_date}
                   </Text> */}
                   
                   {/* <Text style={{fontSize:5}}>
                       {artic}
                   </Text> */}
                   {/* <Text style={{fontFamily:'MyBasicFOnt',fontSize:5}}>
                       {article.}
                   </Text> */}
               {/* </View>
               </View>
                </Pressable> */}
               
         {/* ))} */}
       {/* </View> */}
       </View>
       </View>
       </Pressable>
           ))}
       </View>
           
       
       
       

    </SafeAreaView>
  </ScrollView>
);
}