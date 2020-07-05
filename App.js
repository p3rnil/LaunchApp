import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Launches, Settings, Rockets } from './src/screens';
import { LaunchDetail, RocketDetail } from './src/components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const LaunchesStack = createStackNavigator();
const RocketsStack = createStackNavigator();

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
        options={{ headerShown: false }}
      />
    </LaunchesStack.Navigator>
  );
};

const RocketsStackScreen = () => {
  return (
    <RocketsStack.Navigator>
      <RocketsStack.Screen
        name="Rockets"
        component={Rockets}
        options={{ headerShown: false }}
      />
      <RocketsStack.Screen
        name="RocketDetail"
        component={RocketDetail}
        options={({ route }) => ({ title: route.params.rocket.name })}
      />
    </RocketsStack.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" translucent={true} />
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
              } else if (route.name === 'Rockets') {
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
          <Tab.Screen name="Rockets" component={RocketsStackScreen} />
          <Tab.Screen name="Launches" component={LaunchesStackScreen} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
