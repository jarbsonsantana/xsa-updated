import React, {useEffect, useState} from 'react';
import { Container,FAIcon,CardBlue,CardRed,CardGray, Text,SimpleLineIcon, Card, B, EntypoIcon, ScrollView } from './styles';
import { checkPix, createPix, getCaixa, getPixList, recreatePix } from '../../services/API';
import { Card as CardB } from '../ReportScreen/styles';
import { IconDate, MainButton, Row, TextDate, TextWhite } from '../ReportScreen/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Modal } from '../AddClientModal/styles';
import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'react-native';

const PixModal = ({activePix, modalVisible, setModalVisible, onRequestClose}) => { 

  useEffect(()=>{

    let my_timer = setInterval(async () => {
      if (isLoading) { 
        console.log('Carregando...');
        return; }
      if (!activePix?.id) { 
        console.log('error ActivePix', activePix)
        return; }

      setIsLoading(true);
      
      console.log('called', activePix.id);
      const result = await checkPix(activePix.id);
      console.log(result);
      setIsLoading(false);
    }, 5000)
    return () => {
      clearInterval(my_timer);
    }
  },[])
  const [pixStatus, setPixStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState(null);

   

    return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              onRequestClose();
            }}
          >
            <Container> 
              <Card style={{flexDirection: 'column'}}>
              <TouchableOpacity style={{alignSelf: 'flex-end', backgroundColor: '#eee', display:'flex', justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 5, marginVertical: 5, flexDirection: 'row'}} 
                  onPress={()=>{
                    onRequestClose();
                  }}
                >
                    <Text style={{color: '#000'}}>Fechar </Text>
                </TouchableOpacity>
                <Text style={{color: 'white', fontSize: 44, fontWeight: 'bold'}}> PIX </Text>
                <Text style={{color: 'white', fontSize: 36}}> R$ {activePix?.valor}  </Text>
                <Text style={{color: '#fefefe'}}> Utilize o código para depositar (Copie & Cole) </Text>

                <TouchableOpacity style={{backgroundColor: 'white', display:'flex', marginVertical: 15, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20,borderRadius: 10, marginVertical: 0, flexDirection: 'row'}} 
                  onPress={()=>{
                    Alert.alert('Sucesso', 'Chave PIX Copiada com sucesso');
                  }}
                >
                  
                <FAIcon name="copy" style={{fontSize: 24, color: '#000'}} />
                    <Text style={{color: '#000'}}>Copiar Chave Pix </Text>
                </TouchableOpacity>
                <Text style={{color: '#fefefe'}}> Ou escaneie o código abaixo </Text>
                {activePix?.regenerated?.imagemQrcode && 
                <Image style={{width: 250, height: 250, resizeMode: 'contain', margin: 20}} source={{uri: activePix.regenerated.imagemQrcode}}/>
                }
                
                
                <ActivityIndicator color="#aaa" />
                <Text style={{color: '#aaa'}}> Aguardando Pagamento </Text>

                
              </Card>
            </Container>          
          </Modal>
          </>
    )
}
export default PixModal;