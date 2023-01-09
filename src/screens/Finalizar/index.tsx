import React, {useState, useEffect, useCallback, useContext} from 'react';
import { ScreenTitle,Button,HeaderIcon,Title } from '../CampeonatoScreen/styles';
import { Container, Text, BilheteArea, Bilhete, BHeader, Btitle, BIcon, BButton, BBody, B, ApostaArea, View, TextInput, ActionButton, ApostaButtonArea, TextCenter, ModalDiv } from './styles';

import { Alert } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { FinalizarBilheteAoVivo, getClientes, getDados, getMyServerInfo, updateCotacaoAoVivo, updateCotacaoPreJogo } from '../../services/API';

import { FinalizarBilhete, getJogosAoVivoEachSecond } from '../../services/API';

import AddClientModal from '../../components/AddClientModal';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useApostaCtx } from '../../hooks/useAposta';
import ProcessingModal from '../../components/ProcessingModal';
import UserContext from '../../contexts/UserContext';


const Finalizar = ({route}) => {

    const UserCtx = React.useContext(UserContext);

    const [_jogos, setJogos] = useApostaCtx();

    const jogos = () => {
        return _jogos;
    }


 
    const [dicCotacoes, setDicCotacoes] = useState([]);

    //const [jogos, setJogos] = useState([]);
    const [clients, setClients] = useState([]);
    const [clientSelected, setClientSelected] = useState(0);
    const [valorAposta, setValorAposta] = useState(route.params.valorApostado);
    const [retorno, setRetorno] = useState(route.params.retornoCalculado);
    const [cotacao, setCotacao] = useState(route.params.cotacao_valor);
    const [showModal, setShowModal] = useState(false);
    const [processingShow, setProcessingShow ] = useState(false);
    const [processingText, setProcessingText] = useState('Analisando Dados...');
    const [updatedCotationGames, setUpdatedCotationGames] = useState('');
    const [serverData, setServerData] = useState({});
    const [isFinalizarBtnDisabled, setIsFinalizarBtnDisabled] = useState(false);
    const [pagamento, setPagamento] = useState('credito');

    useEffect(()=>{
        const myClients = async () => {
            let result = await getClientes();
            setClients(result.clientes);
            let _serverData = await getMyServerInfo();
            setServerData(_serverData);
            console.log('SVDATA', serverData);
          }
          const getDic = async () => {
            let raw_cot = await AsyncStorage.getItem('@diccotacoes')
            let cot = JSON.parse(raw_cot);
            console.log('Dic Cotações Solicitado', cot);
            setDicCotacoes(cot);

        }
        getDic();
        
          myClients();            
    },[])


    useEffect(()=>{
        calculateRetorno();
    },[valorAposta]);

    useEffect(()=>{
        calculateCotacao();
        calculateRetorno();
    },[jogos])

    const limparEscolhas = async () => {
        setProcessingShow(true);
        calculateRetorno();
        setJogos([]);
        calculateRetorno();
        setUpdatedCotationGames('');
        setProcessingShow(false);
        // setJogos([]);
        // await AsyncStorage.removeItem('@bilhete');
    }

    const handleFinalizarButton = async () => {

        setIsFinalizarBtnDisabled(true);

        let myJogos = jogos();

        
        if (valorAposta < 1) {
            Alert.alert('Erro','O valor da aposta deve ser maior que 1.');
            setIsFinalizarBtnDisabled(false);
            return;
        }

        if (jogos().lenght < 1) {
            Alert.alert('Erro', 'Selecione ao menos um jogo para o bilhete.');
            setIsFinalizarBtnDisabled(false);
        }

        if (clientSelected == 0) {
            Alert.alert('Erro', 'Selecione um cliente.')
            setIsFinalizarBtnDisabled(false);
            return; 
        }

        let defaultJogo = [];

        jogos().map((j)=>{

            let _j = {
                jogo: j.jogo,
                tempo: j.tempo,
                cotacao: j.cotacao,
                valor: j.valor
            }
            defaultJogo.push(_j)
            
        })

        const _req = {
            valor: valorAposta,
            clienteId: clientSelected,
            jogos: defaultJogo,
            pagamento: pagamento
        }
        
        let isLive = route.params.isLive ?? false;
        console.log('isLive',isLive);
        let resultado = undefined;
        // let data = await getDados();
        // console.log(data);
        // return; 

        let dadosUser = await getDados();

        let canMakeGames = [1,2,4,10];

        if (!canMakeGames.includes(dadosUser.user.tipo)) {
            console.log(dadosUser.user.tipo,'dadosUser');
            Alert.alert('Erro', 'O Tipo do seu usuário não pode fazer apostas.');
            setIsFinalizarBtnDisabled(false);
            return false;
        }


        let regrasAplicadas = regrasDeNegocio();

        if (!regrasAplicadas) {
            setIsFinalizarBtnDisabled(false);
            return false;
        }

        if (isLive == false) {
            
            setProcessingText('Enviando...')
            setProcessingShow(true);
            resultado = await FinalizarBilhete(_req);
            setProcessingText('Analisando Dados...')
            setProcessingShow(false);
            setIsFinalizarBtnDisabled(false);
        } else {

            setProcessingShow(true);

            setTimeout(()=>{
                setProcessingText('Montando Aposta...')
            }, 2000)
            setTimeout(()=>{
                setProcessingText('Validando...')
            }, 7000)
            setTimeout(()=>{
                setProcessingText('Processando...')
            }, 12000)
            setTimeout(()=>{
                setProcessingText('Aguarde...')
            }, 14500)

            setTimeout(async ()=>{
                resultado = await FinalizarBilheteAoVivo(_req);
                setProcessingShow(false);
                if (resultado.result == 1) {
                    let dadosUser = await getDados();
                    if(dadosUser) {
                        UserCtx.creditos = dadosUser.user.creditos;
                        UserCtx.bonus = dadosUser.user.bonus;
                        UserCtx.bonuslib = dadosUser.user.bonuslig;
                        UserCtx.nome = dadosUser.user.nome;
                        UserCtx.img = dadosUser.user.img;
                        UserCtx.email = dadosUser.user.email;
                    }
                    setJogos([]);
                    // navigation.dispatch(
                    //     CommonActions.reset({
                    //         index: 1,
                    //         routes: [
                    //             { name: 'Bilhete', 
                    //               params: resultado
                    //             }
                    //         ]
                    //     })
                    // );
                    setIsFinalizarBtnDisabled(false);
                    navigation.navigate('Bilhete', resultado)
                } else {
                    setIsFinalizarBtnDisabled(false);
                    Alert.alert('erro',resultado.message)
                }

            }, 15000
            
            
            )
            setIsFinalizarBtnDisabled(false);
            return;
            //resultado = await FinalizarBilheteAoVivo(_req);
        }
    
        

 

            if (resultado.result == 1) {
                let dadosUser = await getDados();
                if(dadosUser) {
                    UserCtx.creditos = dadosUser.user.creditos;
                    UserCtx.nome = dadosUser.user.nome;
                    UserCtx.img = dadosUser.user.img;
                    UserCtx.email = dadosUser.user.email;
                }
              
                setJogos([]);
                navigation.navigate('Bilhete', resultado)
            } else {
                Alert.alert('erro',resultado.message)
            }
        console.log(resultado);


    }


    const navigation = useNavigation();

    function regrasDeNegocio() { 
        
        let data = serverData;

        let myJogos = jogos();
        console.log('myjogos', myJogos.length);
  
        


        if (myJogos.length < 1) {
            Alert.alert('Erro', 'Selecione ao menos um jogo para o bilhete.');
            return false;
        }
        if (myJogos.length <= 4) {
            
            if (myJogos.length == 1) {
                console.log('É apenas um jogo', data.cotacaomin1);
                if (valorAposta > data.limite1) {
                    Alert.alert('Erro','O valor apostado é muito alto para um jogo. Coloque mais jogos ou reduza o valor da aposta');
                    return false;
                }

                if (cotacao < data.cotacaomin1 ) {
                    Alert.alert('Erro',"A cotação mínima para um jogo é de "+data.cotacaomin1.toString() + ". Coloque mais um jogo ou escolha uma cotação mais alta")
                    return false;
                }
            }

            // 2 jogos

            if (myJogos.length == 2) {
                if (valorAposta > data.limite2) {
                    Alert.alert('Erro','O valor apostado é muito alto para dois jogos. Coloque mais jogos ou reduza o valor da aposta');
                    return false;
                }

                if (cotacao < data.cotacaomin2 ) {
                    Alert.alert('Erro',"A cotação mínima para dois jogos é de "+data.cotacaomin2.toString() + ". Coloque mais um jogo ou escolha uma cotação mais alta")
                    return false;
                }
            }

            // 3 jogos
            if (myJogos.length == 3) {
                if (valorAposta > data.limite3) {
                    Alert.alert('Erro','O valor apostado é muito alto para três jogos. Coloque mais jogos ou reduza o valor da aposta');
                    return false;
                }

                if (cotacao < data.cotacaomin3 ) {
                    Alert.alert('Erro',"A cotação mínima para três jogos é de "+data.cotacaomin3.toString() + ". Coloque mais um jogo ou escolha uma cotação mais alta")
                    return false;
                }
            }

            // 4 jogos
            if (myJogos.length == 4) {
                if (valorAposta > data.limite4) {
                    Alert.alert('erro','O valor apostado é muito alto para quatro jogos. Coloque mais jogos ou reduza o valor da aposta');
                    return false;
                }

                if (cotacao < data.cotacaomin4 ) {
                    Alert.alert('erro',"A cotação mínima para quatro jogos é de "+data.cotacaomin4.toString() + ". Coloque mais um jogo ou escolha uma cotação mais alta")
                    return false;
                }
            }
            

        }
        return true;

    }

    const calculateCotacao = () => {
        let _cot = 1;
        jogos().map((j) => {
            _cot *= j.valor;
        })
        if (_cot == 1) {
            _cot = 0;
        }

        if (_cot > parseFloat(serverData.cotacaoMax)) {
            _cot = parseFloat(serverData.cotacaoMax);
        }
        
        setCotacao(_cot);
    }

    const calculateRetorno = () => {
        
        if (cotacao == 0) {
            setRetorno('0.00');
            return; 
        }
        
        let meuValor = 1;

        meuValor = cotacao;
        // jogos().map((v)=>{
        //     meuValor *= v.valor;
        // })

        if (valorAposta) {
            let retorno = 0;
            if (valorAposta*meuValor > serverData.retornoMaximo) {
                retorno = serverData.retornoMaximo;
            } else {
                retorno = valorAposta*meuValor;
            }
            
            setRetorno(`${retorno.toFixed(2)}`);
        } else {
            setRetorno('0.00');
        }
        
    }

    const translate = (k) => {


        let dado = dicCotacoes.find((i)=>{
            return i.campo == k
        })
        if (dado) {
            return dado.title;
        } else {
            return '[Erro] - Tradução cotação';
        }       

    }


    const delJogo = async (jogo) => {
        calculateRetorno();
        const _jogos = jogos().filter((ap)=>ap.jogo != jogo.jogo);
        setJogos(_jogos);
        calculateRetorno();
        return;         
    }

    const handleChangeAposta = (a) => {
        setValorAposta(a);
    }

    const handleCbClient = (r,p) => {
        setShowModal(false);
        let myClients = clients;
        setClients(r.clientes);
        setClientSelected(r.id);
    }

    const atualizarCotacoesOnline = async () => {
        setProcessingShow(true);
        if (route.params.isLive) {

           
                
                // console.log('atualizando cotações');
                // let myJogos = jogos();

                // myJogos[0].valor = 10;
                // console.log(myJogos[0]);

            // console.log(jogos());


            jogos().map(async (jogo) => {
                console.log('oldvalue:', jogo.valor)

                let res = await updateCotacaoAoVivo(jogo);

                console.log('aovivo',res);
                if (res) {
                    jogo.valor = parseFloat(parseFloat(res.valor).toFixed(2));
                    setUpdatedCotationGames(''+Date.now());
                }
                // if (res.inplayEventResultObject.price.odds[jogo.tempo][jogo.cotacao]) {
                //     let new_valor = res.inplayEventResultObject.price.odds[jogo.tempo][jogo.cotacao];
                //     jogo.valor = new_valor;
                // }
                // console.log('newvalue:', jogo.valor)
                //setUpdatedCotationGames('  ');
                //console.log(jogos());
                
            })

                
            // let refimports = [];

            //     jogos().map(async (jogo) => {
            //     console.log('oldvalue:', jogo.valor)

            //     let res = await getJogosAoVivoEachSecond(jogo.refimport);
            //     if (res.inplayEventResultObject.price.odds[jogo.tempo][jogo.cotacao]) {
            //         let new_valor = res.inplayEventResultObject.price.odds[jogo.tempo][jogo.cotacao];
            //         jogo.valor = new_valor;
            //     }
            //     console.log('newvalue:', jogo.valor)

                
            // })
        } else {

        
            // Pre Jogo
            jogos().map(async (jogo) => {
                console.log('oldvalue:', jogo.valor)

                let res = await updateCotacaoPreJogo(jogo);

                console.log('prejogo',res);
                if (res.valor) {
                    jogo.valor = parseFloat(parseFloat(res.valor).toFixed(2));
                    setUpdatedCotationGames(' '+Date.now());
                }
                // if (res.inplayEventResultObject.price.odds[jogo.tempo][jogo.cotacao]) {
                //     let new_valor = res.inplayEventResultObject.price.odds[jogo.tempo][jogo.cotacao];
                //     jogo.valor = new_valor;
                // }
                // console.log('newvalue:', jogo.valor)
                //setUpdatedCotationGames('  ');
                //console.log(jogos());
                
            })
        }
        setUpdatedCotationGames(''+Date.now());
        setTimeout(()=>setProcessingShow(false), 500);

}


    return (
        <Container>

            <ProcessingModal show={processingShow} text={processingText}/>

            <AddClientModal onlyInsert={true} requestClose={()=>{setShowModal(false)}} show={showModal} cbClient={handleCbClient} />

            <ScreenTitle>
                <Button onPress={() => {
                    navigation.goBack();
                }}>
                    <HeaderIcon name="arrow-back-sharp" size={18} />
                </Button>
                <Title> Seu Bilhete - Confirmar </Title>
            </ScreenTitle>
            

            <BilheteArea>

                
                <Button onPress={atualizarCotacoesOnline}>
                    <Btitle> Atualizar Cotações {" "} 
                    <BIcon name="retweet" size={18} />
                
                    </Btitle>
                    
                    
                </Button>
                
                
                
               
                {jogos().map((jogo) =>
                
                <Bilhete key={jogo.jogo}>
                    <BHeader>
                        <Btitle>
                            {jogo.title}
                        </Btitle>
                        <BButton onPress={()=>{delJogo(jogo)}}>
                            <BIcon name="delete" size={18} />
                        </BButton>
                    </BHeader>
                    <BBody>          
                        <Text>
                            <B>Resultado:</B> {translate(jogo.cotacao)}
                        </Text>
                        <Text>
                            <B>Cotação:</B>  {(parseFloat(jogo.valor)).toFixed(2)} 
                            
                        </Text>
                        <Text style={{color: 'transparent', width: 0, height: 0}}>
                            {updatedCotationGames}
                        </Text>
                       
                    </BBody>
                </Bilhete>
                )}
                
            </BilheteArea>

            <ApostaArea>
                <View bg="#333">
                    <Text bg="#ffffff">Cotação: <B>{cotacao.toFixed(2)}</B></Text>
                </View>
                <View bg="#999">
                    <Text>Possível Retorno: <B>{
                    
                    retorno > serverData.retornoMaximo ? serverData.retornoMaximo  : retorno

                    }</B> </Text>
                </View>
            </ApostaArea>
            <ApostaArea style={{padding: 0, paddingRight: 15, backgroundColor: '#222'}}>
                <View bg={"#222"}>
                    <TextInput style={{backgroundColor: "#ccc", margin: 0, width: 100}} keyboardType="numeric" placeholder={"valor"} value={valorAposta} onChangeText={handleChangeAposta}/>
                </View>
                <Picker
                    
                    mode="dialog"
                    accessibilityLabel="Client Picker"
                    prompt="Selecione um cliente"
                    dropdownIconColor="grey"
                    style={{color: '#333', flex:2, height: 40, backgroundColor: '#ccc'}}
                    selectedValue={clientSelected}
                    onValueChange={(itemValue, itemIndex) => setClientSelected(itemValue)}
                    >
                    <Picker.Item 
                    label="Selecione o Cliente" 
                    value="0"
                    style={{backgroundColor: 'cyan', padding: 0, margin: 0, height: 10}}
                    />
                    {clients && clients.map((c) =><Picker.Item 
                        key={c.id}
                        label={c.nome} 
                        value={c.id}
                        style={{backgroundColor: 'cyan'}}
                    /> )
                    
                    }
            </Picker>

            </ApostaArea>
            <ApostaArea style={{padding: 15, backgroundColor: '#222'}}>
            <Picker
                    
                    mode="dialog"
                    accessibilityLabel="Payment Picker"
                    dropdownIconColor="grey"
                    style={{color: '#333', flex:2, height: 40, backgroundColor: '#ccc'}}
                    selectedValue={pagamento}
                    onValueChange={(itemValue, itemIndex) => {
                        setPagamento(itemValue)
                    }}
                    >
                    <Picker.Item 
                        label={'Pagamento: Crédito'} 
                        value={'credito'}
                        style={{backgroundColor: 'cyan'}}
                    />
                    <Picker.Item 
                        label={'Pagamento: Bônus'} 
                        value={'bonus'}
                        style={{backgroundColor: 'cyan'}}
                    />
               
            </Picker>
            </ApostaArea>
            <ApostaButtonArea style={{backgroundColor: '#444'}}>
                <ActionButton bg={'red'} onPress={limparEscolhas}>
                    <TextCenter>Limpar Escolhas</TextCenter>
                </ActionButton>
                <ActionButton bg={'teal'} onPress={()=>{setShowModal(true)}}>
                    <TextCenter>Adicionar Cliente</TextCenter>
                </ActionButton>
                <ActionButton bg={'green'} onPress={handleFinalizarButton} disabled={isFinalizarBtnDisabled}>
                    <TextCenter>Finalizar Aposta</TextCenter>
                </ActionButton>
            </ApostaButtonArea>

        </Container>
    )
}

export default Finalizar;