import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconIonicons from "react-native-vector-icons/Ionicons";
import HomeStack from "../stacks/HomeStack";
import AccountScreen from "../AccountScreen";
import MyTripScreen from "../MyTripScreen";
import HomeScreen from "../HomeScreen";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const optionScreen = ({route} : any) =>({
    tabBarIcon: ({ focused, color, size } : any) => {
      let iconName = ""

      if (route.name === 'Home') {
        iconName = focused
          ? 'home-outline'
          : 'home-outline';
      } else if (route.name === 'MyTric') {
        iconName = focused ? 'newspaper-outline' : 'newspaper-outline';
      }
      else if (route.name === 'Account') {
        iconName = focused ? 'person-outline' : 'person-outline';
      }

      return <IconIonicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle:{paddingHorizontal:25},     
    tabBarLabelStyle: {display: "none"},
    headerShown: false,  
  
          
            
  })
  return (
      <Tab.Navigator screenOptions={optionScreen}>     
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="MyTric" component={MyTripScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
      

  )
}
const styles = StyleSheet.create({

})


export default TabNavigator;
