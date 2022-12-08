import React, {useState} from 'react';
import { View } from '../../screens/SearchTicket/styles';
import { GameArea, Game, Text, PaisImg, CampeonatosArea, SubGame, SubGameText, RoundedArea } from './styles'

function GameComp({campeonatos, pais, onPress, game, pesquisa, filterDate}) {

    const [showCampeonatos, setShowCampeonatos] = useState(false);


    const calculateResults = () => {
        let result = 0;
        campeonatos.map((campeonato)=>{
                
            let finded = false;
            let re = new RegExp(pesquisa)
            campeonato.jogos.map((j) => {
                result++;
                return
                // if (re.test(j.casa)) {
                //     finded = true;
                //   }
                // if (re.test(j.fora)) {
                //     finded = true;
                // }
            })
            // if (re.test(campeonato.title)) {
            //     finded = true;
            // }

            // if(finded) {
            //     result++;
            // }

        })
        return result;
    }


    return (
        <GameArea >
            <Game key={pais.id} onPress={()=>{setShowCampeonatos(!showCampeonatos)}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <PaisImg source={{uri: pais.img}} width={30} height={30} />
                    <Text>{pais.title}</Text>
                </View>
                <RoundedArea>
                    <Text>{calculateResults()}</Text>
                </RoundedArea>
                
            </Game>
            <CampeonatosArea display={showCampeonatos}>
            {campeonatos.map((campeonato)=>{
                
                let finded = false;
                let sameDate = false;
                let re = new RegExp(pesquisa)
                campeonato.jogos.map((j) => {
                    
                    if(filterDate != '') {
                        if (j.data == filterDate) {
                            sameDate = true
                        }
                    } else {
                        sameDate = true;
                    }
                    if (re.test(j.casa)) {
                        finded = true;
                      }
                    if (re.test(j.fora)) {
                    finded = true;
                    }
                })
                if (re.test(campeonato.title)) {
                    finded = true;
                }

                if(finded && sameDate)
                    return (
                        <SubGame key={campeonato.title} onPress={()=>{onPress(campeonato)}}>
                            <SubGameText>{campeonato.title}</SubGameText>     
                        </SubGame>
                    );

            })}
            </CampeonatosArea>
      </GameArea>

 
        
    );
  }
  
export default GameComp;