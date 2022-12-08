import React, {useState, useEffect, useMemo} from 'react'

import {Modal, ModalDiv,Category,ScrollView,LineText, CotacaoBtn,CotacaoTxt, ModalBox, Item, Text, Button,ButtonNoBG, ButtonArea} from './styles';
import {View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextWhite } from '../../screens/ReportScreen/styles';
import { useApostaCtx } from '../../hooks/useAposta';


const MaisCotacoes = ({diccCotacoes, show, jogo, game, handleClose, handlePress}) => {
    const [dicCotacoes, setDicCotacoes] = useState(diccCotacoes);
    const [category, setCategory] = useState('90');

    const [apostasCtx, setApostasCtx] = useApostaCtx();

    var activeGroup = null;
    // useEffect(()=>{
    //     const getDic = async () => {
    //         let raw_cot = await AsyncStorage.getItem('@diccotacoes')
    //         let cot = JSON.parse(raw_cot);
    //         setDicCotacoes(cot);

    //     }
    //     getDic();
    
    // },[])

    const tempos = Object.keys(jogo.cotacoes)
    let p = jogo.cotacoes[tempos[0]];
    


    let data = {};
    tempos.map((t)=>{
        data[t] = jogo.cotacoes[t];
    })
    


    

    



    const translate = (k) => {
        if (dicCotacoes) {
        let dado = dicCotacoes.find((i)=>{
            return i.campo == k
        })
        if (dado)
            return dado.title;
        } else {
            return null;
        }
    }
    
    const checkIfSelected = (cot) => {
        const jogoId = jogo.id;
        const jogoCot = cot;
        const tempo = category;

        let _myApostas = apostasCtx.filter((ap)=> ap.cotacao == cot && ap.jogo == jogoId && ap.tempo == tempo);
        if (_myApostas.length > 0) {
            return true
        } else {
            return false;
        }
    }

    const getGroup = (k) => {
        if (dicCotacoes) {
        let dado = dicCotacoes.find((i)=>{
            return i.campo == k
        })
        if (dado)
            return dado.grupoTitle;
        }
    }

   const translateCategory = (t) => {
       switch(t) {
           case '90':
               return 'Jogo Compl.'
            case 'pt':
                return '1º Tempo';
            case 'st':
                return '2º Tempo';
            case '10':
                return '10 Min'
       }
   }
   
   const handleCategory = (c) => {
       setCategory(c);
   }


    return (     
        <Modal
        animationType="slide"
        transparent={true}
        visible={show}
    >
        <ModalDiv>
            <ModalBox>
                <ButtonNoBG onPress={handleClose}>
                    <TextWhite>Fechar </TextWhite>
                </ButtonNoBG>
                
                <ButtonArea>
                    {tempos.map((t)=>
                    <Button key={t} bg={category == t ? 'gold':'#aaa'} onPress={()=>{handleCategory(t)}}>
                        <Text style={{textAlign:'center'}}>{translateCategory(t)}</Text>
                    </Button>
                    )}

                    
                    
                </ButtonArea>
                
                <ScrollView>
                        {Object.entries(jogo.cotacoes[category]).map((i) => {
    let grupo = getGroup(i[0]);
    if (grupo == '' || i[0] =='') {
        return false;
    }
    if (activeGroup != grupo ) {
        activeGroup = grupo

        if (grupo == '' || grupo == null || !grupo) { return }
        return (
            <View key={`view-${jogo.id}-${grupo}-${i[0]}`}>
            <Category>
                <Text>{grupo}</Text>
            </Category>
            
            <Item>
                <LineText>{translate(i[0])} </LineText>
                <CotacaoBtn selected={checkIfSelected(i[0])} onPress={()=>{handlePress(i[0],category)}}>
                    <CotacaoTxt>{ i[1] < 100 ? i[1].toFixed(2) : i[1] }</CotacaoTxt>
                </CotacaoBtn>
            </Item>
            </View>
        )
    } else {
        if (translate(i[0]) == null|| !translate(i[0])) { return; }

            return (
                <Item key={`item-${jogo.id}-${grupo}-${i[0]}-${i[1]}`}>
                    <LineText>{translate(i[0])}</LineText>
                    <CotacaoBtn selected={checkIfSelected(i[0])} onPress={()=>{handlePress(i[0],category)}}>
                        <CotacaoTxt>{ i[1] < 100 ? i[1].toFixed(2) : i[1] }</CotacaoTxt>
                    </CotacaoBtn>
                </Item>
            )
        
    }

    
}
    
)}
                        </ScrollView>
                       
                    
            </ModalBox>
        </ModalDiv>
    </Modal>
    )
}

export default MaisCotacoes;