import React, { createContext, useContext, useState } from "react";

const ApostaContext = createContext([]);

function ApostaProvider({children}){

    const apostas = [];

    //const [apostas, setApostas] = useState([]);

    function handleAposta(aposta) { 
        apostas.splice(0,apostas.length);
        apostas.push(...aposta);
        console.log(apostas);
        return true;
        
    }

    return(
        <ApostaContext.Provider value={[apostas, handleAposta]}>
            {children}
        </ApostaContext.Provider>
    )
}

function useApostaCtx() {
    const context = useContext(ApostaContext);
    return context;
}

export {ApostaProvider, useApostaCtx}