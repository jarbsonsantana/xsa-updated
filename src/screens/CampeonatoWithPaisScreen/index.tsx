import React, { useState, useEffect, useCallback, useMemo } from "react"
import {Container, Row,ScrollView, InputValor, TitleTable,ButtonImprimir, Title, ScreenTitle, Button, HeaderIcon, Th, Td, CotacaoBtn, ButtonFinalizar, FinalizarTxt, RowVerMais, ButtonVerMais, VerMaisTxt } from './styles'

import { useNavigation } from "@react-navigation/native";

import { FlatList, View } from "react-native";

import LoadingModal from "../../components/LoadingModal";

import { BackHandler, Alert } from 'react-native';

import Cotacao from "../../components/Cotacao";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { useApostaCtx } from "../../hooks/useAposta";
import CotacaoPais from "../../components/CotacaoPais";

import { getGamesAoVivo, getGamesFiltered, getImpressaoAoVivo, getImpressaoData, getMyServerInfo } from "../../services/API";
import { TdLeft } from "../CampeonatoScreen/styles";

import {
    BLEPrinter,
  } from "react-native-thermal-receipt-printer";
import ImportarModal from "../../components/ImportarModal";


const CampeonatoWithPaisScreen = ({route}) => {

    useFocusEffect(()=>{
        
        calculateRetorno();
    })



      const [printers, setPrinters] = useState([]);
      const [currentPrinter, setCurrentPrinter] = useState(null);
      const [countriesToRender, setCountriesToRender] = useState([]);
     
      const _connectPrinter = () => {
        setCurrentPrinter(printers[0]);
        //connect printer
        BLEPrinter.connectPrinter(printers[0].inner_mac_address);
      }


    const [apostasCtx, setApostasCtx] = useApostaCtx();
    const [serverData, setServerData] = useState({});
    const [allGames, setAllGames] = useState([]);
    
   
    const navigation = useNavigation();

    const [apostas, setApostas] = useState([]);

    const [retornoStr, setRetornoStr] = useState('R$ 0.00');

    const [isLoading, setIsLoading] = useState(false);
    

    const [valorAposta, setValorAposta] = useState('0');

    const [currentItemsToShow, setCurrentItemsToShow] = useState(5);

    

    const [games, setGames] = useState({});
    const [importarModalVisible, setImportarModalVisible] = useState(false);


    function ShowNextPage() { 
        setCurrentItemsToShow((currentItems) => currentItems+5);
    }

    useEffect(() => {
        if(currentItemsToShow > 5) {
            setCurrentItemsToShow(5);
        }
        
        const getGamesData = async () => {
            setIsLoading(true);
            let _games = undefined;
            console.log(route.params);
            if (route.params.date == 'online') {
                 _games = await getGamesAoVivo();
            } else {
                _games = await getGamesFiltered(route.params.date, route.params.date);
            }
            let sData = await getMyServerInfo();
            setServerData(sData);
            setValorAposta(sData.apostaMin.toString())
            
            setGames(_games);
            setCountriesToRender(_games.paises);
            
            if (parseFloat(valorAposta) < parseFloat(route.params.serverData.apostaMin)) {
                setValorAposta(route.params.serverData.apostaMin.toString());
                
            }
            setIsLoading(false);
        }
        getGamesData();
       
    },[route.params.date])

    useEffect(()=>{
        
        calculateRetorno();
    }, [valorAposta, apostasCtx])


    const handleAposta = async (aposta) => {
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

        let isLive = route.params.isLive ?? false;
       
            
    
       let finalJson = { 
           apostas:apostasCtx, 
           valorApostado: valorAposta, 
           retornoCalculado: retornoStr, 
           cotacao_valor:meuValor,
           dicCotacoes:games.cotacoes,
           isLive
        };

        navigation.navigate('Finalizar', finalJson);
        
    }




    const calculateRetorno = () => {
        let meuValor = 1;
        apostasCtx.map((v)=>{
            meuValor *= v.valor;
        })

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


    }

    const renderFlatListItem = ({item}) =>
    <CotacaoPais serverData={serverData} isLive={route.params.isLive || false} apostas={apostasCtx} dicCotacoes={games.cotacoes} dicGrupos={games.grupos} game={item} handleRemoveAposta={handleRemoveAposta} key={`item-pais-${item.id}`} onSelect={handleAposta}  />
    const memoizedValue = useMemo(() => renderFlatListItem, [games, apostasCtx]);

    const cbRenderItem = useCallback(renderFlatListItem, [games, apostasCtx])


    const handlePrintButtonPress = async () => {

        // console.log('Conectando a impressoras');
        await BLEPrinter.init()
        await BLEPrinter.getDeviceList().then(setPrinters);

       _connectPrinter();

        if (route.params.isLive) {
            var impressao = await getImpressaoAoVivo();
    
        } else {
            var impressao = await getImpressaoData(games.paises[0].campeonatos[0].jogos[0].data);
        }

        
  
        if (!printers[0]) {
          alert('Reconecte a impressora bluetooth');
          return;
        }
        console.log('---impr---',printers);
        setCurrentPrinter(printers[0]);
        BLEPrinter.printText(impressao);
       

    }


    return (
        <Container>
            <LoadingModal show={isLoading} />
            <ScreenTitle>
                <Button onPress={() => {
               
                    setRetornoStr('R$ 0.00');
                    setValorAposta('0');

                    navigation.goBack();
                }}>
                    <HeaderIcon name="arrow-back-sharp" size={18} />
                </Button>
                <Title> Jogos - {route.params.screenTitle ?? 'Jogos'} </Title>
                <View style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button style={{backgroundColor: '#333', borderRadius: 5}} onPress={()=>{
                        setImportarModalVisible(!importarModalVisible)
                    }}><Title style={{color: '#fff', fontSize: 14}}> Importar </Title></Button>

                
                </View>

                <ImportarModal 
                aovivo={route.params.date == 'online'} setLoading={(status)=>{
                    setIsLoading(status);
                }} modalVisible={importarModalVisible} setModalVisible={setImportarModalVisible} onRequestClose={()=>{
                    setImportarModalVisible(false);
                }} getBillet={(num)=>{
                    setIsLoading(true)

                    num.map((_apostaItem_) => {
                        handleAposta(_apostaItem_);
                    });
                    setImportarModalVisible(false);
                    setIsLoading(false)
                    handleFinalizar();
                }} />

                
            </ScreenTitle>


            <Row>
                <InputValor placeholder={'Valor'} keyboardType="numeric" value={valorAposta} onChangeText={handleValorApostaChange} />
                <InputValor placeholder={'Valor'} value={retornoStr} editable={false} selectTextOnFocus={false} style={{color:'#555555'}}/>
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
                        <TitleTable>1</TitleTable>
                    </CotacaoBtn>
                    <CotacaoBtn>
                        <TitleTable>X</TitleTable>
                    </CotacaoBtn>
                    <CotacaoBtn>
                    <TitleTable>2</TitleTable>
                    </CotacaoBtn>
                </Td>
            </Th>
  

               {countriesToRender && 
            <FlatList 
                removeClippedSubviews={true}
                initialNumToRender={4}
                debug={false}
                data={countriesToRender.slice(0,currentItemsToShow)}
                renderItem={cbRenderItem}
                contentContainerStyle={{paddingBottom: 400, minHeight:'100%'}}
                ListFooterComponent={()=><RowVerMais>
                {currentItemsToShow < countriesToRender.length && <ButtonVerMais onPress={()=>{ShowNextPage()}}>
                    <VerMaisTxt>Ver mais</VerMaisTxt>
                </ButtonVerMais>}
                </RowVerMais>}
            />
        } 
        {console.log(countriesToRender)}
            {/* <ScrollView contentContainerStyle={{paddingBottom: 400}}>    


            {game.paises.map((p) => {
                return (
                <>
                    <CotacaoPais handleRemoveAposta={handleRemoveAposta} onSelect={handleAposta} key={p.id} pais={p} game={game} />
                    
                </>    
                    )
            })} */}

            

{/* 
            {montarArray().map(item => {

                return (
                    <>
                        <Row>
                            <Td>
                                <TitleTable>{item.title}</TitleTable>
                            </Td>
                        </Row>
                    </>
                )
            })} */}

            
            {/* {campeonatos.map((camp) => {
                
                

                camp.jogos.map((jogo)=><Cotacao handleRemoveAposta={handleRemoveAposta} key={jogo.id} jogo={jogo} game={game} onSelect={handleAposta}/>)
                
            })} 
            </ScrollView>*/}
        </Container>
    )
}

export default CampeonatoWithPaisScreen;