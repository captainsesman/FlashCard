import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDeck from '../components/AddDeck';
import DecksList from '../components/DecksList';
import DeckDetails from '../components/DeckDetail'
import Quiz from '../components/Quiz';
import AddCard from '../components/AddCard'

const Stack = createNativeStackNavigator();



const  MainStackNav = () => {
  return (
    <Stack.Navigator
     initialRouteName='Home'
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00834e",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}
    >   
      <Stack.Screen
        name="Home"
        component={DecksList}
        options={{
          title: 'Home',
        }}
      />
       <Stack.Screen
        name="DeckDetail"
        component={DeckDetails}
        options={{
          title: 'Deck Detail',
        }}
      />
        <Stack.Screen
        name="AddDeck"
        component={AddDeck}
        options={{
          title: 'Add Deck',
        }}  
      />
        <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          title: 'Add Card',
        }}  
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{
          title: 'Take Quiz',
        }}  
        /> 
    </Stack.Navigator>
  );
}

const  AddDeckNav = () => {
  return (
    <Stack.Navigator
     
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00834e",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}
    >
   
      <Stack.Screen
        name="AddDeck"
        component={AddDeck}
        options={{
          title: 'Add Deck',
        }}
      />
       
    </Stack.Navigator>
  );
}


export { MainStackNav, AddDeckNav }


