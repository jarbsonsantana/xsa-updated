import React from 'react'
import {} from './styled'


import Cotacao from '../Cotacao';
import { RowTitle, GameArea, GameTitle } from '../../screens/CampeonatoScreen/styles';
import CotacaoAoVivo from '../CotacaoAoVivo';

const Campeonato = (props) => {

    let camp = props.camp;


    return(
        <>
            <RowTitle style={{backgroundColor: '#222'}}>
                <GameArea id={camp.campeonato}>
                    
                    <GameTitle>{camp.title}</GameTitle>
                </GameArea>
            </RowTitle>
            
            {camp.jogos.map((jogo) => 
            {
                if (props.isLive) {
                    return (<CotacaoAoVivo serverData={props.serverData}  isLive={props.isLive} apostas={props.apostas} dicGrupos={props.dicGrupos} dicCotacoes={props.dicCotacoes} jogo={jogo} key={jogo.id} handleRemoveAposta={props.handleRemoveAposta} onSelect={props.onSelect} />) 
                } else {
                    return (<Cotacao serverData={props.serverData} isLive={props.isLive} apostas={props.apostas} dicGrupos={props.dicGrupos} dicCotacoes={props.dicCotacoes} jogo={jogo} key={jogo.id} handleRemoveAposta={props.handleRemoveAposta} onSelect={props.onSelect} />
                        )
                }
            }
                
           
                )}
        </>
    )

}


export default Campeonato