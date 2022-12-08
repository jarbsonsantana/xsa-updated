import React, {useState, useEffect, useMemo, memo, useCallback} from 'react';
import {RowTitle, GameArea, SeeMoreBtn, GameTitle, GameDetails, CotacaoArea, CotacaoTxt, CotacaoBtn, Locked, Icon, Image, InlineRow, FoundationIcon} from './styles';
import MaisCotacoes from '../MaisCotacoes';
import { B } from '../../screens/Caixa/styles';
import { useFocusEffect } from '@react-navigation/native';

import { getJogosAoVivoEachSecond } from '../../services/API';

import { useApostaCtx } from '../../hooks/useAposta';
import MaisCotacoesAoVivo from '../MaisCotacoesAoVivo';



function CotacaoAoVivo (props) {

    const jogoValido = props.jogo.valido == "1";
    //const [apostaCtx, setApostaCtx] = useApostaCtx();
    //const [state, setState] = useState(false);
    const [showImg, setShowImage] = useState(false);

    const jogo = props.jogo;

    const dateToBR = (date) => {
        let dArr = date.split("-");  // ex input "2010-01-18"
        return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0];
    }

    const [selected,setSelected] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [hasTimer, setHasTimer] = useState(false);

    useFocusEffect(()=>{
            let _inGame = props.apostas.find((game) => game.jogo == jogo.id)
            if(_inGame) {
                setSelected(_inGame.cotacao)
            } else {
                setSelected(null);
            }
    })

    useEffect(() => {

        async function firstUpdateOnComponentMountAoVivo() {
            const ___result = await getJogosAoVivoEachSecond(jogo.refimport);
            setAoVivo(___result);
        }
        firstUpdateOnComponentMountAoVivo();

        isValidImage();
        let _inGame = props.apostas.find((game) => game.jogo == jogo.id)
        if(_inGame) {
            setSelected(_inGame.cotacao)
        } 
       
    }, [props])

    const [_aovivo, setAoVivo] = useState({});

    let myTimer

    useFocusEffect(()=>{

        async function updateAoVivo() {
            const ___result = await getJogosAoVivoEachSecond(jogo.refimport);
            setAoVivo(___result);
        }

       

            
            myTimer = setInterval(updateAoVivo, 10000);
            setHasTimer(true)
   
        return () => {
            setHasTimer(false) 
            clearInterval(myTimer)};

    })



    const handleOtherSelection = (selection, time) => {
        setSelected(selection);
        
        props.onSelect({
            title: `${jogo.casa} x ${jogo.fora}`,
            valor: checkTeto(_aovivo.inplayEventResultObject.price.odds[time][selection]),
            jogo: jogo.id,
            tempo: time,
            cotacao: selection,
            refimport: jogo.refimport

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

        
        props.onSelect({
            title: `${jogo.casa} x ${jogo.fora}`,
            valor: checkTeto(_aovivo.inplayEventResultObject.price.odds[90][selection]),
            jogo: jogo.id,
            tempo: 90,
            cotacao: selection,
            refimport: jogo.refimport

        })
        
        
    }

    const handleRemoveAposta = () => {
        return props.handleRemoveAposta(jogo.id);
    }

    const handleVerMais = () => {
        setShowModal(true);
    }

    

    

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

    const getCot = () =>  {
        
        
        if (_aovivo == null || _aovivo.inplayEventResultObject == null)
        { return jogo.cotacoes }
        else {
            return _aovivo.inplayEventResultObject.price.odds
        }
        return jogo.cotacoes
    }

    const getStats = () => {
        if (_aovivo == null || !_aovivo.inplayEventResultObject || !_aovivo.inplayEventResultObject.result || !_aovivo.inplayEventResultObject.result.stats )
        { 
            return null 
        } else {
            return _aovivo.inplayEventResultObject.result.stats
        }
    }
    let ajusteUsuarioAoVivo = props.serverData.ajusteUsuarioAoVivo ?? 0;

    let ajusteUsuario = props.serverData.ajusteUsuarioAoVivo ?? 0;
         console.log(ajusteUsuarioAoVivo,'Ajuste usuário ao vivo');
        let ajusteJogo = jogo.ajusteJogo;
        // console.log(ajusteJogo,'Ajuste Jogo');
        let tetoCotacao = props.serverData.tetoCotacao;
        // console.log(tetoCotacao,'Ajuste tetoCotacao');
        // console.log('------------');
        console.log(ajusteJogo, 'ajusteJogo');
    function getNormalizedOddOld(odd) {
        return odd+(odd*(parseFloat(ajusteUsuarioAoVivo)+parseFloat(ajusteJogo))/100).toFixed(2);
        return (odd+(odd * (parseFloat(ajusteUsuarioAoVivo)+parseFloat(ajusteJogo))/-100)).toFixed(2);

    }

    function getNormalizedOdd(odd) {
        

        return (
            Math.min(odd, tetoCotacao ) + 
            ( Math.min(odd, tetoCotacao) * ((parseFloat(ajusteUsuario)+parseFloat(ajusteJogo))/100))
            ).toFixed(2);
        
        
     }

    function getGrupo(IdGrupo, Cotacao) {
        let cotacoes = jogo.cotacoes.filter(c => c.grupo == IdGrupo);
        let cotacaoAtiva = false;
        if(cotacoes.length > 0){
            for (var [key, value] of Object.entries(Cotacao)) {
                cotacaoAtiva = cotacoes.some(function(ct,index) {
                    if (ct.campo == key){
                        return true;
                    }
                });
                if (cotacaoAtiva) break;
            }
        }
        return cotacaoAtiva;
    }         

    function checkTeto(odd) {
        let tetoCotacao = props.serverData.tetoCotacao;
        let cotacao = parseFloat(getNormalizedOdd(odd));
        const gameFilteredByTeto = Math.min(cotacao, parseFloat(tetoCotacao) );
      
        return gameFilteredByTeto;
    }

    return(
        <RowTitle key={jogo.id}>

            { 1 == 1 
            && jogo.bloqueado != 1
            && jogoValido 
            && props.isLive 
            && getStats() != null 
            
            &&
                <MaisCotacoesAoVivo serverData={props.serverData} diccGrupos={props.dicGrupos} stats={getStats()} diccCotacoes={props.dicCotacoes} show={showModal} cotacoes={getCot()} jogo={jogo}  handlePress={handleOtherSelection} handleClose={()=>{setShowModal(false)}} />
            }

          

      
            <GameArea>
                {jogo.img_casa != '' && jogo.img_fora !='' && showImg &&

                <InlineRow> 
                    <Image width={20} height={20} source={{uri: jogo.img_casa}} />
                    <GameTitle> X </GameTitle>
                    <Image width={20} height={20} source={{uri: jogo.img_fora}} />
                </InlineRow>
                }
                
                
                <GameTitle>{jogo.casa} X {jogo.fora} - </GameTitle>
                
                <GameDetails>{dateToBR(jogo.data)} - {jogo.hora}</GameDetails>
                {_aovivo != null && _aovivo.inplayEventResultObject !== undefined && _aovivo.inplayEventResultObject !== null && _aovivo !== null &&
                    <GameDetails>{mountNowTime(_aovivo.inplayEventResultObject.event)} | {_aovivo.inplayEventResultObject.event.SS} | { _aovivo.inplayEventResultObject.event.TXT }</GameDetails>
                }
                
                {
                    jogo.bloqueado != 1 &&
                    1==1 && <SeeMoreBtn onPress={handleVerMais}>
                    <GameDetails>Ver mais <B> </B></GameDetails>
                    
                </SeeMoreBtn>
                }
                
            </GameArea>



            {
             (_aovivo === undefined || 
             _aovivo === null || 
             jogo.bloqueado == 1 ||
             _aovivo.inplayEventResultObject === undefined || 
             _aovivo.inplayEventResultObject.price.odds == undefined  || 
             _aovivo.inplayEventResultObject.price.odds['90'].fr_home === undefined ||
             _aovivo.inplayEventResultObject.price.odds['90'].fr_home < 1) && 
            
            <CotacaoArea>                   
                    <Locked>
                        <FoundationIcon name="prohibited" size={12} />    
                    </Locked>

               

 
                    <Locked>
                            <FoundationIcon name="prohibited" size={12} />    
                    </Locked>
                   


              
                    <Locked>
                            <FoundationIcon name="prohibited" size={12} />    
                    </Locked>


            </CotacaoArea>
            
            }




            {   
                _aovivo !== undefined && 
                _aovivo !== null && 
                jogo.bloqueado != 1 &&
                _aovivo.inplayEventResultObject !== undefined && 
                _aovivo.inplayEventResultObject.price.odds !== undefined  && 
                _aovivo.inplayEventResultObject.price.odds[90].fr_home !== undefined &&
                <CotacaoArea>
                {
                _aovivo.inplayEventResultObject.price.odds[90].fr_home <= 1 || jogo.bloqueado == 1 || _aovivo.inplayEventResultObject.price.odds[90].fr_home == undefined  ? 
                    <Locked>
                        <Icon name="ios-lock-closed" size={12}/>                       
                    </Locked>
                    :
                    <CotacaoBtn selected={selected == 'fr_home'} onPress={() =>{handleSelect('fr_home')}}>
                        <CotacaoTxt>{checkTeto(_aovivo.inplayEventResultObject.price.odds[90].fr_home).toFixed(2) ?? ''}</CotacaoTxt>
                    </CotacaoBtn>
                }
               

               {
                    _aovivo.inplayEventResultObject.price.odds[90].fr_draw <= 1  ? 
                    <Locked>
                        { _aovivo.inplayEventResultObject.price.odds[90].fr_draw <= 1 && jogoValido && <Icon name="ios-lock-closed" size={12}/>}

                        {!jogoValido && <FoundationIcon name="prohibited" size={12} /> }
                    </Locked>
                    :
                    <CotacaoBtn selected={selected == 'fr_draw'} onPress={() =>{handleSelect('fr_draw')}}>
                        <CotacaoTxt>{checkTeto(_aovivo.inplayEventResultObject.price.odds[90].fr_draw).toFixed(2) ?? ''}</CotacaoTxt>
                    </CotacaoBtn>
                }

                {
                    _aovivo.inplayEventResultObject.price.odds[90].fr_away <= 1  ? 
                    <Locked>
                        { _aovivo.inplayEventResultObject.price.odds[90].fr_away <= 1 && jogoValido && <Icon name="ios-lock-closed" size={12}/>}

                        {!jogoValido && <FoundationIcon name="prohibited" size={12} /> }
                    </Locked>
                    :
                    <CotacaoBtn selected={selected == 'fr_away'} onPress={() =>{handleSelect('fr_away')}}>
                        <CotacaoTxt>{checkTeto(_aovivo.inplayEventResultObject.price.odds[90].fr_away).toFixed(2) ?? ''}</CotacaoTxt>
                    </CotacaoBtn>
                }

            </CotacaoArea>
            }


            
        </RowTitle>
    )
}



export default CotacaoAoVivo