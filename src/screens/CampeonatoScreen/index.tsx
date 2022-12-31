import React, { useState, useEffect } from "react"
import {Container, Row,ScrollView, InputValor, TitleTable,ButtonImprimir, Title, ScreenTitle, Button, HeaderIcon, Th, Td, CotacaoBtn, ButtonFinalizar, FinalizarTxt, TdLeft } from './styles'

import { useNavigation } from "@react-navigation/native";


import { BackHandler, Alert } from 'react-native';

import Cotacao from "../../components/Cotacao";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { useApostaCtx } from "../../hooks/useAposta";
import CotacaoAoVivo from "../../components/CotacaoAoVivo";
import { getImpressaoCampeonato } from "../../services/API";

import {
    BLEPrinter,
  } from "react-native-thermal-receipt-printer";
import { View } from "../Finalizar/styles";
import ImportarModal from "../../components/ImportarModal";

const CampeonatoScreen = ({route}) => {

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






    const [apostasCtx, setApostasCtx] = useApostaCtx();
    


    const game = route.params.game;
    const jogos = game.jogos;
    const navigation = useNavigation();
    const [apostas, setApostas] = useState([]);
    const [retornoStr, setRetornoStr] = useState('R$ 0.00');
    const [serverData, setServerData] = useState({});
    const [valorAposta, setValorAposta] = useState('0');

    
    

    useEffect(() => {
        const backAction = () => {
            setApostas([]);
            setRetornoStr('0.00');
            navigation.goBack();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, []);

    useEffect(()=>{
        const getServerData = async () => {
            let _serverData =  await AsyncStorage.getItem('@serverData') || '{}';
            let __serverData = JSON.parse(_serverData);
            setServerData(__serverData);
            if (valorAposta == '0' || valorAposta == '')
            setValorAposta(`${__serverData.apostaMin}`);
            await calculateRetorno();
            console.log('serverData', `${__serverData.apostaMin}`);
        }
        getServerData();
    },[])

    useEffect(()=>{
        
        calculateRetorno();
    }, [valorAposta, apostasCtx])


    const handleAposta = async (aposta) => {
        console.log(serverData);
        if (apostasCtx.length >= serverData.maxJogos) {
            alert('Máximo de jogos: '+serverData.maxJogos)
        }
        let myApostas = apostasCtx.filter((ap)=>ap.jogo != aposta.jogo);
        let _myApostas = apostasCtx.filter((ap)=> JSON.stringify(ap) == JSON.stringify(aposta));
        if (_myApostas.length < 1) {
            if (apostasCtx.length >= serverData.maxJogos) {
                alert('Máximo de jogos: '+serverData.maxJogos)
            } else {
                myApostas.push(aposta);  
            }
            //myApostas.push(aposta);
        } 
       

        setApostasCtx(myApostas);
        calculateRetorno();
        return;

    }

    const handleRemoveAposta = async (ap) => {
        let [newApostasContext] = useApostaCtx();
        calculateRetorno();
        let myApostas = newApostasContext.filter((aposta) => aposta.jogo != ap);
        await setApostasCtx(myApostas);
        calculateRetorno();
        return;
    }


    const handleFinalizar = async () => {

        let minJogos = serverData.minJogos;

        //Regra de negócio numero mínimo de jogos.
        if (apostasCtx.length < minJogos) {
            alert('Mínimo de jogos: '+minJogos)
            return; 
        }


        // Regra de negócio - Cotação mínima:
        let cotValor = 0
        apostasCtx.map((v)=>{
            cotValor += v.cotacao;
        })
        if (cotValor < serverData.cotacaoMin) {
            alert('Cotação abaixo do mínimo exigido: '+serverData.cotacaoMin)
            return;
        }
       

        //Regra de negócio numero máximo de jogos.
        let meuValor = 0;
        apostasCtx.map((v)=>{
            meuValor += v.valor;
        })

        //Regra de Negócio Retorno Máximo
        let retornoMaximo = serverData.retornoMaximo;
        if (meuValor > retornoMaximo) {
            alert('Retorno maximo maior que o permitido. O retorno máximo é de '+retornoMaximo)
        }

            
    
       let finalJson = { 
           apostas:apostasCtx, 
           valorApostado: valorAposta, 
           retornoCalculado: retornoStr, 
           cotacao_valor:meuValor,
           dicCotacoes: route.params.dicCotacoes,
           isLive: route.params.isLive || false
        };

        navigation.navigate('Finalizar', finalJson);
        
    }

    const calculateRetorno = () => {
        let meuValor = 1;
        apostasCtx.map((v)=>{
            meuValor *= v.valor;
        })

        if (meuValor == 1) {
            setRetornoStr('R$ 0.00');
            return;
        }

        if (valorAposta >= 0) {
            let apostaRetornoFiltered = valorAposta*meuValor > serverData.retornoMaximo ? serverData.retornoMaximo  : valorAposta*meuValor;
            setRetornoStr(`${(apostaRetornoFiltered).toFixed(2)}`);
        } else {
            setRetornoStr('R$ 0.00');
        }
        
    }

    const handleValorApostaChange = async (v) => {

        let valorApostado = parseFloat(v);
        let apostaMax = parseFloat(serverData.apostaMax);
        let apostaMin = parseFloat(serverData.apostaMin);
        
        setValorAposta(v);

        if (valorApostado > apostaMax) {
            alert('Aposta máxima: '+apostaMax)
            setValorAposta(serverData.apostaMax);
        }
        if (valorApostado < apostaMin) {
            alert('Aposta mínima: '+apostaMin)
            setValorAposta(serverData.apostaMin);
        }

        setValorAposta(v);
    }

    const handlePrintButtonPress = async () => {

       _connectPrinter();
        let impressao = await getImpressaoCampeonato(jogos[0].campeonato);
  
        if (!printers[0]) {
          alert('Reconecte a impressora bluetooth');
          return;
        }

        setCurrentPrinter(printers[0]);
        BLEPrinter.printText(impressao);
    }

    const [importarModalVisible, setImportarModalVisible] = useState(false);

    return (
        <Container>

            <ScreenTitle>
                <Button onPress={() => {
                    setApostas([]);
                    setRetornoStr('R$ 0.00');
                    setValorAposta(0);

                    navigation.goBack();
                }}>
                    <HeaderIcon name="arrow-back-sharp" size={18} />
                </Button>
                <Title> {game.title} </Title>
               
                    <Button style={{backgroundColor: '#333', borderRadius: 5}} onPress={()=>{
                        setImportarModalVisible(!importarModalVisible)
                    }}><Title style={{color: '#fff', fontSize: 14}}> Importar </Title></Button>

                
                
            </ScreenTitle>

            <ImportarModal 
            aovivo={route.params.isLive} setLoading={(status)=>{
              
                }} modalVisible={importarModalVisible} setModalVisible={setImportarModalVisible} onRequestClose={()=>{
                    setImportarModalVisible(false);
                }} getBillet={(num)=>{

                    num.map((_apostaItem_) => {
                        handleAposta(_apostaItem_);
                    });
                    setImportarModalVisible(false);
    
                    handleFinalizar();
                }} />


            <Row>
                <InputValor placeholder={'Valor'} value={valorAposta} onChangeText={handleValorApostaChange} keyboardType="numeric" />
                <InputValor placeholder={'Valor'} value={retornoStr} editable={false} selectTextOnFocus={false} style={{color:'#555555'}} />
                <ButtonImprimir onPress={handlePrintButtonPress}>
                    <HeaderIcon name="print" size={14} />
                </ButtonImprimir>
                <ButtonFinalizar onPress={handleFinalizar}>
                    <FinalizarTxt>Finalizar ({apostasCtx.length})</FinalizarTxt>
                </ButtonFinalizar>
            </Row>

  
            <Th>
                <TdLeft>
                    <TitleTable>Casa x Visitante</TitleTable>
                </TdLeft>
                <Td>
                    <CotacaoBtn>
                        <TitleTable> 1</TitleTable>
                    </CotacaoBtn>
                    <CotacaoBtn>
                        <TitleTable>X</TitleTable>
                    </CotacaoBtn>
                    <CotacaoBtn>
                    <TitleTable>2 </TitleTable>
                    </CotacaoBtn>
                </Td>
            </Th>
                
            {
                route.params.isLive ? 
                <ScrollView contentContainerStyle={{paddingBottom: 400, minHeight: '100%'}}>    
                    {jogos.map((jogo)=><CotacaoAoVivo serverData={serverData} isLive={route.params.isLive || false} apostas={apostasCtx} dicGrupos={route.params.dicGrupos} dicCotacoes={route.params.dicCotacoes} handleRemoveAposta={handleRemoveAposta} key={jogo.id} jogo={jogo} game={game} onSelect={handleAposta}/>)}
                </ScrollView>
                :
                <ScrollView contentContainerStyle={{paddingBottom: 400, minHeight: '100%'}}>    
                    {jogos.map((jogo)=><Cotacao serverData={serverData} isLive={route.params.isLive || false} apostas={apostasCtx} dicGrupos={route.params.dicGrupos} dicCotacoes={route.params.dicCotacoes} handleRemoveAposta={handleRemoveAposta} key={jogo.id} jogo={jogo} game={game} onSelect={handleAposta}/>)}
                </ScrollView>
            }
        </Container>
    )
}

export default CampeonatoScreen;