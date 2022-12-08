import React, {useState, useEffect, useMemo} from 'react'

import {Modal, ModalDiv,Category,ScrollView,LineText,DataArea,Cot,Icon, CotacaoBtn,CotacaoTxt, ModalBox, Item, Text, Button,ButtonNoBG, ButtonArea, Row, IconArea, RedCardIcon} from './styles';
import {View} from 'react-native';
import { TextWhite } from '../../screens/ReportScreen/styles';
import { useApostaCtx } from '../../hooks/useAposta';



const MaisCotacoesAoVivo = ({diccCotacoes, diccGrupos, show, cotacoes, stats, jogo, handleClose, handlePress, serverData}) => {


    const [category, setCategory] = useState('90');
    const [apostasCtx, setApostasCtx] = useApostaCtx();


    var activeGroup = null;
    const tempos = Object.keys(cotacoes)
    let p = cotacoes[tempos[0]];

    const checkIfSelected = (cot) => {
        const jogoId = jogo.id;
        const tempo = category;

        let _myApostas = apostasCtx.filter((ap)=> ap.cotacao == cot && ap.jogo == jogoId && ap.tempo == tempo);
        if (_myApostas.length > 0) {
            return true
        } else {
            return false;
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



   const hasCotationFromThisGroup = (group_id) => {

       const _cotacoes = diccCotacoes.filter((cot) => cot.grupo == group_id.toString() && cotacoes[category].hasOwnProperty(cot.campo) );
  
        if (_cotacoes.length < 1) {
            return false;
        } else {
            return _cotacoes;
        }
     
       
   }

   function getNormalizedOdd(odd) {
    let ajusteUsuario = serverData.ajusteUsuarioAoVivo;
    // console.log(ajusteUsuario,'Ajuste usuário Ao Vivo');
    let ajusteJogo = jogo.ajusteJogo;
    // console.log(ajusteJogo,'Ajuste Jogo');
    let tetoCotacao = serverData.tetoCotacao;
    // console.log(tetoCotacao,'Ajuste tetoCotacao');
    // console.log('------------');

    const gameFilteredByTeto = Math.min(odd, tetoCotacao );
   
    return (
        Math.min(odd, tetoCotacao ) + 
        ( Math.min(odd, tetoCotacao) * ((parseFloat(ajusteUsuario)+parseFloat(ajusteJogo))/100))
        ).toFixed(2);
    
    }

    function validateJSONFromServer(json) { 

        if(json == null) {
            return false;
        }

        if (json.attacks == null || json.attacks[0] == null || json.attacks[1] == null) {
            return false;
        }

        if (json.corners == null || json.corners[0] == null || json.corners[1] == null) {
            return false;
        }

        if (json.dangerous_attacks == null || json.dangerous_attacks[0] == null || json.dangerous_attacks[1] == null) {
            return false;
        }
        if (json.possession_rt == null || json.possession_rt[0] == null || json.possession_rt[1] == null) {
            return false;
        }
        if (json.redcards == null || json.redcards[0] == null || json.redcards[1] == null) {
            return false;
        }
        if (json.yellowcards == null || json.yellowcards[0] == null || json.yellowcards[1] == null) {
            return false;
        }

        return true;




    }

    return (     
        <Modal
        animationType="slide"
        transparent={true}
        visible={show}
    >
        <ModalDiv>
            <ModalBox>
                <Row>
                <TextWhite>{jogo.refimport}</TextWhite>
                <ButtonNoBG onPress={handleClose}>
                    <TextWhite>Fechar</TextWhite>
                </ButtonNoBG>
                </Row>
                
                { stats != null && validateJSONFromServer(stats) &&  stats != undefined && stats.attacks != undefined && stats.attacks[0] != undefined && stats.attacks[0] != null &&
                <>
                <DataArea>
                    <Cot>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>Ataques</Text>
                        <Text style={{textAlign:'center'}}>{stats.attacks[0] || ''} | { stats.attacks[1] }</Text>
                    </Cot>
                    {stats.dangerous_attacks && 
                    <Cot>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>Ataques Perigosos</Text>
                        <Text style={{textAlign:'center'}}>{stats.dangerous_attacks[0] || ''} | { stats.dangerous_attacks[1] }</Text>
                    </Cot>
                    }
                    {stats.possession_rt && 
                    <Cot>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>Posse %</Text>
                        <Text style={{textAlign:'center'}}>{stats.possession_rt[0] ?? ''} | {stats.possession_rt[1] ?? ''}</Text>
                    </Cot>
                    }
                    
                    
                    
                </DataArea>
                <DataArea>
                    <IconArea>
                        <Icon name="flag" size={12} />
                        <Text style={{fontWeight: 'bold', color: 'white'}}>{stats.corners[0] ?? ''}</Text>
                    </IconArea>
                    <IconArea>
                        <RedCardIcon name="card" color="#ff0000" size={12} />
                        <Text style={{fontWeight: 'bold', color: 'white'}}>{stats.redcards[0] ?? ''}</Text>
                    </IconArea>
                    <IconArea>
                        <RedCardIcon name="card" color="yellow" size={12} />
                        <Text style={{fontWeight: 'bold', color: 'white'}}>{stats.yellowcards[0]}</Text>
                    </IconArea>
                    <IconArea>
                        <Text style={{fontWeight: 'bold', color: 'white'}}> | </Text>
                    </IconArea>
                    <IconArea>
                        <RedCardIcon name="card" color="yellow" size={12} />
                        <Text style={{fontWeight: 'bold', color: 'white'}}>{stats.yellowcards[1]}</Text>
                    </IconArea>
                    
                    <IconArea>
                        <RedCardIcon name="card" color="#ff0000" size={12} />
                        <Text style={{fontWeight: 'bold', color: 'white'}}>{stats.redcards[1]}</Text>
                    </IconArea>

                    <IconArea>
                        <Icon name="flag" size={12} />
                        <Text style={{fontWeight: 'bold', color: 'white'}}>{stats.corners[1]}</Text>
                    </IconArea>

                </DataArea>
                </>
            }
                
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
                                <Text>{grupo.title}</Text>
                            </Category>
                        </View>
                        {_cotFromThisGroup.map((cot) => {
                            return(
                                <Item key={`item-${jogo.id}-${cot.id}-${cot.campo}`}>
                                    <LineText>{cot.title}</LineText>
                                    <CotacaoBtn selected={checkIfSelected(cot.campo)} onPress={()=>{handlePress(cot.campo,category)}}>
                                        <CotacaoTxt>{
                                            getNormalizedOdd(
                                        cotacoes[category][cot.campo] > 100 ? cotacoes[category][cot.campo]: cotacoes[category][cot.campo].toFixed(2)
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

export default MaisCotacoesAoVivo;