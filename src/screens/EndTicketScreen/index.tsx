import React, {useState,useEffect} from 'react';
import { Container, Text,TicketsList, Button, Header, Sumario, SumarioText, B } from './styles';
import {WebView} from 'react-native-webview';
import { useNavigation, DrawerActions } from '@react-navigation/core';
import { captureRef } from "react-native-view-shot";
import {
  BLEPrinter,
} from "react-native-thermal-receipt-printer";
import { getImpressaoBilhete } from '../../services/API';
import { Dimensions, View } from 'react-native';

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

  const [componentHeight, setComponentHeight] = useState(0)
  const [globalComponentHeight, setGlobalComponentHeight] = useState(0)
  const [componentHeightFlex, setComponentHeightFlex] = useState(1)
   

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
    const takeScreenshot = _ => {
      console.log(globalComponentHeight)
      const {height} = Dimensions.get("window")
      console.log(height)
      if(globalComponentHeight <= height) setComponentHeight(height)
      else setComponentHeight(globalComponentHeight)
      setComponentHeightFlex(null)
      setTimeout(_ => {
         captureRef(webview, {
            format: "png",
            quality: 0.9,
            result: "base64"
         }).then(
            _screenshot => {
              console.log(_screenshot)
               //First save your screenshot from _screenshot(base64 string). You can send base64 string to your server and save
               //Then make the component default as below
               setComponentHeight(0)
               setComponentHeightFlex(1)
            },
            error => console.error("Oops, screenshot failed", error)
         );
      }, 100)
    }

    const navigator = useNavigation();
    let webview = null;
    return (
      <Container>     
        <Header>
            <Text style={{textAlign: 'center'}}>Bilhete cadastrado com sucesso.</Text> 
        </Header>
            <WebView
                  ref={ref => {
                    if (ref != null)
                      webview = ref
                }}
                style={{flex:1, width:330, height: '100%'}}
                originWhitelist={['*']}
                source={{uri: route.params.aposta.urlBilhete}}
            />
            <View style={{display: 'flex', flexDirection:'row', width: '80%', justifyContent:'space-around'}}>
            <Button style={{padding: 10, marginBottom: 10, marginTop: 10,  backgroundColor: 'green', width:"45%", borderRadius: 5, justifyContent: 'center', alignItems:'center'}} 
            onPress={(e)=>{
              takeScreenshot(e)
            }}>
              <Text style={{width: '100%', textAlign:'center'}}>Compartilhar</Text>
            </Button>
            <Button style={{padding: 10, marginBottom: 10, marginTop: 10, backgroundColor: '#444',width:"45%", borderRadius: 5, justifyContent: 'center', alignItems:'center'}} onPress={()=>{printBilhete(route.params.aposta.token)}}>
              <Text style={{width: '100%', textAlign:'center'}}>Imprimir</Text>
            </Button>

            </View>
           
      </Container>
    );
  }
  
export default EndTicketScreen;