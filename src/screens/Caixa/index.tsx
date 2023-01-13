import React, {useEffect, useState} from 'react';
import { Container,FAIcon,CardBlue,CardRed,CardGray, Text,SimpleLineIcon, Card, B, EntypoIcon, ScrollView } from './styles';
import { getCaixa } from '../../services/API'
import { Card as CardB } from '../ReportScreen/styles';
import { IconDate, MainButton, Row, TextDate, TextWhite } from '../ReportScreen/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

function CaixaScreen() {

    const [caixa,setCaixa] = useState([])
    const [total, setTotal] = useState('');



    const [showDate1, setShowDate1] = useState(false);
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [date1_real, setDate1Real] = useState('');
    const [date2_real, setDate2Real] = useState('');

    const [paymentType, setPaymentType] = useState('credito');
    
    const [showDate2, setShowDate2] = useState(false);


    const handleDate1 = (event, selectedDate) => {
    
      let _rawDate = new Date(selectedDate);
      
      let month = ''+(_rawDate.getMonth()+1);
      let day = selectedDate.getDate();
      console.log(day,'day');
  
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

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var today2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var difToSunday = 7-today.getDay();
    var nextSunday = new Date(today2.setDate(today.getDate()+difToSunday));
    console.log(nextSunday,'difToSunday');
    var lastSunday = new Date(today.setDate(today.getDate()-(today.getDay()-1)));

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

    const handleSearch = async () => {

      let result = await getCaixa(date1_real,date2_real);
      console.log(result);
         setCaixa(result.results);
         setTotal(result.total);
    
    }

    function getLastSunday() {
      var t = new Date();
      t.setDate(t.getDate() - (t.getDay()-1));
      return t;
    }


    useEffect(()=>{
      const myCaixa = async() => {
        let result = await getCaixa(lastSunday,nextSunday);
          console.log(result);
         setCaixa(result.results);
         setTotal(result.total);
      }

      if (date1_real == '' && date2_real == '') {
        handleDate1(null,lastSunday);
        handleDate2(null,nextSunday);
      }
      
      myCaixa();
    },[])

    if (caixa === []) {
      return (
        <Container>
          <Card>
            <Text> Carregando ...</Text>
          </Card>
        </Container>
      )
    }  else {
      return (
        <Container>

      <Row>
        <CardB onPress={()=>{
          setShowDate1(true)
        }}> 
          <IconDate name="date-range" size={18}/>

          <TextDate>
            {date1 ? date1 : 'Data Início'}
          </TextDate>
            {showDate1 && <DateTimePicker
              mode="date"
              value={getLastSunday()}
              onChange={handleDate1}
    
            />} 
        </CardB>
        <CardB onPress={()=>{
          setShowDate2(true)
        }}> 
          <IconDate name="date-range" size={18}/>
  
          <TextDate>
            {date2 ? date2 : 'Data Fim'}
          </TextDate>
            {showDate2 && <DateTimePicker
              mode="date"
              value={nextSunday}
              onChange={handleDate2}
            />} 
        </CardB>
        </Row>
        <Row>
        <Picker
                    
                    mode="dialog"
                    accessibilityLabel="Client Picker"
                    prompt="Selecione um cliente"
                    dropdownIconColor="grey"
                    style={{color: '#333', flex:2, height: 40, backgroundColor: '#444', color: 'white', marginVertical: 10}}
                    selectedValue={paymentType}
                    onValueChange={(itemValue, itemIndex) => { setPaymentType(itemValue)}}
                    >
                    <Picker.Item 
                    label="Crédito" 
                    value="credito"
                    style={{backgroundColor: 'cyan', padding: 0, margin: 0, height: 10}}
                    />
                    <Picker.Item 
                    label="Bônus" 
                    value="bonus"
                    style={{backgroundColor: 'cyan', padding: 0, margin: 0, height: 10}}
                    />
                    <Picker.Item 
                    label="Todos" 
                    value="todos"
                    style={{backgroundColor: 'cyan', padding: 0, margin: 0, height: 10}}
                    />
            </Picker>
        </Row>
        <Row style={{marginBottom: 30}}>
        <MainButton onPress={handleSearch}>
              <TextWhite>Buscar</TextWhite>
        </MainButton>
        </Row>


          <ScrollView>
          {caixa && caixa.map((i,index) =>
          <Card type={i.class} key={index}>
            <FAIcon name={i.icone} size={36} />
            <Text> {i.label}: <B>R$ {i.valor.toFixed(2)}</B> </Text>
          </Card>
          )}
          </ScrollView>
          
          {/* <Card>
            <SimpleLineIcon name="present" size={36} />
            <Text> Prêmios: <B>R$ {caixa[1] && caixa[1].valor.toFixed(2)}</B> </Text>
          </Card>
          <CardGray>
            <SimpleLineIcon name="present" size={36} />
            <Text> Prêmios em aberto: <B>{caixa[2] && caixa[2].valor.toFixed(2)}</B> </Text>
          </CardGray>
          <Card>
            <FAIcon name="piggy-bank" size={36} />
            <Text> Comissões: <B>R$ {caixa[3] && caixa[3].valor.toFixed(2)}</B> </Text>
          </Card>
          <CardRed>
            <FAIcon name="money-check-alt" size={36} />
            <Text> Você Deve: <B>R$ {caixa[4] && caixa[4].valor.toFixed(2)}</B> </Text>
          </CardRed>
          <CardRed>
            <FAIcon name="money-check" size={36} />
            <Text> Você Pagou: <B>R$ {caixa[5] && caixa[5].valor.toFixed(2)}</B> </Text>
          </CardRed>
          <Card>
            <FAIcon name="grin-wink" size={36} />
            <Text> Você Recebeu: <B>R$ {caixa[6] && caixa[6].valor.toFixed(2)}</B> </Text>
          </Card>
          <CardBlue>
            <EntypoIcon name="wallet" size={36} />
            <Text> Total <B>R$ {total}</B> </Text>
          </CardBlue> */}
        </Container>
      );
    }
    
  }
  
export default CaixaScreen;