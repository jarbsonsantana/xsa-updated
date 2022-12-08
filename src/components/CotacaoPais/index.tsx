import React  from 'react';
import {RowTitle, GameArea, GameTitle, Image} from './styles';

import Campeonato from '../Campeonato';

const CotacaoPais = (props) => {

    let img = props.game.img;

    return(
        <>
            <RowTitle style={{backgroundColor: '#555'}}>
                <GameArea>
                    <Image source={{uri:img}} width={25} height={25} />
                    <GameTitle>{props.game.title}</GameTitle>
                </GameArea>
            </RowTitle>

            {props.game.campeonatos.map((camp) =>{

                return (
                    <Campeonato
                        serverData={props.serverData} 
                        isLive={props.isLive}
                        apostas={props.apostas}
                        dicGrupos={props.dicGrupos}
                        key={`camp-${camp.id}`}
                        camp = {camp}
                        dicCotacoes={props.dicCotacoes} 
                        handleRemoveAposta={props.handleRemoveAposta} 
                        onSelect={props.onSelect} />
                )
            })}
        </>

    )
}

export default CotacaoPais