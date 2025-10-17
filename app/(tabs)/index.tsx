import axios from "axios";
import { useFonts } from "expo-font";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native";

import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import { View } from "react-native-reanimated/lib/typescript/Animated";



interface Article {
  ID?: number;
  post_date?: string | " ";
  post_content: string;
  post_title: string;
  // API returns a nested object for images; allow flexible shape
  featured_image?: {source_url?:string};
  post_excerpt?:string
  post_author_name?: { author_name: string; author_slug?: string; author_avatar?: string }[];
  featured_image_caption?: string;
  prime_category?:{name:string}[]

}

//const [article, setArticle] = useState<Article | null>(null);
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
  { id: "more", label: "More" },
];


export default function HomeScreen(){
  const { width }=useWindowDimensions()
  // const router=useRouter()
  const navigation=useNavigation()
  const itemWidth=Math.min(Math.round(width/3))
  const { id } = useLocalSearchParams<{id:string}>()
  // const [articles, setArticles] = useState<Article | null>(null);
  const[recent,setRecent]=useState<Record<string,Article>>({});
  const[highlight,setHighlight]=useState<Record<string,Article>>({});
  const[recentstoriesjustin,setRecentstoriesjustin]=useState<Record<string,Article>>({});
  const[videos,setVideos]=useState<Record<string,Article>>({});
  const[opinion,setOpinion]=useState<Record<string,Article>>({});



  const[editorschoice,setEditorschoice]=useState<Record<string,Article>>({});

  // const[article1,setArticle1]=useState<Article | null>(null);
  //    const [videoIds, setVideoIds] = useState<string[]>([]);
  const [html, setHtml] = useState<string>("")
  const [html2, setHtml2] = useState<string>("")
  const [html1, setHtml1] = useState<string>("")
  // const { width } = useWindowDimensions(); // ✅ move inside component
  const[fontLoaded]=useFonts({
      MyFontItalic:require("../../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf"),
      MyFontBasic:require("../../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
  })
  useEffect(() => {
  // if(!id){
  //   console.log("something wrogn")
  //   return
  // } 
    axios
    .get(`https://wire-proxy-backend.onrender.com/home`)
    .then((res) => {
        const first=(res.data)|| ""
        // setArticles(first.generic)
        // console.log(first.generic.length);
        setHighlight(first["featured"]);
        setRecent(first["highlights"]);
        setEditorschoice(first["editors-pick"]);
        setRecentstoriesjustin(first["recent-stories"])
        setVideos(first["videos"])
        setOpinion(first["opinion"])

        
       

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


const router = useRouter();
// const router2 = useRouter();

  const handlePress=(id:string)=>{
    router.push({
      pathname : "/World",
      params :{id}
    })
    
  }
  const handlePress2=(article1:Article)=>{
    router.push({
      pathname:"/(tabs)/audio",
      params:{article1:JSON.stringify(article1)}
    })
  }
  

return (
   <ScrollView>
     <SafeAreaView style={styles.safe}>
    <>
      <View style={{ paddingTop: 0, paddingHorizontal: 4, flex: 1 }}>


      


        {/* Horizontal buttons */}
        <View style={{marginBottom: 2,flex:0}}>

          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={ { flexWrap:"wrap",alignItems:"flex-start",paddingLeft:1,paddingRight:1,}}
            // snapToInterval={itemWidth + 12} // optional snapping
            decelerationRate="fast"
          > */}
            {/* {BUTTONS.map((b,i) => (
                <View key={b.id} style={{ flexDirection: "row", alignItems:"flex-start",justifyContent:'flex-start' }}> */}

              {/* <Pressable
                key={b.id}
                style={({pressed})=>[styles.button,{borderBottomColor:pressed ? "#000" : "#fff",backgroundColor:pressed ? "#444" :"#08cc43ff" }]}
                onPress={() => handlePress(b.id)}
                // activeOpacity={0.75}
              >
                <Text style={{fontSize:15}}>{b.label}</Text>
              </Pressable> */}
              
            
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
            {/* </View>
            ))
            } */}
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
            {/* </ScrollView> */}

               <View>
             <Text style={{ fontWeight: "bold", fontSize: 30, fontFamily: "MyFontBasic" }}>
                      Articles from Home
                      </Text>
                      <View>
                        {Object.values(highlight)
                        .filter((a:any) => typeof a === "object" && a != null && "post_title" in a)
                        .map((article1: Article, index: number) => (
                         <Pressable key={`${article1.ID ?? "noid"}-${index}`} onPress={()=>handlePress2(article1) }
                // android_ripple={{color:'#3b3c3eff'}} 
                style=
                {({pressed})=>
                  [{flexDirection:"column",justifyContent:"center",backgroundColor:pressed ? "#1D4ED8":"#f0e1bfff",paddingTop:20,
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
                     <Text style={{ fontFamily:'MyBasicFont',color:"#97032191",paddingTop: 0,paddingBottom:8, fontWeight: "bold", fontSize: 15, }} numberOfLines={3}>
                      {article1?.prime_category?.[0].name}
                    </Text>
                       {article1?.featured_image?.source_url && (
                        <Image
                        source = {{uri:article1.featured_image.source_url}}
                        style={{
                          width: width,
                          height: width * 0.6,
                          resizeMode: "cover",
                        }}
                       />
                   )}

                   <View style={{marginHorizontal:10 }}>
                    <Text style={{ fontFamily:'MyBasicFont',paddingTop: 2,color:"#000", fontWeight: "bold", fontSize: 25 }}>
                      {article1?.post_title}
                    </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "500",color:"#000", paddingBottom: 20, fontFamily: "MyFontBasic" }}>
                      {article1?.post_excerpt}
                    </Text>
            
                    {/* <Text style={{ marginTop: 15, marginBottom: 15 }}>
                      {articles?.post_date}
                    </Text> */}
            
                    <Text style={{ fontSize: 15, fontWeight: "700", paddingBottom: 5 }}>
                      {article1?.post_author_name?.[0].author_name}
                    </Text>
                    <Text style={{fontSize:10}}>
                             { article1.post_date ? new Date ( article1.post_date).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                              }):"N/A"}
                        </Text>
                    </View>
            
                    {/* <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "500", marginBottom: 10, fontFamily: "MyFontItalic" }}>
                      {articles?.post_excerpt}
                    </Text> */}
                  {/* </View> */}
            
                 
                  </Pressable>
                        ))}
                        </View>
                        </View>



                         <View>
             <Text style={{ fontWeight: "bold", fontSize: 30, fontFamily: "MyFontBasic" }}>
                      Editor's Pick
                      </Text>
                      <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={ { flexWrap:"wrap",alignItems:"flex-start",paddingLeft:1,paddingRight:1,}}
            // snapToInterval={itemWidth + 12} // optional snapping
            decelerationRate="fast"
          >
                      
                      
                        {Object.values(editorschoice)
                        .filter((a:any) => typeof a === "object" && a != null && "post_title" in a)
                        .map((article1: Article, index: number) => (
                          <View key={`${article1.ID ?? "noid"}-${index}`}>
                         <Pressable onPress={()=>handlePress2(article1) }
                // android_ripple={{color:'#3b3c3eff'}} 
                style=
                {({pressed})=>
                  [{flexDirection:"column",justifyContent:"center",backgroundColor: index===0 ? "#a60606ff": pressed ? "#1D4ED8":"#f0e1bfff",paddingTop:20,
                paddingBottom:10,width:width * 0.6,
                marginBottom:5,marginLeft:10,
                borderBottomWidth:0.2,borderColor:"#444",shadowOpacity:0.1,elevation:2}]
              }>
                {/* {BUTTONS.map((b,i) => (
                <View key={b.id} style={{ flexDirection: "row", alignItems:"flex-start",justifyContent:'flex-start' }}>

              <Pressable
                key={b.id}
                style={({pressed})=>[styles.button,{borderBottomColor:pressed ? "#000" : "#fff",backgroundColor:pressed ? "#444" :"#08cc43ff" }]}
                onPress={() => handlePress(b.id)}
                // activeOpacity={0.75}
              >
                <Text style={{fontSize:15}}>{b.label}</Text>
              </Pressable> */}
            
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
                       {article1?.featured_image?.source_url && (
                        <Image
                        source = {{uri:article1.featured_image.source_url}}
                        style={{
                          width: width * 0.6,
                          height: width * 0.4,
                          resizeMode: "cover"
                        }}
                       />
                            //  <Text style={{fontSize:15,fontWeight:"400",color:"#97032191",paddingBottom:8}}>
                   )}

                   <View style={{marginHorizontal:10 }}>
                    <Text style={{ fontFamily:'MyBasicFont',color:index===0 ? "#fff" : "#97032191",paddingTop: 2, fontWeight: "bold", fontSize: 15, }} numberOfLines={3}>
                      {article1?.prime_category?.[0].name}
                    </Text>
                    <Text style={{ fontFamily:'MyBasicFont',color:index===0 ? "#fff" : "#1e1616ff",paddingTop: 2, fontWeight: "bold", fontSize: 15, }} numberOfLines={3}>
                      {article1?.post_title}
                    </Text>
                    {/* <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "500", paddingBottom: 20, fontFamily: "MyFontBasic" }}>
                      {article1?.post_excerpt}
                    </Text> */}
            
                    {/* <Text style={{ marginTop: 15, marginBottom: 15 }}>
                      {articles?.post_date}
                    </Text> */}
            
                    {/* <Text style={{color:index===0 ? "#fff" : "#1e1616ff",fontSize: 15, fontWeight: "700", paddingBottom: 5 }}>
                      {article1?.post_author_name?.[0].author_name}
                    </Text> */}
                    {/* <Text style={{color:index===0 ? "#fff" : "#1e1616ff",fontSize:10,paddingTop:15}}>
                            {article1.post_date}
                        </Text> */}
                        <Text style={{fontSize:10,color: index===0?"#fff":"#1e1616ff",paddingTop:10}}>
                             { article1.post_date ? new Date ( article1.post_date).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                              }):"N/A"}
                        </Text>
                    </View>
            
                    {/* <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "500", marginBottom: 10, fontFamily: "MyFontItalic" }}>
                      {articles?.post_excerpt}
                    </Text> */}
                  {/* </View> */}
                  </Pressable> 
                  </View>
            
                 ))}
                   </ScrollView>     
                 </View>

                  <View>
                     {Object.values(recent)
                     .filter((a:any) => typeof a === "object" && a != null && "post_title" in a)
                     .map((article1: Article, index: number) => (
                 
                     <Pressable key={`${article1.ID ?? "noid"}-${index}`} onPress={()=>handlePress2(article1) }
                     // android_ripple={{color:'#1D4ED8'}} 
                     style=
                     {({pressed})=>
                       [{flexDirection:"row",justifyContent:"center",backgroundColor:pressed ? "#1D4ED8":"#f6efdeff",paddingTop:20,
                     paddingRight:10,paddingBottom:10,
                     marginRight:5,marginBottom:5,marginLeft:5,
                     borderBottomWidth:0.2,borderColor:"#444",shadowOpacity:0.1,elevation:2}]
                   }>
                         {/* <View style={{flex:1,flexDirection:"row",paddingRight:20}}> */}
                         <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",marginLeft:10}}>
                         {article1?.featured_image?.source_url && (
                             <Image
                             source={{uri:article1.featured_image.source_url}}
                             style={{width:50,height:80,flex:1}}/>
                         )}
                         {/* </View> */}
                         <View style={{flex:2,justifyContent:"space-between",marginLeft:10,marginBottom:"auto"}}>
                             <View style={{ flex:1,flexDirection:"column",justifyContent:'space-between',alignItems:"flex-start"}}>
                             <Text style={{fontSize:15,fontWeight:"400",color:"#97032191",paddingBottom:8}}>
                                 {article1?.prime_category?.[0].name}
                             </Text>
                             <Text style={{fontFamily:'MyBasicFOnt',fontWeight:'bold',fontSize:15}}>
                                 {article1.post_title}
                             </Text>
                              <Text style={{ fontSize: 10, paddingTop:8 }}>
                           {article1?.post_author_name?.[0].author_name}
                         </Text>
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
                         </View>
                         </View>
                          </Pressable>
                         
                   ))}
                 </View>
                 <View style={{flexDirection:"row",alignItems:"center",paddingLeft:5}}>
                  <View style={{ width: 10,
                  height: 10,
                   borderRadius: 5,
                   borderWidth:1.5,
                   borderColor:"#f2c2c2ff" ,             // half of width/height for perfect circle
                   backgroundColor: "#db3b3b",   // red dot
                  shadowColor: "#db3b3b",       // same color for glow
                     shadowOffset: { width: 0, height: 0 }, // uniform shadow
                      shadowOpacity: 0.8,           // intensity
                    shadowRadius: 6,              // spread of shadow
                     elevation: 10, }}>

                  </View>
                  <Text style={{paddingLeft:5,fontWeight: "bold", fontSize: 30, fontFamily: "MyFontBasic" }}>
                      Just In
                      </Text>
                      </View>
                  <View>
                     {Object.values(recentstoriesjustin)
                     .filter((a:any) => typeof a === "object" && a != null && "post_title" in a)
                     .map((article1: Article, index: number) => (
                 
                     <Pressable key={`${article1.ID ?? "noid"}-${index}`} onPress={()=>handlePress2(article1) }
                     // android_ripple={{color:'#1D4ED8'}} 
                     style=
                     {({pressed})=>
                       [{flexDirection:"row",justifyContent:"center",backgroundColor:pressed ? "#1D4ED8":"#f6efdeff",paddingTop:20,
                     paddingRight:10,paddingBottom:10,
                     marginRight:5,marginBottom:5,marginLeft:5,
                     borderBottomWidth:0.2,borderColor:"#444",shadowOpacity:0.1,elevation:2}]
                   }>
                         {/* <View style={{flex:1,flexDirection:"row",paddingRight:20}}> */}
                         <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",marginLeft:10}}>
                         {/* {article1?.featured_image?.source_url && (
                             <Image
                             source={{uri:article1.featured_image.source_url}}
                             style={{width:50,height:80,flex:1}}/>
                         )} */}
                         {/* </View> */}
                         <View style={{flex:2,justifyContent:"space-between",marginLeft:10,marginBottom:"auto"}}>
                             <View style={{ flex:1,flexDirection:"column",justifyContent:'space-between',alignItems:"flex-start"}}>
                             <Text style={{fontSize:15,fontWeight:"400",color:"#97032191",paddingBottom:8}}>
                                 {article1?.prime_category?.[0].name}
                             </Text>
                             <Text style={{fontFamily:'MyBasicFOnt',fontWeight:'bold',fontSize:15}}>
                                 {article1.post_title}
                             </Text>
                              {/* <Text style={{ fontSize: 10, paddingTop:8 }}>
                           {article1?.post_author_name?.[0].author_name}
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
                         </View>
                         </View>
                          </Pressable>
                         
                   ))}
                 </View>
                 <View style={{backgroundColor:"#100e0eff"}}>
             <Text style={{ fontWeight: "bold",color:"#fff",fontSize: 30, fontFamily: "MyFontBasic" }}>
                      The Wire Videos
                      </Text>
                      <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={ { flexWrap:"wrap",alignItems:"flex-start",paddingLeft:1,paddingRight:1,}}
            // snapToInterval={itemWidth + 12} // optional snapping
            decelerationRate="fast"
          >
                      
                      
                        {Object.values(videos)
                        .filter((a:any) => typeof a === "object" && a != null && "post_title" in a)
                        .map((article1: Article, index: number) => (
                          <View>
                         <Pressable key={`${article1.ID ?? "noid"}-${index}`} onPress={()=>handlePress2(article1) }
                // android_ripple={{color:'#3b3c3eff'}} 
                style=
                {({pressed})=>
                  [{flexDirection:"column",justifyContent:"center",backgroundColor:pressed ? "#1D4ED8":"#100e0eff",paddingTop:20,
                paddingBottom:10,width:width * 0.6,
                marginBottom:5,marginLeft:10,
                borderBottomWidth:0.2,borderColor:"#444",shadowOpacity:0.1,elevation:2}]
              }>
                {/* {BUTTONS.map((b,i) => (
                <View key={b.id} style={{ flexDirection: "row", alignItems:"flex-start",justifyContent:'flex-start' }}>

              <Pressable
                key={b.id}
                style={({pressed})=>[styles.button,{borderBottomColor:pressed ? "#000" : "#fff",backgroundColor:pressed ? "#444" :"#08cc43ff" }]}
                onPress={() => handlePress(b.id)}
                // activeOpacity={0.75}
              >
                <Text style={{fontSize:15}}>{b.label}</Text>
              </Pressable> */}
            
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
                       {article1?.featured_image?.source_url && (
                        <Image
                        source = {{uri:article1.featured_image.source_url}}
                        style={{
                          width: width * 0.6,
                          height: width * 0.4,
                          resizeMode: "cover"
                        }}
                       />
                   )}

                   <View style={{marginHorizontal:10 }}>
                    <Text style={{ fontFamily:'MyBasicFont',color:"#97032191",paddingTop: 2, fontWeight: "bold", fontSize: 15 }} numberOfLines={3}>
                      {article1?.prime_category?.[0].name}
                    </Text>
                    <Text style={{ fontFamily:'MyBasicFont',paddingTop: 2,color:"#fff", fontWeight: "bold", fontSize: 15 }} numberOfLines={3}>
                      {article1?.post_title}
                    </Text>
                    {/* <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "500", paddingBottom: 20, fontFamily: "MyFontBasic" }}>
                      {article1?.post_excerpt}
                    </Text> */}
            
                    {/* <Text style={{ marginTop: 15, marginBottom: 15 }}>
                      {articles?.post_date}
                    </Text> */}
            
                    <Text style={{ fontSize: 15, fontWeight: "700",paddingTop:8,paddingBottom: 5,color:"#fff" }}>
                      {article1?.post_author_name?.[0].author_name}
                    </Text>
                    <Text style={{fontSize:10,color:"#fff"}}>
                             { article1.post_date ? new Date ( article1.post_date).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                              }):"N/A"}
                        </Text>
                    </View>
            
                    {/* <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "500", marginBottom: 10, fontFamily: "MyFontItalic" }}>
                      {articles?.post_excerpt}
                    </Text> */}
                  {/* </View> */}
                  </Pressable> 
                  </View>
            
                 ))}
                   </ScrollView>     
                 </View>
                 <Text style={{ fontWeight: "bold", fontSize: 30, fontFamily: "MyFontBasic" }}>
                      Opinion
                      </Text>
                  <View>
                     {Object.values(opinion)
                     .filter((a:any) => typeof a === "object" && a != null && "post_title" in a)
                     .map((article1: Article, index: number) => (
                 
                     <Pressable key={`${article1.ID ?? "noid"}-${index}`} onPress={()=>handlePress2(article1) }
                     // android_ripple={{color:'#1D4ED8'}} 
                     style=
                     {({pressed})=>
                       [{flexDirection:'row',backgroundColor:pressed ? "#1D4ED8":"#f0e1bfff",paddingTop:30,
                     paddingRight:5,paddingBottom:10,
                     marginRight:5,marginBottom:5,marginLeft:5,
                     borderBottomWidth:0.2,borderColor:"#444",shadowOpacity:0.1,elevation:2}]
                   }>
                         {/* <View style={{}}> */}
                         {/* <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginLeft:10}}> */}
                        
                         {/* </View> */}
                             {/* <View style={{ flexDirection:"row",}}> */}
                              <View style={{paddingLeft:10}}>
                               <Image
                               source={ {uri:article1?.post_author_name?.[0]?.author_avatar ?
                               article1.post_author_name?.[0].author_avatar : "https://cdn-icons-png.flaticon.com/512/847/847969.png" }}
                               style = {{width:75,height:75,borderRadius:50,}}/>
                               </View>
                              <View style={{flex:1,flexShrink:1,flexDirection:'column',justifyContent:'center',paddingLeft:30}}>

          
                               <Text style={{fontSize:15,fontWeight:"400",color:"#97032191",paddingBottom:8}}>
                                 {article1?.post_author_name?.[0].author_name.toUpperCase()}
                                </Text>
                               <Text style={{fontFamily:'MyBasicFOnt',fontWeight:'bold',fontSize:15,paddingTop:5,paddingRight:5}}>
                                 {article1.post_title}
                                </Text>

                               </View>
                              
                         {/* </View> */}
                            
                         
                         {/* </View> */}
                          </Pressable>
                         
                   ))}
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
              </View>
              

       
       </>
       </SafeAreaView> 
       </ScrollView>
     
  )
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


