import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Launches, Settings, Agencies } from './src/screens/index';
import { LaunchDetail } from './src/components/index';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const LaunchesStack = createStackNavigator();

const LaunchesStackScreen = () => {
  return (
    <LaunchesStack.Navigator>
      <LaunchesStack.Screen
        name="Launches"
        component={Launches}
        options={{ headerShown: false }}
      />
      <LaunchesStack.Screen
        name="LaunchDetail"
        component={LaunchDetail}
        options={({ route }) => ({ title: route.params.item.name })}
      />
    </LaunchesStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Launches"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Launches') {
              iconName = focused ? 'ios-rocket' : 'ios-rocket';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings';
            } else if (route.name === 'Agencies') {
              iconName = focused ? 'ios-list' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Agencies" component={Agencies} />
        <Tab.Screen name="Launches" component={LaunchesStackScreen} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
