import React, {useState, useEffect} from 'react';
import Checkbox from 'expo-checkbox';
import { Container, Text, Logotipo,DefaultInput,InputArea, ButtonArea, ButtonContainer } from './styles';
import { useNavigation, StackActions  } from '@react-navigation/native';
import {loginUser, getDados, getMyServerInfo} from '../../services/API';
import UserContext from '../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

function LoginScreen({route}) {

    const UserCtx = React.useContext(UserContext);

    const navigation = useNavigation();
    const [serverData, setServerData] = useState({});
    const [user,setUser] = useState('');
    const [pass,setPass] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [savedLoggins, setSavedLoggins] = useState([]);
    const [pickerSelected, setPickerSelected] = useState('');

    useEffect(()=>{


      const _info = async () => {
        
        let ___data = await getMyServerInfo();
        if (!___data.background) {
          navigation.dispatch(StackActions.replace('ServerScreen'));
        }
        setServerData(___data);

        if (route?.params?.hasLoggedOut) {
          setPickerSelected('');
          setUser('');
          setPass('');
          setChecked(false);
          getSavedLogginInfos();
          return;
        }

        let dadosUser = await getDados();
        console.log('dados_user', dadosUser);
        if(dadosUser) {
          UserCtx.creditos = dadosUser.user.creditos;
          UserCtx.bonus = dadosUser.user.bonus;
          UserCtx.bonuslib = dadosUser.user.bonuslig;
          UserCtx.nome = dadosUser.user.nome;
          UserCtx.img = dadosUser.user.img;
          UserCtx.email = dadosUser.user.email;
          UserCtx.tipo = dadosUser.tipo ? dadosUser.tipo:  '';
          navigation.navigate('MainDrawer');
        }

        getSavedLogginInfos();

        
      }

      _info();
    },[route])

    async function getSavedLogginInfos() { 
      var savedLogginInfos = [];

      const rawSavedLogginInfos = await AsyncStorage.getItem('saved_loggin_infos');
      if (rawSavedLogginInfos && rawSavedLogginInfos != '') {
        savedLogginInfos = JSON.parse(rawSavedLogginInfos);
      }
      setSavedLoggins(savedLogginInfos);
      return savedLogginInfos;
    }
    async function addSavedLogginInfos(user,pass) { 
      var savedLogginInfos = await getSavedLogginInfos();
      let filteredSavedLogginInfos = savedLogginInfos.filter((l) => (l.user != user));
      filteredSavedLogginInfos.push({user: user, pass:pass});
      await AsyncStorage.setItem('saved_loggin_infos', JSON.stringify(filteredSavedLogginInfos));
      await getSavedLogginInfos();
      return true;
    }
    async function removeSavedLogginInfos(_user,_pass) { 
      var savedLogginInfos = await getSavedLogginInfos();
      let filteredSavedLogginInfos = savedLogginInfos.filter((l) => (l.user != _user));
      await AsyncStorage.setItem('saved_loggin_infos', JSON.stringify(filteredSavedLogginInfos));
      await getSavedLogginInfos();
      return true;
    }

    async function loginAction() { 
      let login = await loginUser(user,pass);
            
            if (login.result == 0 ) {
              Alert.alert('Erro',login.message);
            }

            if (login.result==1) {
              let dadosUser = await getDados();
              if(dadosUser) {
                UserCtx.creditos = dadosUser.user.creditos;
                UserCtx.nome = dadosUser.user.nome;
                UserCtx.img = dadosUser.user.img;
                UserCtx.email = dadosUser.user.email;
              }

              if (isChecked) {
                await addSavedLogginInfos(user, pass);
              } else {
                await removeSavedLogginInfos(user, pass);
              }



              navigation.navigate('MainDrawer');
            }
    }

    return (
      <Container
        source={{uri:serverData['background-mobile']}}
        resizeMode="cover"
      > 
        <Logotipo 
          source={{uri:serverData.logotipo}}
          width={200}
          height={200}
        />
        <InputArea>
          <DefaultInput value={user} onChangeText={(t)=>{setUser(t)}} placeholder="Usuário" />
          <DefaultInput value={pass} secureTextEntry={true} onChangeText={(t)=>{setPass(t)}} placeholder="Senha" />
          <View style={{flexDirection: 'row',
    alignItems: 'flex-start', justifyContent:'flex-start', marginTop: 8}}>
        <Checkbox
          style={{marginRight: 8}}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Text style={{}}>Salvar Dados de Login</Text>
      </View>
      
        </InputArea>
        <ButtonArea>
          <ButtonContainer onPress={loginAction} primary>
            <Text>Acessar</Text>
          </ButtonContainer>
          <ButtonContainer onPress={async ()=>{
            await AsyncStorage.removeItem('@serverURL');
            navigation.navigate('ServerScreen');
          }}>
            <Text>Sair</Text>
          </ButtonContainer>
          
        </ButtonArea>
        
        {savedLoggins.length > 0 && 
        <InputArea>
          <Picker
          selectedValue={pickerSelected}
          onValueChange={(itemValue, itemIndex) => {
            setPickerSelected(itemValue);
        
            console.log(savedLoggins[itemIndex]);
            setUser(savedLoggins[itemIndex-1].user);
            setPass(savedLoggins[itemIndex-1].pass);
          }
          
          }
          style={{    width: '80%', marginTop: 12, backgroundColor: 'white', height: 35, fontSize: 14, borderRadius: 5, paddingVertical: 0, paddingHorizontal: 1}} 
          >
            <Picker.Item label={'Usuários Salvos'} value={''} enabled={false} />
          {savedLoggins.map((login)=>
            <Picker.Item key={login.user} label={login.user} value={login.user} />
          )}

        </Picker>
        </InputArea>
        }
      </Container>
    );
  }
  
export default LoginScreen;