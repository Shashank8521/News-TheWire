import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export  function CategoryPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Category: {id}</Text>
    </View>
  );
}
