import React, {useState, useEffect, useMemo, memo, useCallback} from 'react';
import {RowTitle, GameArea, SeeMoreBtn, GameTitle, GameDetails, CotacaoArea, CotacaoTxt, CotacaoBtn, Locked, Icon, Image, InlineRow, FoundationIcon} from './styles';
import MaisCotacoes from '../MaisCotacoes';
import { B } from '../../screens/Caixa/styles';
import { useFocusEffect } from '@react-navigation/native';

import { getJogosAoVivoEachSecond } from '../../services/API';

import { useApostaCtx } from '../../hooks/useAposta';
import MaisCotacoesAoVivo from '../MaisCotacoesAoVivo';


function Cotacao (props) {

    const [aoVivoData, setAoVivoData] = useState({});
 
    let _serverData = props.serverData;


    const jogoValido = props.jogo.valido === "1";
    //const [apostaCtx, setApostaCtx] = useApostaCtx();
    //const [state, setState] = useState(false);
    const [showImg, setShowImage] = useState(false);

    const jogo = props.jogo;
    const dateToBR = (date) => {
        
        let dArr = date.split("-");  // ex input "2010-01-18"
        return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0];
        return date;
        let rawDate = new Date(date);
        return rawDate.getDate()+1+'/'+((rawDate.getMonth())+1)+'/'+rawDate.getFullYear();
    }

    

    // console.log('Ajuste Usuário pressed! ', jogo.ajusteJogo);
   
   
    // const ajusteUsuario = props.serverData.ajusteUsuario || 0;
    // console.log(ajusteUsuario);

    const [selected,setSelected] = useState('');
    const [showModal, setShowModal] = useState(false);

    useFocusEffect(()=>{
            let _inGame = props.apostas.find((game) => game.jogo == jogo.id)
            if(_inGame) {
                setSelected(_inGame.cotacao)
            } else {
                setSelected(null);
            }
    })

    useEffect(() => {
        isValidImage();
        let _inGame = props.apostas.find((game) => game.jogo == jogo.id)
        if(_inGame) {
            setSelected(_inGame.cotacao)
        } 
       
    }, [props])

    let ajusteUsuario = _serverData.ajusteUsuario;
        // console.log(ajusteUsuario,'Ajuste usuário');
    let ajusteJogo = jogo.ajusteJogo;
        // console.log(ajusteJogo,'Ajuste Jogo');
    let tetoCotacao = _serverData.tetoCotacao;
        // console.log(tetoCotacao,'Ajuste tetoCotacao');
        // console.log('------------');

    function totalCotacoes() {
        var total = 0;
        try{
            Object.values(jogo.cotacoes).forEach((c) => {
                Object.values(c).forEach((v) => {
                    if((v+(v*(ajusteUsuario)/100)+((v*jogo.ajusteJogo)/100)) > 1)
                        total++;
                });
            });
        } catch (err) {
            console.log("erro ao totalizar cotação !!" + err);
        } finally {
            return total;
        }
    }
        

    function getNormalizedOdd(odd) {
        
        

        const gameFilteredByTeto = Math.min(odd, tetoCotacao );
       
        return (
            Math.min(odd, tetoCotacao ) + 
            ( Math.min(odd, tetoCotacao) * ((parseFloat(ajusteUsuario)+parseFloat(ajusteJogo))/100))
            ).toFixed(2);
        
        
        // return gameFilteredByTeto + (gameFilteredByTeto * ()/100);
        // return  gameFilteredByTeto+ ( (gameFilteredByTeto*(parseFloat(ajusteJogo) + parseFloat(ajusteUsuario))/100) )
    }

    const handleOtherSelection = (selection, time) => {
        setSelected(selection);
        
        props.onSelect({
            title: `${jogo.casa} x ${jogo.fora}`,
            valor: parseFloat(getNormalizedOdd(jogo.cotacoes[time][selection])),
            jogo: jogo.id,
            tempo: time,
            cotacao: selection

        })
        setShowModal(false);
    }

 

    const handleSelect = (selection) => {

        if(selected == selection) {
            setSelected(null)
            handleRemoveAposta();
        } else {
            setSelected(selection);
        }

        // console.log(parseFloat(getNormalizedOdd(jogo.cotacoes[90][selection]))),'odd')
        
        props.onSelect({
            title: `${jogo.casa} x ${jogo.fora}`,
            valor: parseFloat(getNormalizedOdd(jogo.cotacoes[90][selection])),
            jogo: jogo.id,
            tempo: 90,
            cotacao: selection

        })
        
        
    }

    const handleRemoveAposta = () => {
        return props.handleRemoveAposta(jogo.id);
    }

    const handleVerMais = () => {
        setShowModal(true);
    }

    // const calculateCotacoes = useMemo(() => {
    //     let counter = 0;
    //     if (jogo.cotacoes[90] != undefined) {
    //         counter += Object.keys(jogo.cotacoes[90]).length
    //     }
    //     if (jogo.cotacoes.st != undefined) {
    //         counter += Object.keys(jogo.cotacoes.st).length
    //     }
    //     if (jogo.cotacoes.pt != undefined) {
    //         counter += Object.keys(jogo.cotacoes.pt).length
    //     }
    //     if (jogo.cotacoes[10] != undefined) {
    //         counter += Object.keys(jogo.cotacoes[10]).length
    //     }
    //     return counter;
    // }, [jogo.cotacoes])

    

    const isValidImage = async () =>  {
        let show = true;
        await Image.getSize(jogo.img_casa, (width, height) => {
            if (width < 2 || height < 2) {
                show = false;
            }
        }, ()=>{
            show = false;
        });

        await Image.getSize(jogo.img_fora, (width, height) => {
            if (width < 2 || height < 2) {
                show = false;
            }
        }, ()=>{
            show = false;
        });
        if (show) {
            setShowImage(true);
        }
    }


    const  mountNowTime = (timer) => {
        let passed_seconds = 0;
        let tu = parseInt(timer.TU);
        let tt = parseInt(timer.TT);
        let tm = parseInt(timer.TM);
        let ts = parseInt(timer.TS);
 
        let nowEpoch = (new Date().getTime()) / 1000.0;
 
        if (tt == 1) {
            passed_seconds = (nowEpoch - tu) + ((tm * 60) + ts);
        } else {
            passed_seconds = ((tm * 60) + ts);
        }
        
        let min = Math.trunc(passed_seconds / 60);
        let seg = Math.trunc(passed_seconds - (min * 60));
        return min.toString().padStart(2, '0') + ':' + seg.toString().padStart(2, '0');
    }

    return(
        <RowTitle key={jogo.id}>

            { 1 ==1 && props.isLive && 
                <MaisCotacoesAoVivo serverData={_serverData} diccGrupos={props.dicGrupos} diccCotacoes={props.dicCotacoes} show={showModal} jogo={jogo}  handlePress={handleOtherSelection} handleClose={()=>{setShowModal(false)}} />
            }

            { jogoValido && !props.isLive && 
                <MaisCotacoes serverData={_serverData} diccGrupos={props.dicGrupos} diccCotacoes={props.dicCotacoes} show={showModal} jogo={jogo}  handlePress={handleOtherSelection} handleClose={()=>{setShowModal(false)}} />
            }

      
            <GameArea>
                {jogo.img_casa != '' && jogo.img_fora !='' && showImg &&

                <InlineRow> 
                    <Image width={20} height={20} source={{uri: jogo.img_casa}} />
                    <GameTitle> X </GameTitle>
                    <Image width={20} height={20} source={{uri: jogo.img_fora}} />
                </InlineRow>
                }
                
                
                <GameTitle>{jogo.casa} X {jogo.fora}</GameTitle>
                
                <GameDetails>{dateToBR(jogo.data)} - {jogo.hora}</GameDetails>
                {
                    jogo.bloqueado != 1 && <SeeMoreBtn onPress={handleVerMais}>
                    <GameDetails>Ver mais <B>+ {totalCotacoes()}</B></GameDetails>
                    
                </SeeMoreBtn>
                }
                
            </GameArea>
            <CotacaoArea>
                {
                    getNormalizedOdd(jogo.cotacoes[90].m_ftr_1.toFixed(2)) <= 1 || jogo.cotacoes[90].m_ftr_1 <= 1 || !jogoValido || jogo.bloqueado == 1 ? 
                    <Locked>
                        { (jogo.bloqueado == 1 || (jogo.cotacoes[90].m_ftr_1 <= 1 && jogoValido))  && <Icon name="ios-lock-closed" size={12}/>}

                        {!jogoValido  && jogo.bloqueado != 1 && <FoundationIcon name="prohibited" size={12} /> }
                        
                        
                    </Locked>
                    :
                    <CotacaoBtn selected={selected == 'm_ftr_1'} onPress={() =>{handleSelect('m_ftr_1')}}>
                        <CotacaoTxt>{
                        getNormalizedOdd(jogo.cotacoes[90].m_ftr_1.toFixed(2) ?? '0')}</CotacaoTxt>
                    </CotacaoBtn>
                }
               

               {
                    getNormalizedOdd(jogo.cotacoes[90].m_ftr_draw.toFixed(2)) <= 1 || jogo.cotacoes[90].m_ftr_draw <= 1 || !jogoValido || jogo.bloqueado==1 ? 
                    <Locked>
                        { (jogo.bloqueado == 1 || (jogo.cotacoes[90].m_ftr_draw <= 1 && jogoValido)) && <Icon name="ios-lock-closed" size={12}/>}

                        {!jogoValido && jogo.bloqueado != 1 && <FoundationIcon name="prohibited" size={12} /> }
                    </Locked>
                    :
                    <CotacaoBtn selected={selected == 'm_ftr_draw'} onPress={() =>{handleSelect('m_ftr_draw')}}>
                        <CotacaoTxt>{getNormalizedOdd(jogo.cotacoes[90].m_ftr_draw.toFixed(2) ?? '0')}</CotacaoTxt>
                    </CotacaoBtn>
                }

                {
                    getNormalizedOdd(jogo.cotacoes[90].m_ftr_2.toFixed(2)) <= 1 || jogo.cotacoes[90].m_ftr_2 <= 1 || !jogoValido || jogo.bloqueado == 1 ? 
                    <Locked>
                        { (jogo.bloqueado == 1 || (jogo.cotacoes[90].m_ftr_2 <= 1 && jogoValido)) && <Icon name="ios-lock-closed" size={12}/>}

                        {!jogoValido && jogo.bloqueado != 1 && <FoundationIcon name="prohibited" size={12} /> }
                    </Locked>
                    :
                    <CotacaoBtn selected={selected == 'm_ftr_2'} onPress={() =>{handleSelect('m_ftr_2')}}>
                        <CotacaoTxt>{getNormalizedOdd(jogo.cotacoes[90].m_ftr_2.toFixed(2) ?? '0')}</CotacaoTxt>
                    </CotacaoBtn>
                }

            </CotacaoArea>
        </RowTitle>
    )
}



export default memo(Cotacao)