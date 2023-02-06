import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Quiz from "./screens/Quiz";
import { View } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTransparent: true,
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
            headerTitle: "",
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
