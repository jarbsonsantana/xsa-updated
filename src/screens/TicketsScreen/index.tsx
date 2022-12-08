import React, {useState,useEffect} from 'react';
import { Container, Text,TicketsList, Button, Sumario, SumarioText, B } from './styles';
import { FlatList } from 'react-native';
import Ticket from '../../components/Ticket';
import { Modal } from '../../components/Ticket/styles';
import {WebView} from 'react-native-webview';
import DateTimePicker from '@react-native-community/datetimepicker';

import { findTickets, findTicketsWithFilter, getImpressaoBilhete } from '../../services/API'
import { IconDate, TextDate, Row, Card, MainButton, TextWhite, ButtonIcon } from '../ReportScreen/styles';
import {
  BLEPrinter,
} from "react-native-thermal-receipt-printer";
import { ButtonWhite } from '../SearchTicket/styles';



function TicketsScreen() {

  useEffect(() => {     
    console.log('Conectando a impressoras');
    BLEPrinter.init().then(()=> {
        BLEPrinter.getDeviceList().then(setPrinters);
      }).then(
          _connectPrinter
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

      _connectPrinter();

      let texto = await getImpressaoBilhete(token);
      if (!printers[0]) {
        alert('Reconecte a impressora bluetooth');
        return;
      }
      console.log('---impr---',printers);
      setCurrentPrinter(printers[0]);
      BLEPrinter.printText(texto);
  }



  const [sumario,setSumario] = useState(null); 
  const [showDate1, setShowDate1] = useState(false);
  const [date1, setDate1] = useState('');
  const [date1_real, setDate1Real] = useState('');
  const [date2_real, setDate2Real] = useState('');
  const [date2, setDate2] = useState('');
  const [showDate2, setShowDate2] = useState(false);

  const [url, setUrl] = useState('');
  const [actual_token, setActualToken] = useState('');
  const [show, setShow] = useState(false);

  const [tickets,setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  useEffect(()=>{
    const getMyTickets = async () => {
      
      if (date1_real != '' && date2_real != '') {
        const result = await findTicketsWithFilter(date1_real,date2_real,page);
        setTickets(result.results.apostas);
        
        setSumario(result.results.sumario);
        setNext(result.next);
        setPrev(result.prev);
      } else {
         const result = await findTickets(page);
         setTickets(result.results.apostas);
         setSumario(result.results.sumario);
         setNext(result.next);
         setPrev(result.prev);
      }

      

    }
    //getMyTickets();
  },[])

  const handlePress = (defaultUrl, token) => {  
    setActualToken(token);
    setUrl(defaultUrl);
    setShow(true);
    

  }

  const handleSearch = async () => {
    let result = await findTicketsWithFilter(date1_real,date2_real, page)
    setTickets(result.results.apostas);
    setSumario(result.results.sumario);
    setNext(result.next);
    setPrev(result.prev);
  }

  const handleDate1 = (event, selectedDate) => {
    
    let _rawDate = new Date(selectedDate);
    
    let month = ''+(_rawDate.getMonth()+1);
    let day = selectedDate.getDate();

    if (day < 10) {
      day = '0'+day
    }
    if (parseFloat(month) < 10) {
      month = '0'+month
    }

    setShowDate1(false);
    if(!selectedDate) { return; }
    setDate1Real(_rawDate.getFullYear()+'-'+month+'-'+day);

    setDate1(day+'/'+month+'/'+_rawDate.getFullYear());
  }
  const handleDate2 = (event, selectedDate) => {
    console.log('Data Selecionada2:', selectedDate);

    let _rawDate = new Date(selectedDate);
    
    let month = ''+(_rawDate.getMonth()+1);
    let day = selectedDate.getDate();

    if (day < 10) {
      day = '0'+day
    }
    if (parseFloat(month) < 10) {
      month = '0'+month
    }
    setShowDate2(false);
    if(!selectedDate) { return; }
    setDate2Real(selectedDate.getFullYear()+'-'+month+'-'+day);

    setDate2(day+'/'+month+'/'+selectedDate.getFullYear());
  
    }

    const handleNextPage = () => {
       setPage(page+1); 
       handleSearch();
    }

    const handlePrevPage = () => {
      setPage(page-1); 
      handleSearch();
   }

   const cbCancel = async () => {
    const result = await findTicketsWithFilter(date1_real,date2_real,page);
    setTickets(result.results.apostas);
    
    setSumario(result.results.sumario);
   }

    return (
      <Container>

<Row>
        <Card onPress={()=>{
          setShowDate1(true)
        }}> 
          <IconDate name="date-range" size={18}/>

          <TextDate>
            {date1 ? date1 : 'Data Início'}
          </TextDate>
            {showDate1 && <DateTimePicker
              mode="date"
              value={new Date}
              onChange={handleDate1}
            />} 
        </Card>
        <Card onPress={()=>{
          setShowDate2(true)
        }}> 
          <IconDate name="date-range" size={18}/>

          <TextDate>
            {date2 ? date2 : 'Data Fim'}
          </TextDate>
            {showDate2 && <DateTimePicker
              mode="date"
              value={new Date}
              onChange={handleDate2}
            />} 
        </Card>
        </Row>
        <Row>
        <MainButton onPress={handleSearch} style={{backgroundColor: '#2E8BC0'}}>
              <TextWhite>Buscar</TextWhite>
        </MainButton>
          </Row>

          
           
         
        
          <Modal visible={show} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Button onPress={()=>{setShow(false)}}>
              <Text> ⬅ Voltar</Text>

            </Button>
            
            <WebView
                style={{flex:1, width:'100%', height: 700}}
                originWhitelist={['*']}
                source={{ uri: url }}
              />
              <ButtonWhite onPress={() => { printBilhete(actual_token)}}>
              {/* <ButtonIcon name="print" size={24} />  */}
                            <Text style={{textAlign: 'center', color: 'white', width: '100%'}}>
                            
                              Imprimir</Text>
                        </ButtonWhite>
          </Modal>
        <TicketsList>

        {sumario && <Sumario>
              <Row style={{justifyContent: 'space-between'}}>
                <SumarioText>Aguardando: <B>{sumario.aguardando.toFixed(0)}</B></SumarioText>
                <SumarioText>Apostas: <B>{sumario.apostas}</B></SumarioText>
                <SumarioText>Jogos: <B>{sumario.jogos.toFixed(0)}</B></SumarioText>
              </Row>
              <Row style={{justifyContent: 'space-between'}}>
                
                <SumarioText>Canceladas: <B>{sumario.canceladas}</B></SumarioText>
                <SumarioText>Perdidas: <B>{sumario.perdidas}</B></SumarioText>
                
              </Row>
              <Row style={{justifyContent: 'space-between'}}>
                <SumarioText>Prêmio: <B>{sumario.premio.toFixed(0)}</B></SumarioText>
                <SumarioText>Valor: <B>R$ {sumario.valor.toFixed(2)}</B></SumarioText>
                <SumarioText>Comissão: <B>R$ {sumario.comissao.toFixed(2)}</B></SumarioText>
                
              </Row>
              <Row>
              <SumarioText>Possivel retorno: <B>R$ {sumario.possivel_retorno.toFixed(2)}</B></SumarioText>
              </Row>
            </Sumario>}
        
        
        {/* {tickets && tickets.map((t) => {
          return <Ticket handlePrint={printBilhete} key={t.id} onPress={handlePress} cbCancel={cbCancel}  data={t} />
        })} */}

        {tickets && <FlatList 
          scrollEnabled={true}
          contentContainerStyle={{paddingBottom: 350}}
          data={tickets}
          renderItem={({item})=> <Ticket handlePrint={printBilhete} key={item.id} onPress={handlePress} cbCancel={cbCancel}  data={item} />}
          keyExtractor={item => item.id}
        
        />}

        </TicketsList>

        <Row>
          <Button onPress={handleNextPage}>
            {/* <Text> Página {page+1} </Text> */}
          </Button>
        </Row>

      </Container>
    );
  }
  
export default TicketsScreen;