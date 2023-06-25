import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./screens/navigation/TabNavigator"

import LoginPhoneScreen from "./screens/LoginPhoneScreen";
import LoginNameScreen from "./screens/LoginNameScreen";
import DateComponent from "./screens/components/DateComponent";
import AddressTo from "./screens/components/AddressTo";
import FindTicker from "./screens/FindTickets";
import ChooseSeatScreen from "./screens/ChooseSeatScreen";
import HomeScreen from "./screens/HomeScreen";
import HomeStack from "./screens/stacks/HomeStack";
import BookTicket from "./screens/BookTicket";
import MyNote from "./ConText/MyNote";
import DeleteMyTrip from "./screens/DeleteMyTrip";
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <MyNote>
        <Stack.Navigator screenOptions={{ headerShown: false }}> 
          <Stack.Screen name="LoginPhone" component={LoginPhoneScreen}></Stack.Screen>
          <Stack.Screen name="LoginName" component={LoginNameScreen}></Stack.Screen>
          <Stack.Screen name="App" component={TabNavigator}></Stack.Screen>
          <Stack.Screen name="DateStack" component={DateComponent}></Stack.Screen>
          <Stack.Screen name="AddresTo" component={AddressTo}></Stack.Screen>
          <Stack.Screen name="FindTicker" component={FindTicker}></Stack.Screen>
          <Stack.Screen name="ChooseSeat" component={ChooseSeatScreen}></Stack.Screen>
          <Stack.Screen name="BookTicket" component={BookTicket}></Stack.Screen>
          <Stack.Screen name="DeleteMyTrip" component={DeleteMyTrip}></Stack.Screen>
        </Stack.Navigator>
      </MyNote>
    </NavigationContainer>

    // <>
    //    <DeleteMyTrip></DeleteMyTrip>
    // </>
  )
}
const styles = StyleSheet.create({
})
export default App;
