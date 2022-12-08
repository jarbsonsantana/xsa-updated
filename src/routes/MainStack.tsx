import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserContext from '../contexts/UserContext';

import MainDrawer from './MainDrawer';  
import ServerScreen from '../screens/ServerScreen';
import LoginScreen from '../screens/LoginScreen';
import Finalizar from '../screens/Finalizar';
import EndTicketScreen from '../screens/EndTicketScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

function MainStack() {
  const [user, setUser] = React.useState({
    creditos: 0,
    bonus: 0,
    email: '',
    img: '',
    nome: '',
    changeUser: (user)=>{
      changeUser(user);
    }
  });

  const chooseScreen = async () => {
    return AsyncStorage.getItem('@serverURL', (err, result)=> {
      if (!err && result != null) {
        console.log(result);
        return true;
      } else {
        return false;
      }
    });

  }

  const changeUser = (u) => {
    let newUser = {user, ...u};
    setUser(newUser);
  } 

  return (
      <UserContext.Provider value={user}>
        <Stack.Navigator initialRouteName={chooseScreen() ? 'Login': 'ServerScreen'}>
          
          
          <Stack.Screen name="ServerScreen" component={ServerScreen} options={{headerShown:false}}/>
       
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        
          <Stack.Screen name="MainDrawer" component={MainDrawer} options={{headerShown:false}}/>
          <Stack.Screen name="Finalizar" component={Finalizar} options={{headerShown:false}}/>
          
        </Stack.Navigator>
      </UserContext.Provider>
  );
}

export default MainStack;