import React, { createContext, useContext, useState } from "react";

const BancaContext = createContext([]);

function BancaProvider({children}){

    const [banca, setBanca] = useState({});

    //const [apostas, setApostas] = useState([]);

    function set(aposta) { 
        apostas.splice(0,apostas.length);
        apostas.push(...aposta);
        console.log(apostas);
        return true;
        
    }

    return(
        <BancaContext.Provider value={[banca, setBanca]}>
            {children}
        </BancaContext.Provider>
    )
}

function useBancaCtx() {
    const context = useContext(BancaContext);
    return context;
}

export {BancaProvider, useBancaCtx}