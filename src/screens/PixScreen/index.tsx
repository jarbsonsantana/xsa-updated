import React, {useEffect, useState} from 'react';
import { Container,FAIcon,CardBlue,CardRed,CardGray, Text,SimpleLineIcon, Card, B, EntypoIcon, ScrollView } from './styles';
import { createPix, getCaixa, getPixList, recreatePix } from '../../services/API';
import { Card as CardB } from '../ReportScreen/styles';
import { IconDate, MainButton, Row, TextDate, TextWhite } from '../ReportScreen/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Modal } from '../../components/AddOrSelectClientModal/styles';
import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import PixModal from '../../components/PixModal';
import PixValueModal from '../../components/PixValueModal';

function PixScreen() {

    const [modalVisible, setModalVisible] = useState(false);
    const [valorModalVisible, setValorModalVisible] = useState(false);
    const [newPixValue, setNewPixValue] = useState<any>(null);
    
    
    const [activePix, setActivePix] = useState({});

    const [PixList,setPixList] = useState([])
    const [PixListInfo, setPixListInfo] = useState({});
    useEffect(()=>{
      const getPixListAsync = async() => {
        let result = await getPixList();
        if (result?.result == 401) {
          Alert.alert('Erro', result?.message);
        }
          if (result.result) {
            setPixListInfo(result);
            const registros = Object.values(result.registros);
            setPixList(registros);  
          }
          
      }
      getPixListAsync()

    },[])

    async function generatePix(value : number) {
      const pixCreated = await createPix(value);
      console.log('PixCreated: ', pixCreated);
      let regeneratedPix = await recreatePix(pixCreated.id);
      setActivePix({...pixCreated, valor: value, regenerated: regeneratedPix});
      setModalVisible(true);
    }

    async function criarPix() { 
      setValorModalVisible(true);
      return;
    }

      return (
        <Container>
          <PixValueModal modalVisible={valorModalVisible} generatePix={generatePix} setModalVisible={setValorModalVisible} onRequestClose={async ()=>{
              setValorModalVisible(false);
              
  
              
            }} />


                <TouchableOpacity style={{alignSelf: 'flex-end', backgroundColor: '#eee', borderRadius: 5, marginBottom: 15, display:'flex', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, marginVertical: 5, flexDirection: 'row'}} 
                  onPress={() => {
                    console.log('Criando PIX');
                    criarPix();
                  }}
                >
                    <Text style={{color: '#000'}}>+ Novo Depósito</Text>
                </TouchableOpacity>

          <Card style={{justifyContent:'space-between'}}>

            <Text style={{width: 30}}>Cód</Text>
            <Text style={{width: 90}}>Valor</Text>
            <Text style={{width: 90}}>Status</Text>
            <Text style={{width: 40}}>
              Ação
            </Text>

          </Card>
          <ScrollView>
            {PixList.map((p) => {
              return (
                <CardGray style={{justifyContent:'space-between'}} key={p.id+'test'}>

                  <Text style={{width: 30}}>{p.id}</Text>
                  <Text style={{width: 90}}>R$ {p.valor.replace('.',',')} </Text>
                  <Text style={{width: 90}}>{p.statustitle}</Text>
                  {p.status != 2 ? 
                  <TouchableOpacity onPress={async ()=>{
                    setActivePix(p);
                    console.log('activePix', p);
                    let regeneratedPix = await recreatePix(p.id);
                    console.log(regeneratedPix, 'ID: '+p.id+'.' );
                    if (regeneratedPix.result) {
                      setActivePix({...p, regenerated: regeneratedPix});
                    } else {
                      Alert.alert('Erro', regeneratedPix?.message)
                    }

                    setModalVisible(true);
                  }} style={{width: 40}}>
                      <FAIcon name="qrcode" style={{padding: 7}} />
                  </TouchableOpacity>
                  : <Text style={{width: 40}}></Text>}
                  
                
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
  
export default PixScreen;