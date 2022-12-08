
import React, {useState} from 'react';
import { Container, Text, Input, Button, ButtonText } from './styles';
import { useNavigation, StackActions } from '@react-navigation/native';
import { getServerInfo } from '../../services/API';
import AsyncStorage from '@react-native-async-storage/async-storage';


function ServerScreen() {
    const [server, setServer] = useState('');

    const navigation = useNavigation();

    const handleTextChange = (text) =>{
        let result = text.replace(/(^\w+:|^)\/\//, '');
        setServer(result);
    }

    function isValidURL(string) {
      var res = string.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      return (res !== null)
    };

    const handleButtonPress = async () => {
        if (!isValidURL(server)) {
          alert('O Endereço informado é inválido');
            return;
        }

        if (server.length < 3) {
            alert('Preencha um Domínio válido');
            return;
        }
        const response = await getServerInfo(server);
        if (response.apostaMax) {
            
            navigation.dispatch(StackActions.push('Login', {serverData: response}))
        } else {
            alert('Domínio inválido e/ou fora do ar.');
            return;
        }
        
        return;
        
    }
    return (
      <Container
        source={require('../../../assets/bg-server.png')}
      >
        <Text>DOMÍNIO DA BANCA</Text>
        <Input onChangeText={handleTextChange} value={server} />
        <Button onPress={handleButtonPress}>
            <ButtonText> ACESSAR </ButtonText>
        </Button>
      </Container>
    );
  }
  
export default ServerScreen;