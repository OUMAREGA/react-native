import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home'
import Products from './src/screens/Products'
import Favoris from './src/screens/Favoris'
import Historique from './src/screens/Historique'
import Scan from './src/components/Scan';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
      <Stack.Navigator>
          <Stack.Screen name="IPSSI SCAN" component={Home} />
          <Stack.Screen name="Favoris" component={Favoris} />
          <Stack.Screen name="Historique" component={Historique} />
          <Stack.Screen name="Scan" component={Scan} />

      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
        <Tab.Screen 
            name="Accueil" 
            component={HomeStack} 
            options={{
                tabBarLabel: 'Accueil',
                tabBarIcon: () => <Icon name="home" size={24} type="Ionicons" />,
                }}
            />
        <Tab.Screen 
            name="Produits" 
            component={Products} 
            options={{
                tabBarLabel: 'Produits',
                tabBarIcon: () => <Icon name="list" size={24} type="Ionicons"  />,
                }}
            />
    </Tab.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
