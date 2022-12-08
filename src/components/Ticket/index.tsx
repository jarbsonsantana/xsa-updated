import React, {useState, useEffect} from 'react';
import { Text, Card, B, Cod,Modal, CardInfo, Icon,CardInfoIcon, TextRotated, TouchableOpacityIcon } from './styles';
import * as Clipboard from 'expo-clipboard';
import { Row, RowFull, ButtonIcon } from '../../screens/ReportScreen/styles';
import { Button, ButtonWhite } from '../../screens/SearchTicket/styles';
import { cancelTicket,  } from '../../services/API';
import {
    BLEPrinter,
  } from "react-native-thermal-receipt-printer";


function Ticket(props) {
    console.log(props.data)


    const handleCopy = async (text) => {
        Clipboard.setString(text);
    }

    const handlePrint = async (bilhete) => {
        props.handlePrint(bilhete)
        
    }

    const handleCancelTicket = async () => {
        let response = await cancelTicket(props.data.token);
        console.log(response);
        if (response) {
            alert(response.message);
        } else {
            alert('Erro na comunicação com o servidor')
        }
        props.cbCancel();
        
    }

    const [hide,setHide] = useState(false);

    return (
        
            <Card onPress={()=>{props.onPress(props.data.urlBilhete, props.data.token)}} win={props.data.statusTitle == 'Ganhou'} status={props.data.statusClass}>
                        
                <CardInfo style={{flex: 1}}> 

                <Row style={{justifyContent: 'space-between'}}>
                <Row>  
                    <Cod>{props.data.codigo}</Cod>
                    <TouchableOpacityIcon onPress={() => handleCopy(props.data.codigo)}>
                        <Icon name="copy" size={18} />
                    </TouchableOpacityIcon>  
                    </Row>          
                </Row>
                <Row style={{justifyContent: 'flex-end'}}>
                <Row> 
                    <Text>Cliente: <B>{props.data.cliente}</B> </Text>
                    </Row>   
                </Row>
                
                <Row>
                
                </Row>
                    <Row style={{justifyContent:'space-between', flex: 1}}>
                   
                    
                    <Text> Situação: <B>{props.data.statusTitle}</B></Text>
                    <Text> Jogos: <B>{props.data.jogos}</B></Text>
                    
                    </Row>
                    <Row style={{justifyContent:'space-between', flex: 1}}>
                        <Text> Valor: <B>{props.data.valor}</B></Text>
                        <Text> Possível Retorno: <B>{props.data.retorno}</B></Text>
                    </Row>
                    <Row>
                        <Text>Comissão: <B>{props.data.comissao}</B></Text> 
                    </Row>

                    <RowFull>
                        <ButtonWhite onPress={() => handlePrint(props.data.token)}>
                            <ButtonIcon name="print" size={24} />
                            <Text>Imprimir</Text>
                        </ButtonWhite>
                        {props.data.statusTitle != 'Cancelada' &&
                        <ButtonWhite onPress={handleCancelTicket}>
                            <ButtonIcon name="delete-forever" size={24} />
                            <Text> Cancelar </Text>
                        </ButtonWhite>
                            }
                        
                    </RowFull>
                </CardInfo>
                

                
            </Card>
        
    );
  }
  
export default Ticket;