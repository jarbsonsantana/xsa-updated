import React, {useState, useEffect} from 'react';
import { Container,IconDate, CardResult, TextDate,TextWhite,  MainButton,Card, Text, MainCard, Row } from './styles';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getClientes, getRelatorio } from '../../services/API'

function ReportScreen() {

  const [clients,setClients] = useState([]);

    useEffect(()=>{
      const myClients = async () => {
        let result = await getClientes();
        console.log(result);
        setClients(result.clientes);
      }
      myClients();
    },[])
    const [showDate1, setShowDate1] = useState(false);
    const [date1, setDate1] = useState('');
    const [date1_real, setDate1Real] = useState('');
    const [date2_real, setDate2Real] = useState('');
    const [date2, setDate2] = useState('');
    const [clientSelected, setClientSelected] = useState('0');
    const [queryResults, setQueryResults] =  useState([]);
    
    const [showDate2, setShowDate2] = useState(false);


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

    const handleSearch = async () => {
      let result = await getRelatorio(clientSelected, date1_real, date2_real)
      setQueryResults(result.results);
      console.log(result);
    
    }


    return (
      <Container>
        <MainCard>
            <Picker
            style={{backgroundColor: '#333'}}
            mode="dialog"
            accessibilityLabel="Client Picker"
            prompt="Selecione um cliente"
            dropdownIconColor="white"
            style={{color: 'white', paddingVertical: 10}}
            selectedValue={clientSelected}
            onValueChange={(itemValue, itemIndex) => setClientSelected(itemValue)}
            >
              <Picker.Item 
              label="Todos os Clientes" 
              value="0"
              style={{backgroundColor: 'green', padding: 15}}
              />
              {clients && clients.map((c) =><Picker.Item 
              key={c.id}
              label={c.nome} 
              value={c.id}
              style={{backgroundColor: 'green'}}
              /> )
              
              }
            </Picker>
        </MainCard>
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
              maximumDate={new Date()}
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
        <MainButton onPress={handleSearch}>
              <TextWhite>Buscar</TextWhite>
        </MainButton>
        </Row>

        
          {queryResults && queryResults.map((i) => {
          return (
            <CardResult key={i.label}>
              <Text>{i.label}</Text>
              <Text>R$ {i.valor.toFixed(2)}</Text>
            </CardResult>
          )
          })}
          
        
      </Container>
    );
  }
  
export default ReportScreen;