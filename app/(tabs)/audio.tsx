import axios from "axios";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import RenderHtml from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";

interface Article {
  ID?: number;
  post_date: string;
  post_content: string;
  post_title: string;
  featured_image: [string, number, number, boolean];
  featured_image_caption?: string;
  post_author_name?: { author_name: string; cd?: string; pl?: string }[];
  post_excerpt?: string;
}

export default function Audio() {
  const [articles, setArticles] = useState<Article | null>(null);
  const { width } = useWindowDimensions(); // ✅ move inside component
  const[fontLoaded]=useFonts({
    MyFontItalic:require("../../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf"),
    MyFontBasic:require("../../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
  //  MySuperBasic:require("../../assets/fonts/SpaceMono-Regular")
  })

  useEffect(() => {
    axios
      .get("https://wire-proxy-backend.onrender.com/articles")
      .then((res) => setArticles(res.data["post-detail"][0]))
      .catch((err) => console.error(err));
  }, []);

  return (
  <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
    <SafeAreaView style={{ marginTop: 0 }}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 30, fontFamily: "MyFontBasic" }}>
          Articles from Express
        </Text>

        <Text style={{ fontFamily:'MyBasicFont',paddingTop: 2, fontWeight: "bold", fontSize: 25 }}>
          {articles?.post_title}
        </Text>

        <Text style={{ marginTop: 15, marginBottom: 15 }}>
          {articles?.post_date}
        </Text>

        <Text style={{ fontSize: 15, fontWeight: "700", paddingBottom: 5 }}>
          {articles?.post_author_name?.[0].author_name}
        </Text>

        <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "500", marginBottom: 10, fontFamily: "MyFontItalic" }}>
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
      </View>
    </SafeAreaView>
  </ScrollView>
);
}