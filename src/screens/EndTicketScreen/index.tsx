import React, {useState,useEffect} from 'react';
import { Container, Text,TicketsList, Button, Header, Sumario, SumarioText, B } from './styles';
import {WebView} from 'react-native-webview';
import { useNavigation, DrawerActions } from '@react-navigation/core';
import {
  BLEPrinter,
} from "react-native-thermal-receipt-printer";
import { getImpressaoBilhete } from '../../services/API';

function EndTicketScreen({route, navigation}) {

  useEffect(() => {     
    console.log('Conectando a impressoras');
    BLEPrinter.init().then(()=> {
        BLEPrinter.getDeviceList().then(setPrinters);
      }).then(
          () => _connectPrinter()
      );
}, []); 

  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState(null);

  const _connectPrinter = () => {
      setCurrentPrinter(printers[0]);
      //connect printer
      BLEPrinter.connectPrinter(printers[0].inner_mac_address);
    }
  const printBilhete = async (token) => {
      
      await _connectPrinter();

      let texto = await getImpressaoBilhete(token);
      if (!printers[0]) {
        alert('Reconecte a impressora bluetooth');
        return;
      }
      setCurrentPrinter(printers[0]);
      BLEPrinter.printText(texto);
  }

    const navigator = useNavigation();
    return (
      <Container>     
        <Header>
            <Text style={{textAlign: 'center'}}>Bilhete cadastrado com sucesso.</Text> 
        </Header>
            <WebView
                style={{flex:1, width:320, height: '100%'}}
                originWhitelist={['*']}
                source={{uri: route.params.aposta.urlBilhete}}
            />
            <Button style={{padding: 10, marginBottom: 10, marginTop: 10, backgroundColor: '#444', borderRadius: 5, width: '80%', justifyContent: 'center', alignItems:'center'}} onPress={()=>{printBilhete(route.params.aposta.token)}}>
              <Text style={{width: '100%', textAlign:'center'}}>Imprimir</Text>
            </Button>
      </Container>
    );
  }
  
export default EndTicketScreen;