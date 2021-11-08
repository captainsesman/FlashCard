
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddDeckNav, MainStackNav, Detail, Quizs } from "./StackNavigation";
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Main'  screenOptions={{headerShown: false}}>
      <Tab.Screen name="Main" component={MainStackNav}
       screenOptions={{
        headerStyle: {
          backgroundColor: "#9AC4F8",
        },
        headerTintColor: "white",
         headerBackTitle: "Back",
         tabBarIcon: () => (
           <MaterialCommunityIcons name="home-circle-outline" size={24} color="black" />         
          ),
      }}/>
      <Tab.Screen name="AddDeck" component={AddDeckNav} />

    </Tab.Navigator>
  );
};

export default  MainNavigator;