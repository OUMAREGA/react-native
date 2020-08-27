import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home'
import Details from './src/screens/Details'
import Favoris from './src/screens/Favoris'
import Historique from './src/screens/Historique'
import Scan from './src/components/Scan';
import NotFound from './src/screens/NotFound';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
      <Stack.Navigator 
        screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}>
          <Stack.Screen name="IPSSI SCAN" component={Home} />
          <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
  );
}
function ScanStack() {
  return (
      <Stack.Navigator
        screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
      >
          <Stack.Screen name="IPSSI SCAN" component={Scan} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Produit non trouvé" component={NotFound} />
      </Stack.Navigator>
  );
}
function FavorisStack() {
  return (
      <Stack.Navigator 
        screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
      >
          <Stack.Screen name="IPSSI SCAN" component={Favoris} />
          <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
  );
}
function HistoriqueStack() {
  return (
      <Stack.Navigator
        screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
      >
          <Stack.Screen name="IPSSI SCAN" component={Historique} />
          <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator tabBarOptions={{
        activeTintColor: '#e67e22',
        inactiveBackgroundColor: 'tomato',
        inactiveTintColor: '#ffffff'
      }}>
        <Tab.Screen 
            name="Accueil" 
            component={HomeStack} 
            options={{
                tabBarLabel: 'Accueil',
                tabBarIcon: () => <Ionicons name = "md-home" size = {24} color = "black" />,
                }}
            />
        <Tab.Screen 
            name="Scanner" 
            component={ScanStack} 
            options={{
                unmountOnBlur: true,
                tabBarLabel: 'Scanner',
                tabBarIcon: () => <Ionicons name = "md-qr-scanner" size = {24} color = "black" />,
                }}
            />
            <Tab.Screen name="Favoris" component={FavorisStack} 
            options={{
              tabBarLabel: "Mes Favoris", 
              tabBarIcon: () => <Ionicons name = "ios-heart" size = {24} color = "black" /> }}
          />
          <Tab.Screen name="Historique" component={HistoriqueStack} 
            options={{
              tabBarLabel: "Historique", 
              tabBarIcon: () => <Ionicons name = "ios-archive" size = {24} color = "black" /> }}
          />
    </Tab.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e67e22'
  },
});
