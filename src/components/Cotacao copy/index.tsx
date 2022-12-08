import React, {useState, useEffect, useMemo, memo, useCallback} from 'react';
import {RowTitle, GameArea, SeeMoreBtn, GameTitle, GameDetails, CotacaoArea, CotacaoTxt, CotacaoBtn, Locked, Icon, Image, InlineRow} from './styles';
import MaisCotacoes from '../MaisCotacoes';
import { B } from '../../screens/Caixa/styles';

import { useApostaCtx } from '../../hooks/useAposta';

function Cotacao (props) {

    const [apostaCtx, setApostaCtx] = useApostaCtx();

    const jogo = props.jogo;
    const dateToBR = (date) => {
        let rawDate = new Date(date);
        return rawDate.getDate()+'/'+((rawDate.getMonth())+1)+'/'+rawDate.getFullYear();
    }

    const [selected,setSelected] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let _inGame = apostaCtx.find((game) => game.jogo == jogo.id)
        if(_inGame) {
            setSelected(_inGame.cotacao)
        } 
    }, [apostaCtx])


    const handleOtherSelection = (selection, time) => {
        setSelected(selection);
        
        props.onSelect({
            title: `${jogo.casa} x ${jogo.fora}`,
            valor: jogo.cotacoes[time][selection],
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

        
        props.onSelect({
            title: `${jogo.casa} x ${jogo.fora}`,
            valor: jogo.cotacoes[90][selection],
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
    function shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    const calculateCotacoes = useMemo(() => {
        let counter = 0;
        if (jogo.cotacoes[90] != undefined) {
            counter += Object.keys(jogo.cotacoes[90]).length
        }
        if (jogo.cotacoes.st != undefined) {
            counter += Object.keys(jogo.cotacoes.st).length
        }
        if (jogo.cotacoes.pt != undefined) {
            counter += Object.keys(jogo.cotacoes.pt).length
        }
        if (jogo.cotacoes[10] != undefined) {
            counter += Object.keys(jogo.cotacoes[10]).length
        }
        return counter;
    }, [jogo.cotacoes])

  

    return(
        <RowTitle key={jogo.id}>

            <MaisCotacoes diccGrupos={props.dicGrupos} diccCotacoes={props.dicCotacoes} show={showModal} jogo={jogo} game={props.game} handlePress={handleOtherSelection} handleClose={()=>{setShowModal(false)}} />
            
            
            <GameArea>
                {jogo.img_casa !='' && jogo.img_fora !='' && 
                <InlineRow> 
                <Image width={25} height={25} source={{uri: jogo.img_casa}} />
                <GameTitle> X </GameTitle>
                <Image width={25} height={25} source={{uri: jogo.img_fora}} />
            </InlineRow>
                }
                
                
                <GameTitle>{jogo.casa} X {jogo.fora}</GameTitle>
                
                <GameDetails>{dateToBR(jogo.data)} - {jogo.hora}</GameDetails>
                <SeeMoreBtn onPress={handleVerMais}>
                    <GameDetails>Ver mais <B>+ {calculateCotacoes}</B></GameDetails>
                </SeeMoreBtn>
            </GameArea>
            <CotacaoArea>
                {
                    jogo.cotacoes[90].m_ftr_1 <= 1 ? 
                    <Locked>
                        <Icon name="ios-lock-closed" size={12}/>
                    </Locked>
                    :
                    <CotacaoBtn selected={selected == 'm_ftr_1'} onPress={() =>{handleSelect('m_ftr_1')}}>
                        <CotacaoTxt>{jogo.cotacoes[90].m_ftr_1.toFixed(2) ?? ''}</CotacaoTxt>
                    </CotacaoBtn>
                }
               

               {
                    jogo.cotacoes[90].m_ftr_draw <= 1 ? 
                    <Locked>
                        <Icon name="ios-lock-closed" size={12}/>
                    </Locked>
                    :
                    <CotacaoBtn selected={selected == 'm_ftr_draw'} onPress={() =>{handleSelect('m_ftr_draw')}}>
                        <CotacaoTxt>{jogo.cotacoes[90].m_ftr_draw.toFixed(2) ?? ''}</CotacaoTxt>
                    </CotacaoBtn>
                }

                {
                    jogo.cotacoes[90].m_ftr_2 <= 1 ? 
                    <Locked>
                        <Icon name="ios-lock-closed" size={12}/>
                    </Locked>
                    :
                    <CotacaoBtn selected={selected == 'm_ftr_2'} onPress={() =>{handleSelect('m_ftr_2')}}>
                        <CotacaoTxt>{jogo.cotacoes[90].m_ftr_2.toFixed(2) ?? ''}</CotacaoTxt>
                    </CotacaoBtn>
                }

            </CotacaoArea>
        </RowTitle>
    )
}



export default memo(Cotacao)