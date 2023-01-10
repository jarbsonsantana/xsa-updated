import React, {useState, useEffect, useMemo} from 'react'

import {Modal, ModalDiv,Category,ScrollView,LineText, CotacaoBtn,CotacaoTxt, ModalBox, Item, Text, Button,ButtonNoBG, ButtonArea} from './styles';
import {View} from 'react-native';
import { TextWhite } from '../../screens/ReportScreen/styles';
import { useApostaCtx } from '../../hooks/useAposta';


const MaisCotacoes = ({diccCotacoes, diccGrupos, show, jogo, handleClose, handlePress, serverData}) => {


    const [category, setCategory] = useState('90');
    const [apostasCtx, setApostasCtx] = useApostaCtx();



    var activeGroup = null;
    // useEffect(()=>{
    //     const getDic = async () => {
    //         let raw_cot = await AsyncStorage.getItem('@diccCotacoes')
    //         let cot = JSON.parse(raw_cot);
    //         setdiccCotacoes(cot);

    //     }
    //     getDic();
    
    // },[])

    const tempos = Object.keys(jogo.cotacoes)
    let p = jogo.cotacoes[tempos[0]];
    
    let _myActualApostas =  apostasCtx;  
    const checkIfSelected = (cot) => {
        const jogoId = jogo.id;
        const tempo = category;

        let _myApostas = _myActualApostas.filter((ap)=> ap.cotacao == cot && ap.jogo == jogoId && ap.tempo == tempo);
        if (_myApostas.length > 0) {
            return true
        } else {
            return false;
        }
    }

    // const getGroup = (k) => {
    //     if (diccCotacoes) {
    //     let dado = diccCotacoes.find((i)=>{
    //         return i.campo == k
    //     })
    //     if (dado)
    //         return dado.grupoTitle;
    //     }
    // }

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



   const hasCotationFromThisGroup = (group_id) => {

       const _cotacoes = diccCotacoes.filter((cot) => cot.grupo == group_id.toString() && jogo.cotacoes[category].hasOwnProperty(cot.campo) );
       
        if (_cotacoes.length < 1) {
            return false;
        } else {
            console.log(_cotacoes[0],'keycots');
            return _cotacoes;
        }

        
     
       
   }
   let ajusteUsuario = serverData.ajusteUsuario;
   let ajusteJogo = jogo.ajusteJogo;
   let tetoCotacao = serverData.tetoCotacao;
   console.log(ajusteUsuario,'Pré-jogo: Ajuste usuário');
    
    console.log(ajusteJogo,'Pré-jogo: Ajuste Jogo');
    
    console.log(tetoCotacao,'Pré-jogo: Ajuste tetoCotacao');
    console.log('------------');
   function getNormalizedOdd(odd) {
   
    
    var lastCotTitle = null;

    const gameFilteredByTeto = Math.min(odd, tetoCotacao );
   
    return (
        Math.min(odd, tetoCotacao ) + 
        ( Math.min(odd, tetoCotacao) * ((parseFloat(ajusteUsuario)+parseFloat(ajusteJogo))/100))
        ).toFixed(2);
    
    
    // return gameFilteredByTeto + (gameFilteredByTeto * ()/100);
    // return  gameFilteredByTeto+ ( (gameFilteredByTeto*(parseFloat(ajusteJogo) + parseFloat(ajusteUsuario))/100) )
}   
    var lastCot = '';
    const setLastCot = (cot)=> {
        lastCot = cot;
    }
    const checkLastCot = (cot) => {
        return lastCot == cot 
    }

    return (     
        <Modal
        animationType="slide"
        transparent={true}
        visible={show}
    >
        <ModalDiv>
            <ModalBox>
            <TextWhite>{jogo.refimport}</TextWhite>
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
                    
                    {diccGrupos && diccGrupos.map((grupo) => {

                            

                        let _cotFromThisGroup = hasCotationFromThisGroup(grupo.id);

                        if (!_cotFromThisGroup || _cotFromThisGroup == false) {
                            
                            return null;
                        }

                        return (
                        <View key={`view-${jogo.id}-${grupo.id}`}>
                        <View >
                            <Category>
                                <Text>{grupo.title} - {category}</Text>
                            </Category>
                        </View>
                        {_cotFromThisGroup.map((cot) => {
                            
                            
                            if (parseFloat(getNormalizedOdd(
                                jogo.cotacoes[category][cot.campo] > 100 ? jogo.cotacoes[category][cot.campo]: jogo.cotacoes[category][cot.campo].toFixed(2)
                                    )) <= 1) {
                                        return null;
                                    }
                                if (checkLastCot == cot.title) { return null ;}
                                setLastCot(cot.title);
                            return(
                                <Item key={`item-${jogo.id}-${cot.id}-${cot.campo}`}>
                                    <LineText>{cot.title}</LineText>
                                    <CotacaoBtn selected={checkIfSelected(cot.campo)} onPress={()=>{handlePress(cot.campo,category)}}>
                                        <CotacaoTxt>
                                            {
                                            getNormalizedOdd(
                                        jogo.cotacoes[category][cot.campo] > 100 ? jogo.cotacoes[category][cot.campo]: jogo.cotacoes[category][cot.campo].toFixed(2)
                                            )
                                        }</CotacaoTxt>
                                    </CotacaoBtn>
                                </Item>

                            )
                        })}

</View>)
                        
                    })}
                        
                </ScrollView>
                       
                    
            </ModalBox>
        </ModalDiv>
    </Modal>
    )
}

export default MaisCotacoes;