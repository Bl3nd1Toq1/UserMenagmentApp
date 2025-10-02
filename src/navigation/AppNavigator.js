import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from '../screens/UserListScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import AddUserScreen from '../screens/AddUserScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="UserList" 
          component={UserListScreen} 
          options={{ title: 'Users' }}
        />
        <Stack.Screen 
          name="UserDetails" 
          component={UserDetailsScreen} 
          options={{ title: 'User Details' }}
        />
        <Stack.Screen 
          name="AddUser" 
          component={AddUserScreen} 
          options={{ title: 'Add New User' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
