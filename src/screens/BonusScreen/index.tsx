import React, {useEffect, useState} from 'react';
import { Container,FAIcon,CardBlue,CardRed,CardGray, Text,SimpleLineIcon, Card, B, EntypoIcon, ScrollView } from './styles';
import { createPix, getCaixa, getPixList, recreatePix, getBonusList } from '../../services/API';
import { Card as CardB } from '../ReportScreen/styles';
import { IconDate, MainButton, Row, TextDate, TextWhite } from '../ReportScreen/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Modal } from '../../components/AddOrSelectClientModal/styles';
import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import PixModal from '../../components/PixModal';

function BonusScreen() {

    const [modalVisible, setModalVisible] = useState(false);
    const [activePix, setActivePix] = useState({});

    const [PixList,setPixList] = useState([])
    const [BonusListInfo, setBonusListInfo] = useState([]);
    useEffect(()=>{
      const getListAsync = async() => {
        let result = await getBonusList();
        if (result?.result == 401) {
          Alert.alert('Erro', result?.message);
        }
          if (result.result) {
           
            setBonusListInfo(result.registros);
            // const registros = Object.values(result.registros);
            // setPixList(registros);  
          }
          
      }
      getListAsync()

    },[])

    



      return (
        <Container>


          <Card style={{justifyContent:'space-between'}}>

          <Text style={{width: 50}}>Tipo</Text>
          <Text style={{width: 90}}>Valor</Text>
            <Text style={{width: 90}}>Validade</Text>
            
            


          </Card>
          <ScrollView>
            {BonusListInfo.map((p, index) => {
              return (
                <CardGray style={{justifyContent:'space-between'}} key={index}>

                  <Text style={{width: 50}}>{p.type} </Text>
                  <Text style={{width: 90}}>R$ {p.valor}</Text>
                  <Text style={{width: 90}}>{p.bonusvalidade}</Text>
                  
                  
                  
                  
                
                </CardGray>
              )
              
            })}
            
          </ScrollView>
          {modalVisible  && 
            <PixModal activePix={activePix} modalVisible={modalVisible} setModalVisible={setModalVisible} onRequestClose={async ()=>{
              setModalVisible(false);
              
              let result = await getPixList();
              if (result?.result == 401) {
                Alert.alert('Erro', result?.message);
              }
                if (result.result) {
                  setPixListInfo(result);
                  const registros = Object.values(result.registros);
                  setPixList(registros);  
                }
              
              
            }} />
          }
        </Container>
      );    
  }
  
export default BonusScreen;