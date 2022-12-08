import React, { useState, useEffect, useCallback, useMemo } from "react"
import {Container, Row,ScrollView, InputValor, TitleTable,ButtonImprimir, Title, ScreenTitle, Button, HeaderIcon, Th, Td, CotacaoBtn, ButtonFinalizar, FinalizarTxt } from './styles'

import { useNavigation } from "@react-navigation/native";

import { FlatList } from "react-native";

import LoadingModal from "../../components/LoadingModal";

import { BackHandler, Alert } from 'react-native';

import Cotacao from "../../components/Cotacao";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { useApostaCtx } from "../../hooks/useAposta";
import CotacaoPais from "../../components/CotacaoPais";

import { getGamesAoVivo } from "../../services/API";


const CampeonatoAoVivoScreen = ({route}) => {

    const [apostasCtx, setApostasCtx] = useApostaCtx();
    const [serverData, setServerData] = useState(route.params.serverData);
    const [allGames, setAllGames] = useState([]);
    

   
    const navigation = useNavigation();

    const [self_apostas, setApostas] = useState([]);

    const [retornoStr, setRetornoStr] = useState('R$ 0.00');

    const [isLoading, setIsLoading] = useState(false);
    

    const [valorAposta, setValorAposta] = useState(route.params.serverData.apostaMin.toString());
    //console.log(campeonatos[0].title);
    

    const [games, setGames] = useState({});

    
    
    useEffect(() => {
        const backAction = () => {
            setRetornoStr('0.00');
            navigation.goBack();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, []);


    useEffect(() => {
        const getGamesData = async () => {
            setIsLoading(true);

            let _games = await getGamesAoVivo();
            setGames(_games);
            console.log('new games loaded');
            if (parseFloat(valorAposta) < parseFloat(route.params.serverData.apostaMin)) {
                setValorAposta(route.params.serverData.apostaMin.toString());
                
            }
            setIsLoading(false);
        }
        getGamesData();
       
    },[])

    useEffect(()=>{
        //console.log('apostas', apostas);
        calculateRetorno();
    }, [valorAposta, self_apostas])

    console.log(route.params.filterCamp,'FC');


    const handleAposta = async (aposta) => {
        // let myApostas = apostas.filter((ap)=>ap.jogo != aposta.jogo);
        // let _myApostas = apostas.filter((ap)=> JSON.stringify(ap) == JSON.stringify(aposta));
        // if (_myApostas.length < 1) {
        //     myApostas.push(aposta);
        // }
        //console.log('apostas', self_apostas)
        const _apostas = self_apostas.filter((ap) => ap.jogo !== aposta.jogo);
        _apostas.push(aposta);
        setApostas(_apostas);
        //console.log('novaaposta', self_apostas);
        calculateRetorno();

        //setApostasCtx(myApostas);
        return;
    }

    const handleRemoveAposta = async (ap) => {
        let myApostas = self_apostas.filter((aposta) => aposta.jogo != ap);
        await setApostas(myApostas);
        //setApostasCtx(myApostas);
        return;
    }

    const handleFinalizar = async () => {

        let minJogos = serverData.minJogos;

        let id_apostas = [];
        self_apostas.map((ap) => {
            id_apostas.push(ap.jogo);
        })

        let myApostasCtx = apostasCtx.filter((ap) => {
            if (id_apostas.indexOf(ap.jogo) == -1) {
                return true
            } else {
                return false;
            }
        })

        await setApostasCtx([...myApostasCtx,...self_apostas]);

        setApostas([]);

        //Regra de negócio numero mínimo de jogos.
        if (apostasCtx.length < minJogos ) {
            alert('Mínimo de jogos: '+minJogos)
            return; 
        }

        // Regra de negócio - Cotação mínima:
        let cotValor = 0
        apostasCtx.map((v)=>{
            cotValor += v.cotacao;
        })
       

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
           dicCotacoes:games.cotacoes 
        };

        navigation.navigate('Finalizar', finalJson);
        
    }




    const calculateRetorno = () => {
        console.log('apostas', self_apostas);
        let meuValor = 1;

        const todasApostas = [...apostasCtx, ...self_apostas]


        todasApostas.map((v)=>{
            meuValor *= v.valor;
        })

        console.log('Retorno calculado: ', meuValor)
        if (valorAposta >= 0) {
            setRetornoStr(`${(valorAposta*meuValor).toFixed(2)}`);
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

   const getPaisesToRender = () => {  

        if (!route.params.filterCamp || route.params.filterCamp == undefined || route.params.filterCamp == null ) {
          return games.paises
        } else {
            return games.paises.filter((i) => {
                let finded = false;
                i.campeonatos.map((c)=>{
                    if (c.id == route.params.filterCamp ) {
                        finded = true
                    }
                    return;
                })
                return finded;
            })
        }
      }


    const renderFlatListItem = ({item}) =>
    <CotacaoPais dicCotacoes={games.cotacoes} dicGrupos={games.grupos} game={item} handleRemoveAposta={handleRemoveAposta} key={`item-pais-${item.id}`} onSelect={handleAposta}  />
    const memoizedValue = useMemo(() => renderFlatListItem, [games, apostasCtx]);

    const cbRenderItem = useCallback(renderFlatListItem, [games, apostasCtx, self_apostas])
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
                <Title> {route.params.screenTitle ?? 'Jogos'} </Title>
            </ScreenTitle>


            <Row>
                <InputValor placeholder={'Valor'} value={valorAposta} onChangeText={handleValorApostaChange} keyboardType="numeric" />
                <InputValor placeholder={'Valor'} value={retornoStr} disabled/>
                <ButtonImprimir onPress={()=>{}}>
                    <HeaderIcon name="print" size={14} />
                </ButtonImprimir>
                <ButtonFinalizar onPress={handleFinalizar}>
                    <FinalizarTxt>Finalizar ({apostasCtx.length+self_apostas.length})</FinalizarTxt>
                </ButtonFinalizar>
            </Row>

  
            <Th>
                <Td>
                    <TitleTable>Casa x Visitante!</TitleTable>
                </Td>
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
  

            <FlatList 
                removeClippedSubviews={true}
                initialNumToRender={4}
                debug={false}
                data={() => getPaisesToRender()}
                renderItem={renderFlatListItem}
                contentContainerStyle={{paddingBottom: 400, minHeight: '100%'}}
            />
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

export default CampeonatoAoVivoScreen;