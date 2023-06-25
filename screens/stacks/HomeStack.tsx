import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChooseSeatScreen from "../ChooseSeatScreen";
import AddressTo from "../components/AddressTo";
import DateComponent from "../components/DateComponent";
import FindTicker from "../FindTickets";
import HomeScreen from "../HomeScreen";
const Stack = createNativeStackNavigator();
const HomeStack =()=>{
     return(
        <>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="FindTicker" component={FindTicker}></Stack.Screen>
                <Stack.Screen name="ChooseSeat" component={ChooseSeatScreen}></Stack.Screen>
                 {/* <Stack.Screen name="AddresTo" component={AddressTo}></Stack.Screen>
                <Stack.Screen name="FindTicker" component={FindTicker}></Stack.Screen>  */}
            </Stack.Navigator>
        </>
     )
}
export default HomeStack;