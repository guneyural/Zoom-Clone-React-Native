import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from './screens/Home';
import MeetingRoom from './screens/MeetingRoom';
import CustomStatusBar from './components/CustomStatusBar';

function Navigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <CustomStatusBar backgroundColor={'#1c1c1c'} />
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="Home">
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Room"
          component={MeetingRoom}
          options={{
            title: 'Start a Meeting',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#1c1c1c',
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
