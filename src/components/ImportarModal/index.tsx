import React, {useEffect, useState} from 'react';
import { Container,FAIcon,CardBlue,CardRed,CardGray, Text,TextInput, Card, B, EntypoIcon, ScrollView } from './styles';
import { checkPix, importarBilheteApostar, getAllGames } from '../../services/API';
import { Button, Modal } from '../AddClientModal/styles';

import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';


const ImportarModal = ({getBillet, modalVisible, setModalVisible, onRequestClose, setLoading}) => { 

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

  async function importarBilhete(bilhete) {
    setLoading(true);
    console.log('Importando bilhete ' , bilhete);
    const result = await importarBilheteApostar(bilhete);
    console.log('Resultado:', result);

    if (result.result == 2) {
      Alert.alert('Erro', result.message)
    }

    if (result.result == 1) {
      
      console.log(result.jogos);


      var jogosValidos = [];
      var jogosInvalidos = 0;
      const games = await getAllGames();
      result.jogos.map((jogoAtual) => {
        console.log('tete:',jogoAtual);
        const _ct =  games.campeonatos.filter((camp) => camp.id == jogoAtual.campeonato );
        
        if (_ct.length < 1) {
         jogosInvalidos++; 
         console.log('erro, _ctlenght')
         return false;
        }

        const _jg =  _ct[0].jogos.filter((jg) => jg.id == jogoAtual.jogo)
        
        if (_jg.length < 1) {
          jogosInvalidos++; 
          console.log('erro, _jglenght')
          return false;
         }


         jogosValidos.push({
          title: _jg[0].casa +' X '+_jg[0].fora,
          campeonato: jogoAtual.campeonato,
          jogo: jogoAtual.jogo,
          tempo: jogoAtual.tempo,
          cotacao: jogoAtual.cotacaocampo,
          valor: _jg[0].cotacoes[jogoAtual.tempo][jogoAtual.cotacaocampo]
        });

      })
      console.log(jogosValidos);
      //108 118 643
      if (jogosInvalidos > 0) {
        Alert.alert('Atenção', `${jogosInvalidos} jogos inválidos não foram importados.`);
      }
      getBillet(jogosValidos);
      
      return;
    }
    
  }
   

    return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setPixValue(null);
              onRequestClose();
            }}
          >
            <Container> 
              <Card style={{flexDirection: 'column'}}>
                <TouchableOpacity style={{alignSelf: 'flex-end', backgroundColor: '#eee', display:'flex', justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, marginVertical: 5, borderRadius: 5, flexDirection: 'row'}} 
                    onPress={()=>{
                      setPixValue(null);
                      onRequestClose();                      
                    }}
                  >
                    <Text style={{color: '#000'}}> Fechar </Text>
                </TouchableOpacity>

                
                <Text style={{color: '#fefefe', margin: 10}}> Digite o Código do Bilhete </Text>
                <TextInput 
                value={pixValue}
                onChangeText={setPixValue}
                style={{backgroundColor: 'white', width:'50%', height: 40, borderRadius: 3, padding: 10}} keyboardType="numeric" placeholder="Digite o Código" />
                <TouchableOpacity style={{backgroundColor: '#eee', display:'flex', justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, marginVertical: 5, borderRadius: 5, flexDirection: 'row'}} 
                    onPress={()=>{
                      console.log('clicou');
                      if (validateValue()) {
                        console.log('validou');
                        

                        importarBilhete(pixValue)
                        setPixValue(null);
                        //onRequestClose();
                      }
                    }}
                  >
                    <Text style={{color: '#000'}}> Importar </Text>
                </TouchableOpacity>

                
              </Card>
            </Container>          
          </Modal>
          </>
    )
}
export default ImportarModal;