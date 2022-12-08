import React, {useContext, useEffect, useState} from 'react';
import { Avatar, Container, Text, UserInfo, UserName, UserEmail, Saldo, SaldoTitle } from './styles';
import { DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import UserContext from '../../contexts/UserContext';
import { useNavigation, useLinkBuilder, DrawerActions, CommonActions, useFocusEffect } from '@react-navigation/native';

function CustomDrawer(props) {
    const navigator = useNavigation();
    const userCtx = useContext(UserContext);


    const buildLink = useLinkBuilder();

    const state = props.state;
    const navigation = props.navigation;
    const descriptors = props.descriptors;
    const activeTintColor = props.activeTintColor;
    const inactiveTintColor = props.inactiveTintColor;
    const activeBackgroundColor = props.activeBackgroundColor;
    const inactiveBackgroundColor = props.inactiveBackgroundColor;
    const itemStyle = props.itemStyle;
    const labelStyle = props.labelStyle;

    const data = {
        name: userCtx.nome,
        email: userCtx.email,
        img: userCtx.img,
        tipo: userCtx.tipo
    }

   

    return (
        <Container>
         <DrawerContentScrollView {...props}>
             <Container>
                 <UserInfo>
                     <Avatar 
                        source={{uri: data.img}}
                        width={70}
                        height={70}
                    />
                    <UserName>{data.name} - { userCtx.tipo } </UserName>
                    <UserEmail>{data.email}</UserEmail>
                    <Saldo>
                        <SaldoTitle style={{marginRight: 10}}>Saldo: 
                            <Text> R$ {(userCtx.creditos).toFixed(2)}</Text>
                            {/* <Text> {saldo}</Text> */}
                        </SaldoTitle> 
                        <SaldoTitle>Bônus: 
                            <Text> R$ {(userCtx.bonus).toFixed(2)}</Text>
                            {/* <Text> {saldo}</Text> */}
                        </SaldoTitle> 
                    </Saldo>
                    <SaldoTitle style={{color: '#eee', fontSize: 10, marginTop: 0, marginBottom: 4}}>
                      A Liberar: 
                            <Text> R$ {(userCtx?.bonuslib || 0).toFixed(2)}</Text>
                            {/* <Text> {saldo}</Text> */}
                        </SaldoTitle> 
                    
                </UserInfo>
            </Container>
            {state.routes.map((route, i) => {
        if(route.name === 'Campeonato') return;
        if(route.name === 'Bilhete') return;
        if(route.name === 'CampeonatoComFiltro') return;
        
        const focused = i === state.index;
        const { title, drawerLabel, drawerIcon } = descriptors[route.key].options;

        return (
          <DrawerItem
            key={route.key}
            label={
              drawerLabel !== undefined
                ? drawerLabel
                : title !== undefined
                ? title
                : route.name
            }
            icon={drawerIcon}
            focused={focused}
            activeTintColor={activeTintColor}
            inactiveTintColor={inactiveTintColor}
            activeBackgroundColor={activeBackgroundColor}
            inactiveBackgroundColor={inactiveBackgroundColor}
            labelStyle={labelStyle}
            style={itemStyle}
            to={buildLink(route.name, route.params)}
            onPress={() => {
              navigation.dispatch({
                ...(focused
                  ? DrawerActions.closeDrawer()
                  : CommonActions.navigate(route.name)),
                target: state.key,
              });
            }}
          />
        );
      })}
            
        </DrawerContentScrollView> 
        <DrawerItem 
            icon={({color,size}) => (
                <Ionicons 
                    name="exit-outline"
                    color={color}
                    size={size}
                />
            )}
            label="Sair"
            onPress={()=>{
                navigator.navigate('Login', {serverData: {
                    "title": "XSA Sports - Demo",
                    "apostaMin": 2,
                    "apostaMax": 5000,
                    "cotacaoMin": 1.1,
                    "cotacaoMax": 2000,
                    "minJogos": 1,
                    "retornoMaximo": 10000,
                    "logotipo": "https:\/\/srv10.123bet.com.br\/imagens\/srv10123betcombr\/20211015_6169c1e12eab7.png",
                    "background": "https:\/\/srv10.123bet.com.br\/imagens\/srv10123betcombr\/20211015_6169c9743d534.jpg",
                    "linkSacar": null,
                    "linkComprar": null,
                    "usuarioLicenca": 0,
                    "result": 1
                  }, hasLoggedOut: true});
            }}
        />
      </Container>

    )
    

    
    // newState.routes = newState.routes.filter(item => item.name !== 'Campeonato') //replace "Login' with your route name
    // newState.routeNames = newState.routeNames.filter(item => item.name !== 'Campeonato')

    // newState.routes = newState.routes.filter(item => item.name !== 'CampeonatoComFiltro')
    // newState.routeNames = newState.routeNames.filter(item => item.name !== 'CampeonatoComFiltro')

    // newState.routes = newState.routes.filter(item => item.name !== 'Bilhete')
    // newState.routeNames = newState.routeNames.filter(item => item.name !== 'Bilhete')

    // return (
    //   <Container>
    //     <DrawerContentScrollView state={newState} {...rest}>
    //         <Container>
    //             <UserInfo>
    //                 <Avatar 
    //                     source={{uri: data.img}}
    //                     width={70}
    //                     height={70}
    //                 />
    //                 <UserName>{data.name}</UserName>
    //                 <UserEmail>{data.email}</UserEmail>
    //                 <Saldo>
    //                     <SaldoTitle>Saldo: 
    //                         <Text> R$ {(userCtx.creditos).toFixed(2)}</Text>
    //                     </SaldoTitle> 
    //                 </Saldo>
    //             </UserInfo>
    //         </Container>
    //         <DrawerItemList state={newState} {...rest}/>
            
    //     </DrawerContentScrollView> 
    //     <DrawerItem 
    //         icon={({color,size}) => (
    //             <Ionicons 
    //                 name="exit-outline"
    //                 color={color}
    //                 size={size}
    //             />
    //         )}
    //         label="Sair"
    //         onPress={()=>{
    //             navigator.navigate('Login', {serverData: {
    //                 "title": "XSA Sports - Demo",
    //                 "apostaMin": 2,
    //                 "apostaMax": 5000,
    //                 "cotacaoMin": 1.1,
    //                 "cotacaoMax": 2000,
    //                 "minJogos": 1,
    //                 "retornoMaximo": 10000,
    //                 "logotipo": "https:\/\/srv10.123bet.com.br\/imagens\/srv10123betcombr\/20211015_6169c1e12eab7.png",
    //                 "background": "https:\/\/srv10.123bet.com.br\/imagens\/srv10123betcombr\/20211015_6169c9743d534.jpg",
    //                 "linkSacar": null,
    //                 "linkComprar": null,
    //                 "usuarioLicenca": 0,
    //                 "result": 1
    //               }});
    //         }}
    //     />
    //   </Container>
    // );
  }
  
export default CustomDrawer;