import React, {useState, useEffect} from 'react';
import { Container, Text, Card, View, BlackText, TextInput, Button, ButtonFull } from './styles';
import { diffServerTimeValidate, getDados, preValidarAposta, ticketDetails, validarAposta } from '../../services/API'
import {WebView} from 'react-native-webview';
import AddOrSelectClientModal from '../../components/AddOrSelectClientModal';
import { useFocusEffect } from '@react-navigation/native';
import { EventEmitter } from '@react-navigation/native';
import { Alert, Linking } from 'react-native';

function SearchTicket({navigation}) {
    const [show, setShow] = useState(false);
    const [bilhete, setBilhete] = useState({});
    const [code,setCode] = useState('');
    const [aposta,setAposta] = useState('');
    const [useCanApprove, setUserCanApprove] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [showAposta, setShowAposta] = useState(false);

  
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('blur', () => {
        // do something
        
          setAposta('');
          setCode('');
          setShowAposta(false);
        

      });
  
      return unsubscribe;
    }, [navigation]);
    
    useEffect(()=>{

      

      if (aposta != '') {
        checkIfUserCannotSeeBtn();
        //setShowBtn(true);
      }


      
    },[aposta])

    const findTicket = async () => {
      diffServerTimeValidate();
      if (code == '') {
        alert('Preencha o código do bilhete')
        return;
      }

      let result = await ticketDetails(code);

      if (result.result == 0) {
        alert(result.message);
        return;
      }
      setBilhete(result.aposta);
      setAposta(result.aposta.urlBilhete);
      setShowAposta(true);
      console.log('apst', aposta);
    }

    const handleAprovarBilhete = async () => {

    }

    const checkIfUserCannotSeeBtn = async () => {
      let dadosUser = await getDados();
      console.log(dadosUser,'duser');
      if (dadosUser.user.tipo == 4) { 
        setUserCanApprove(false);
        return false;
      }
        setUserCanApprove(true);
        return true;
    }



    const handleSelectClient = async (response) => {
      setShow(false)
      let client = response.clientes.find((c) => c.id === response.id);

      let _data = {
        apostadorId: client.id,
        apostadorNome: client.nome,
        apostadorCelular: client.celular,
        token: bilhete.token
      } 
      let canValidate = await preValidarAposta(bilhete.token);
      if (canValidate.result == '0') {
        Alert.alert('Erro', canValidate.result.message);
        return;
      } else if(canValidate.result == 2) {

        if (canValidate.result == 2) {

          Alert.alert('Confirmação', canValidate.result.message, [
            {
              text: "Continuar",
              onPress: async () => {
                let _response = await validarAposta(_data);
                if (_response) {
                  alert(_response.message)
                  let result = await ticketDetails(code);
                  setBilhete({});
                  setBilhete(result.aposta);
          
                } else {
                  alert(`Problema com a conexão ao servidor.{"\n"}Tente novamente mais tarde.`);
                }
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "Cancelar",
            },
          ]);

        } else {
          let _response = await validarAposta(_data);
          if (_response) {
            alert(_response.message)
            let result = await ticketDetails(code);
            setBilhete({});
            setBilhete(result.aposta);
    
          } else {
            alert(`Problema com a conexão ao servidor.{"\n"}Tente novamente mais tarde.`);
          }
        }

        
      }


      

     
      

      console.log('Resposta final: ',_response)
    }

    function onShouldStartLoadWithRequest(request){

      // short circuit these
      if (!request.url ||
        request.url.startsWith('http') ||
        request.url.startsWith("/") ||
        request.url.startsWith("#") ||
        request.url.startsWith("javascript") ||
        request.url.startsWith("about:blank")
      ) {
        return true;
      }
    
      // blocked blobs
      if(request.url.startsWith("blob")){
        alert("Link cannot be opened.");
        return false;
      }
    
      // list of schemas we will allow the webview
      // to open natively
      if(request.url.startsWith("tel:") ||
        request.url.startsWith("mailto:") ||
        request.url.startsWith("maps:") ||
        request.url.startsWith("geo:") ||
        request.url.startsWith("sms:")
        ){

        Linking.openURL(request.url).catch(er => {
          alert("Failed to open Link: " + er.message);
        });
        return false;
      }
    
      // let everything else to the webview
      return true;
    }

    return (
      <Container>
        <AddOrSelectClientModal show={show} cbClient={handleSelectClient} requestClose={()=>{setShow(false)}} />
        <Card>
          <TextInput value={code} keyboardType="numeric" onChangeText={(code) => setCode(code)}placeholder="Código do bilhete"/>
          <Button onPress={findTicket}>
            <Text>Consultar Bilhete</Text>
          </Button>
        </Card>
        <View style={{flex: 1  }}>
          {showAposta && <WebView
          style={{width:370, height: '100%'}}
          originWhitelist={['*', 'http://*', 'https://*', 'intent://*']}
          source={{ uri: aposta }}
          bounces={false}
          allowFileAccess={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          geolocationEnabled={true}
          saveFormDataDisabled={true}
          allowFileAccessFromFileURLS={true}
          allowUniversalAccessFromFileURLs={true}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        />}


        </View>
          {aposta != '' && bilhete.status && (bilhete.status == 2 || bilhete.status == 0) && useCanApprove && <ButtonFull disabled={false} onPress={()=>{
            setShow(true);
            
          }}
          
          >
            <Text>Aprovar Bilhete!</Text>
          </ButtonFull>}

         
        
      </Container>
    );
  }
  
export default SearchTicket;