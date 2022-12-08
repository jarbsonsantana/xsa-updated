import React, { createContext, useContext, useState } from "react";
import { getJogosAoVivo } from "../services/API";

const AoVivoContext = createContext([]);

function AoVivoProvider({children}){

    const [aoVivo, setAoVivo] = useState({});
    


    async function timeout() {
        console.log('timeout')
    }

   async function getAoVivoGames() { 

       console.log('Hello');

    }


    return(
        <AoVivoContext.Provider value={[aoVivo, getAoVivoGames]}>
            {children}
        </AoVivoContext.Provider>
    )
}

function UseAoVivo() {
    const context = useContext(AoVivoContext);
    return context;
}

export {AoVivoProvider, UseAoVivo}