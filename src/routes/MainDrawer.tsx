import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
import CustomDrawer from '../components/CustomDrawer';

import HomeScreen from '../screens/HomeScreen';
import CaixaScreen from '../screens/Caixa';
import SearchTicket from '../screens/SearchTicket';
import ReportScreen from '../screens/ReportScreen';
import TicketsScreen from '../screens/TicketsScreen';
import ClientsScreen from '../screens/ClientsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CampeonatoScreen from '../screens/CampeonatoScreen';
import EndTicketScreen from '../screens/EndTicketScreen';
import CampeonatoWithPaisScreen from '../screens/CampeonatoWithPaisScreen';
import AoVivoScreen from '../screens/AoVivoScreen';
import CampeonatoAoVivoScreen from '../screens/CampeonatoAoVivoScreen';
import PixScreen from '../screens/PixScreen';
import BonusScreen from '../screens/BonusScreen/index';


function MyDrawer() {
  return (

    <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        //backgroundColor: 'gainsboro',
      },
     // drawerActiveBackgroundColor: 'red'
     drawerItemStyle:{
       //borderBottomWidth: 1,
       //borderBottomColor: 'lightblue',
       marginTop:0
   
     }
    }}
    drawerContent={(props) =><CustomDrawer {...props}/>}
    >
      
      {/* <Drawer.Screen name="Ao Vivo" component={AoVivoScreen} 
        options={
          {
            drawerIcon: ({size, color}) => <MaterialIcons name="sports-soccer" size={size} color={color} />
          }
        }
      /> */}
      

      <Drawer.Screen name="Campeonatos" component={HomeScreen} 
        options={
          {
            drawerIcon: ({size, color}) => <MaterialIcons name="sports-soccer" size={size} color={color} />
          }
        }
      />

      <Drawer.Screen name="Consultar Bilhete" component={SearchTicket} 
        options={
          {
            drawerIcon: ({size, color}) => <Ionicons name="search" size={size} color={color} />
          }
        }
      />
      <Drawer.Screen name="Caixa" component={CaixaScreen} 
        options={
          {
            drawerIcon: ({size, color}) => <MaterialIcons name="attach-money" size={size} color={color} />
          }
        }
      />
      <Drawer.Screen name="Bônus" component={BonusScreen} 
        options={
          {
            drawerIcon: ({size, color}) => <MaterialIcons name="attach-money" size={size} color={color} />
          }
        }
      />
      <Drawer.Screen name="Pix" component={PixScreen} 
        options={
          {
            drawerIcon: ({size, color}) => <MaterialIcons name="attach-money" size={size} color={color} />
          }
        }
      />
      <Drawer.Screen name="Minhas Apostas" component={TicketsScreen} 
        options={
          {
            drawerIcon: ({size, color}) => <Ionicons name="ios-pricetags-outline" size={size} color={color} />
          }
        }
      />
      <Drawer.Screen name="Relatórios" component={ReportScreen} 
        options={
          {
            drawerIcon: ({size, color}) => <MaterialIcons name="attach-money" size={size} color={color} />
          }
        }
      />
      <Drawer.Screen name="Clientes" component={ClientsScreen} 
        options={
          {
            drawerIcon: ({size, color}) => <Ionicons name="people-outline" size={size} color={color} />
          }
        }
      />
      <Drawer.Screen name="Trocar Senha" component={ChangePasswordScreen} 
        options={
          {
            drawerIcon: ({size, color}) => <Ionicons name="key-outline" size={size} color={color} />
          }
        }
      />
      <Drawer.Screen name="Campeonato" component={CampeonatoScreen} 
        options={
          {
           drawerLabel: () => null,
           headerShown: false
          }          
        }
      />
      <Drawer.Screen name="CampeonatoComFiltro" component={CampeonatoWithPaisScreen} 
        options={
          {
           drawerLabel: () => null,
           headerShown: false
          }          
        }
      />
      <Drawer.Screen name="CampeonatoAoVivo" component={CampeonatoAoVivoScreen} 
        options={
          {
           drawerLabel: () => null,
           headerShown: false
          }          
        }
      />
      <Drawer.Screen name="Bilhete" component={EndTicketScreen} options={
        {
          drawerLabel: () => null,
          headerShown:true
          }
        } />
      
      
    </Drawer.Navigator>

  );
}

export default MyDrawer;