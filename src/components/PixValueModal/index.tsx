import React, {useEffect, useState} from 'react';
import { Container,FAIcon,CardBlue,CardRed,CardGray, Text,TextInput, Card, B, EntypoIcon, ScrollView } from './styles';
import { checkPix, } from '../../services/API';
import { Button, Modal } from '../AddClientModal/styles';

import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';


const PixValueModal = ({generatePix, modalVisible, setModalVisible, onRequestClose}) => { 

  const [pixValue, setPixValue] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState(null);

  function validateValue() { 
    if (isNaN(pixValue)) {
      Alert.alert('Erro', 'Valor do pix Inválido');
      return false;
    }
    if (pixValue < 0) {
      Alert.alert('Erro', 'Valor do pix Inválido');
      return false;
    }
    return true;
  }
   

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
                <TouchableOpacity style={{alignSelf: 'flex-end', backgroundColor: '#eee', display:'flex', justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, marginVertical: 5, borderRadius: 5, flexDirection: 'row'}} 
                    onPress={()=>{
                      onRequestClose();                      
                    }}
                  >
                    <Text style={{color: '#000'}}> Fechar </Text>
                </TouchableOpacity>

                
                <Text style={{color: '#fefefe', margin: 10}}> Qual o valor desejado? {pixValue} </Text>
                <TextInput 
                value={pixValue}
                onChangeText={setPixValue}
                style={{backgroundColor: 'white', width:'50%', height: 40, borderRadius: 3, padding: 10}} 
                keyboardType="numeric" 
                placeholder="Digite o valor" />
                <TouchableOpacity style={{backgroundColor: '#eee', display:'flex', justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, marginVertical: 5, borderRadius: 5, flexDirection: 'row'}} 
                    onPress={()=>{
                      console.log('clicou');
                      if (validateValue()) {
                        console.log('validou');
                        generatePix(pixValue);
                        onRequestClose();
                      }
                    }}
                  >
                    <Text style={{color: '#000'}}> Gerar </Text>
                </TouchableOpacity>

                
              </Card>
            </Container>          
          </Modal>
          </>
    )
}
export default PixValueModal;