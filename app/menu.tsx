import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function (){
    return(
        <SafeAreaView>
        <View>
            <Text style = {{justifyContent:"center",color:"#333"}}>
                Hello from menu
            </Text>
        </View>
        </SafeAreaView>
    )
}