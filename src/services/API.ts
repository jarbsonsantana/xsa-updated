import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = async () => {
  let url = await AsyncStorage.getItem('@serverURL');
  return url;
} 


const check401Result = (result) => {

    if(result.result == 401) {
      alert('Sessão expirada, faça login novamente.');
      return false;
    } else {
      return true;
    }
 
}


export const getServerInfo = async (server:string) => {

    let req_url  = 'https://'+server+'/api';  
    let store_url = 'https://'+server; 
    var result = {};

    try {
        result = await fetch(req_url)
                    .then((data)=>data.json())
                    .then((data) => data);
   
    } catch(error) {
        console.log(error);
        alert('Erro ao conectar a API')
    }

    if(result.apostaMax) {
      await AsyncStorage.setItem('@serverURL', store_url );
      await AsyncStorage.setItem('@serverData', JSON.stringify(result));

    } else {
      let req_url2  = 'https://game.'+server+'/api';  
      let store_url2 = 'https://game.'+server; 
      try {
        result = await fetch(req_url2)
                    .then((data)=>data.json())
                    .then((data) => data);
   
    } catch(error) {
        console.log(error);
    }

    if(result.apostaMax) {
      await AsyncStorage.setItem('@serverURL', store_url2 );
      await AsyncStorage.setItem('@serverData', JSON.stringify(result));
  
    }}
    
 
    return  result;
}

export const getImpressaoBilhete = async(token) => {
    let req_url  = await url()+'/api/apostas/impressao/'+token;   
    var result = '';

    try {
        result = await fetch(req_url)
                    .then((data)=>data.text())
                    .then((data) => data);
   
    } catch(error) {
        //console.log(error);
    }
    check401Result(result);
    return result;
}


export const getImpressaoCampeonato = async(token) => {
  let req_url  = await url()+'/api/apostar/ImprimirTabelaTxt?campeonato='+token;   
  alert(req_url);
  var result = '';

  try {
      result = await fetch(req_url)
                  .then((data)=>data.text())
                  .then((data) => data);
 
  } catch(error) {
      //console.log(error);
  }
  check401Result(result);
  return result;
}

export const getImpressaoData = async(token) => {
  let req_url  = await url()+'/api/apostar/ImprimirTabelaTxt?data='+token;   
  console.log('nedpoint', req_url);
  var result = '';

  try {
      result = await fetch(req_url)
                  .then((data)=>data.text())
                  .then((data) => data);
 
  } catch(error) {
      //console.log(error);
  }
  check401Result(result);
  return result;
}

export const getImpressaoAoVivo = async() => {
  let req_url  = await url()+'/api/aovivo/ImprimirTabelaTxt';
  alert(req_url);
  var result = '';

  try {
      result = await fetch(req_url)
                  .then((data)=>data.text())
                  .then((data) => data);
 
  } catch(error) {
      //console.log(error);
  }
  check401Result(result);
  return result;
}


export const getMyServerInfo = async () => {

  let req_url  = await AsyncStorage.getItem('@serverURL')+'/api';  
  console.log(req_url);
  var result = {};

  try {
      result = await fetch(req_url)
                  .then((data)=>data.json())
                  .then((data) => data);
    
  } catch(error) {
      console.log(error);
  }
  
  await AsyncStorage.setItem('@serverData', JSON.stringify(result));
  
  return  result;
}


export const getDados = async() => {
    
    let req_url  = await url()+'/api/user/dados';   
    var result = {};

    try {
        result = await fetch(req_url)
                    .then((data)=>data.json())
                    .then((data) => data);
   
    } catch(error) {
        //console.log(error);
    }
    // check401Result(result);
    return result;
}


export const getBonusList = async() => {
    
  let req_url  = await url()+'/api/index/bonus';   
  var result = {};

  try {
      result = await fetch(req_url)
                  .then((data)=>data.json())
                  .then((data) => data);
 
  } catch(error) {
      //console.log(error);
  }
  // check401Result(result);
  return result;
}

export const getPixList = async() => {
    
  let req_url  = await url()+'/api/pix/list';   
  var result = {};

  try {
      result = await fetch(req_url)
                  .then((data)=>data.json())
                  .then((data) => data);
 
  } catch(error) {
      //console.log(error);
  }
  // check401Result(result);
  return result;
}

export const createPix = async(valor:number) => {
    
  let req_url  = await url()+'/api/pix/criar';   
  var result = {};

  try {
      result = await fetch(req_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          valor: valor
        })
      })
      .then((data)=>data.json())
      .then((data) => data);
 
  } catch(error) {
      //console.log(error);
  }
  // check401Result(result);
  return result;
}

export const recreatePix = async(pixId) => {

  console.log('PIXID:', pixId);
  
  let req_url  = await url()+'/api/pix/recriar';   
  var result = {};

  try {
      result = await fetch(req_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: parseFloat(pixId)
        })
      })
      .then((data)=>data.json())
      .then((data) => data);
 
  } catch(error) {
      //console.log(error);
  }
  // check401Result(result);
  return result;
}

export const checkPix = async(pixId) => {

  console.log('PIXID:', pixId);
  
  let req_url  = await url()+'/api/pix/verificarPagamento';   
  var result = {};

  try {
      result = await fetch(req_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: parseInt(pixId)
        })
      })
      .then((data)=>data.json())
      .then((data) => data);
 
  } catch(error) {
      //console.log(error);
  }
  // check401Result(result);
  return result;
}



export const getClientes = async () => {
    const endpoint = await url()+'/api/clientes/';

    try {

    let result = await fetch(endpoint)
    .then((data)=>data.json())
    .then((data) => data);
    
    check401Result(result);
    return result;

    } catch(error) {
        console.log(error)
    }

}


export const getCaixa = async (dataInicial = null, dataFinal = null) => {
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

  if (dataInicial == null) {
    dataInicial = lastSunday.toISOString().split('T')[0]
  }

  if (dataFinal == null) {
    dataFinal = new Date().toISOString().split('T')[0]
  }

    const endpoint = await url()+'/api/caixa/';

      let result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dataInicial: dataInicial,
          dataFinal: dataFinal
        })
      }).then(data => data.json())
      .then(res => res);

      console.log('Data Inicial:', dataInicial);
      console.log('Data Final:', dataFinal);
      return result;
      
}

export const addClient = async (clientName, phone = '') => {
    let req_url = await url()+'/api/clientes/novo'
    let result = await fetch(req_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: clientName,
          telefone: phone
        })
      }).then(data => data.json())
      .then(res => res);

      check401Result(result);
      return result;
}

export const insertClient = async (clientName, phone = '') => {
  let req_url = await url()+'/api/clientes/insert'
  let result = await fetch(req_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: clientName,
        telefone: phone
      })
    }).then(data => data.json())
    .then(res => res);

    check401Result(result);
    return result;
}


export const getRelatorio = async (cliente = '0',dataInicial = '',dataFinal = '') => {
  let req_url = await url()+'/api/caixa/places'

  console.log('cliente', cliente);
  let result = await fetch(req_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cliente: cliente,
        dataInicial: dataInicial,
        dataFinal: dataFinal
      })
    }).then(data => data.json())
    .then(res => res);
    return result;
}

export const ticketDetails = async (code) => {
  let req_url = await url()+'/api/apostas/consultar'
  let result = await fetch(req_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codigo: code,
      })
    }).then(data => data.json())
    .then(res => res);

    return result;
}

export const getGamesFiltered = async (date1,date2) => {
  let req_url = await url()+`/api/apostar/jogosFilter?dataini=${date1}&datafim=${date2}`;
  console.log(req_url);
 
  try {

    let result = await fetch(req_url)
    .then((data)=>data.json())
    .then((data) => data);
    
    check401Result(result);
    return result;

    } catch(error) {
        console.log(error)
    }
}
export const getGamesAoVivo = async () => {
  let req_url = await url()+`/api/aovivo/jogosFilter`;
  console.log('ReqURL', req_url)
 
  try {

    let result = await fetch(req_url)
    .then((data)=>data.json())
    .then((data) => data);
    
    check401Result(result);
    return result;

    } catch(error) {
        console.log(error)
    }
}


export const cancelTicket = async (code) => {
  let req_url = await url()+'/api/apostas/cancelar'
  try { 
    let result = await fetch(req_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: code,
      })
    }).then(data => data.json())
    .then(res => res);
    return result;
  } catch(error) {
    console.log('Erro cancelando ticket', error);
  }
}

export const validarAposta = async (data) => {
  let req_url = await url()+'/api/apostas/validar'
  try { 
    let result = await fetch(req_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(data => data.json())
    .then(res => res);
    return result;
  } catch(error) {
    console.log('Erro validando ticket', error);
  }
}

export const getJogosAoVivo = async() => {
  const endpoint = await url()+'/api/aovivo/jogos';
  try {
  let result = await fetch(endpoint)
      .then((data)=>data.json())
      .then((data) => data);
  console.log('getJogosAoVivo called');
  return result;
  } catch(error) {
      console.log('GetJogosAoVivoError:', error)
  }
}

export const getJogos = async() => {

  const endpoint = await url()+'/api/apostar/jogos';

    try {

    let result = await fetch(endpoint)
    .then((data)=>data.json())
    .then((data) => data);

    return result;

    } catch(error) {
        console.log(error)
    }

}
interface IPreJogo {
  id:string,
  tempo:string,
  cotacao:string
}

export const updateCotacaoPreJogo = async(jogo:IPreJogo) => { 
  const endpoint = await url()+'/api/apostar/cotacao?id='+jogo.jogo+'&tempo='+jogo.tempo+'&cotacao='+jogo.cotacao;
  console.log('endpoint:',endpoint);

  try {
  let result = await fetch(endpoint)
      .then((data)=>data.json())
      .then((data) => data);
  console.log('atualizarCotacaoPreJogo called');
  return result;
  } catch(error) {
      console.log('atualizarCotacaoPreJogo:', error)
  }

}


export const updateCotacaoAoVivo = async(jogo:IPreJogo) => { 
  const endpoint = await url()+'/api/aovivo/cotacao?id='+jogo.jogo+'&tempo='+jogo.tempo+'&cotacao='+jogo.cotacao;
  console.log('endpoint:',endpoint);

  try {
  let result = await fetch(endpoint)
      .then((data)=>data.json())
      .then((data) => data);
  console.log('atualizarCotacaoAoVivo called');
  return result;
  } catch(error) {
      console.log('atualizarCotacaoAoVivo:', error)
  }

}


export const getJogosAoVivoEachSecond = async (refimport) => {

  console.log('Fui Chamado', refimport);

  //const endpoint = 'https://api-cs1.123bet.com.br/cs-games.php?inplay-result='+refimport;
  const endpoint = 'https://netgamer-api.123bet.com.br/api/Inplay/Result?eventId='+refimport;


    try {

    let result = await fetch(endpoint)
    .then((data)=>data.json())
    .then((data) => data);
     
    if(result.success == undefined || result.success == false) {
      return null;
    }
    return result;

    } catch(error) {
        console.log(error)
    }

}

export const FinalizarBilhete = async(bilhete) => {
  const endpoint = await url()+'/api/apostar/apostar';
  console.log('Enviando Bilhete (Pré-jogo):', bilhete);
  try {

    let result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bilhete)
    })
    .then((data)=>data.json())
    .then((data) => data);

    return result;

    } catch(error) {
        console.log(error)
    }

}

export const FinalizarBilheteAoVivo = async(bilhete) => {
  console.log('Enviando Bilhete (Ao vivo):', bilhete);
  const endpoint = await url()+'/api/aovivo/apostar';

  try {

    let result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bilhete)
    })
    .then((data)=>data.json())
    .then((data) => data);

    return result;

    } catch(error) {
        console.log(error)
    }

}

export const findTicketsWithFilter = async(dataInicial, dataFinal, page = 1) => {

  const endpoint = await url()+'/api/apostas/minhasApostas?page='+page+'&forpage=10000';
    try {

    let result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "dataInicial": dataInicial,
        "dataFinal": dataFinal,
        "forpage": "10000"
      })
    })
    .then((data)=>data.json())
    .then((data) => data);

    return result;

    } catch(error) {
        console.log(error)
    }
}

export const findTickets = async(page = 1) => {

  const endpoint = await url()+'/api/apostas/minhasApostas?page='+page+'&forpage=10000';

    try {

    let result = await fetch(endpoint)
    .then((data)=>data.json())
    .then((data) => data);

    return result;

    } catch(error) {
        console.log('Erro: '+error)
    }
}


export const changePassword = async (senha, nsenha, rsenha) => {
  let req_url = await url()+'/api/user/alterarSenha'
  let result = await fetch(req_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        senha: senha,
        nsenha: nsenha,
        rsenha:rsenha
      })
    }).then(data => data.json())
    .then(res => res);
  return result;
}


export const deleteClient = async (id) => {
    let req_url = await url()+'/api/clientes/excluir'
    let result = await fetch(req_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
        })
      }).then(data => data.json())
      .then(res => res);
    return result;
}


export async function preValidarAposta(token) {
  
  let req_url = await url()+'/api/apostas/verificarJogos'
    let result = await fetch(req_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token,
        })
      }).then(data => data.json())
      .then(res => res);
    return result;
}




export const loginUser = async (username:string,password:string) => {
    let req_url  = await url()+'/entrar/login/insert';   
    var result = {};


    try {
        let result = fetch(req_url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          }).then(data => data.json())
          .then(res => res);
      return result;
    } catch(error) {
        console.log(error);
    }
    if (result.result == 0) {
      alert(result.message);
    }
    return  result;
}

export const diffServerTimeValidate = async () => {
  var _diffBelowTimeServer;
  var _diffAboveTimeServer;

  // old: 
  // old: https://api-cs1.123bet.com.br/cs-games.php?now-time

  let result = await fetch('https://netgamer-api.123bet.com.br/api/Inplay/NowTime')
  .then((response) => response.text());
  
  let serverTime = (parseFloat(result)*1000);
  let localTime = new Date().getTime();
  if(localTime < serverTime){
      _diffBelowTimeServer = serverTime - localTime;
  }
  if(localTime > serverTime){
      _diffAboveTimeServer = localTime - serverTime;
  }
  var now = new Date();
  if(_diffBelowTimeServer > 0)
      now = new Date(now.getTime() + _diffBelowTimeServer);
  else if(_diffAboveTimeServer > 0)
      now = new Date(now.getTime() - _diffAboveTimeServer);
  return now;
}
function lifeTimeValidation(jogo){
  var inplay = jogo.event.inplay;
  if(inplay != null && inplay.event != null  && inplay.event.updated_at != null){
      if(unixTimeValidation(inplay.event.updated_at) && jogo != null && jogo.valido === '1'){
        
      }else if(!unixTimeValidation(inplay.event.updated_at) && jogo != null && jogo.valido === '0'){
       
      }
  }else if(jogo != null && jogo.valido === '1' && !_inReloadData){
     
  }
}
function unixTimeValidation(dateIn){
  var time = new Date(dateIn * 1000);
  var diff = Math.abs(parseFloat(diffServerTimeValidate())-time);
  return diff > 15; // lifetime 15 segs
}