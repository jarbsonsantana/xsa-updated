import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native'
import { Container, GamesContainerArea, Text, SearchContainer, SearchInput, GameTypeContainer, AreaDate, AreaButton, AreaButtonText, AreaButtonTitle, AoVivoContainer, AoVivoText, AoVivoIcon } from './styles';
import { getJogos, getGamesFiltered, getJogosAoVivo, getMyServerInfo } from '../../services/API';
import GameComp from '../../components/Game';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateFilter from '../../components/DateFilter';
import {request, PERMISSIONS} from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';


function HomeScreen() {


  
    const navigation = useNavigation();

    var lastGamesOnline = null;
    var lastGamesPreJogo = null;

    const [apostasFeitas, setApostasFeitas] = useState([]);

    const [games, setGames] = useState({});
    const [isLive, setIsLive] = useState(false);
    const [liveHabilitado, setLiveHabilitado] = useState(false);
    const [dateButtons, setDateButtons] = useState([]);
    
    const [loading,setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [search2, setSearch2] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [dicCotacoes, setDicCotacoes] = useState([]);
    var __serverData;
 
    useEffect(()=>{
      const getGamesData = async () => {
          let result = await getJogos();
          lastGamesPreJogo = result;
          // let _serverData =  await AsyncStorage.getItem('@serverData') || '{}';
          __serverData = await getMyServerInfo();
          // __serverData = JSON.parse(_serverData);
          setGames(result);
          setDicCotacoes(result.cotacoes);
          AsyncStorage.setItem('@diccotacoes', JSON.stringify(result.cotacoes));
          setLiveHabilitado(__serverData.aovivo == 1)
          setDateButtons(__serverData?.botoes);
          setLoading(false);
          //console.log('getGamesData chamado na página campeonato');
      }
      getGamesData();
    }, [])

    if(loading) {
      return (
        <Container>
          <ActivityIndicator size="large" color="grey" style={{marginBottom: 15}} />
        <Text>Carregando Jogos...</Text>
      </Container>
      )
    }
    
    const getPaises = () => {
      let myReturn = [];
      if (search != '') {
        myReturn = games.paises.filter((p) => {
          
          var finded = false;
          // É um nome de pais?
          let re = new RegExp(search, 'iu')
          if(re.test(p.title)) { 
            finded = true;
            //return true;
          }

          // É um nome de jogo?
          let campeonatos = games.campeonatos.filter((c) => c.pais == p.id)
          campeonatos.map((c) => {
            if (re.test(c.title)) {
              finded = true;
            }
            c.jogos.map((j) => {
              if (re.test(j.casa)) {
                finded = true;
              }
              if (re.test(j.fora)) {
                finded = true;
              }
            })
          
            
          })
          
          return finded;

        })
      } 

      // Há um filtro por data ativo?
      else if (filterDate != '') {
        let myReturn = [];
        myReturn = games.paises.filter((p) => {
          
          var finded = false;


          // É um nome de jogo?
          let campeonatos = games.campeonatos.filter((c) => c.pais == p.id)
          campeonatos.map((c) => {
            c.jogos.map((j) => {
              if (j.data == filterDate) {
                finded = true;
              }
            })
          })

          return finded; 

      });
      return myReturn;
    } else {
        myReturn = games.paises;
      }
      return myReturn;
    }

    const handleGamePress = async (game) => {
      const serverData = await getServerData();
      // if(isLive) {

      //   navigation.navigate('CampeonatoComFiltro',{ date: 'online', screenTitle:'Ao Vivo', dicGrupos: games.grupos, dicCotacoes:dicCotacoes, serverData, isLive: true, filterCamp:game.jogos[0].campeonato });
      //   return ;
      // }
      navigation.navigate('Campeonato',{game: game, dicGrupos: games.grupos, dicCotacoes:dicCotacoes, serverData, isLive: isLive})
    }

    const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    
    const findCampeonatoToShowByPaises = (paises) => {
      let _paises = [];
      paises.map((p) => {
        _paises.push(p.id)
      })

      let _campeonatos = games.campeonatos.filter((c) => _paises.indexOf(c.pais) >=0)
      return _campeonatos;
    }
    const findPaisesToShowByDate = (date) => {

      if (date == null) {
        return games.paises;
      }

      const _paises = [];
      games.campeonatos.map(c => {
        c.jogos.map(j => {
          if (j.data == date) {

            if (_paises.indexOf(c.pais) == -1) {
              _paises.push(c.pais)
            }
          }
        })
      })
      let myReturnPaises = games.paises.filter((pais) => {
        return _paises.indexOf(pais.id) >= 0
      });
      return myReturnPaises;
    }

    const getServerData = async  () => {
      let _serverData =  await AsyncStorage.getItem('@serverData') || '{}';
      let __serverData = JSON.parse(_serverData);
      return  __serverData;
    }

    const handleDatePress = async (date, description = null) => {

      if (date == 'online') {
        console.log('Todos jogos online pressed');
        const serverData = await getServerData();
        navigation.navigate('CampeonatoComFiltro',{ date: 'online', screenTitle:'Ao Vivo', dicGrupos: games.grupos, dicCotacoes:dicCotacoes, serverData, isLive: true });
        return;
      }
      
      const serverData = await getServerData();
      console.log('Date Pressed: ', date);

      navigation.navigate('CampeonatoComFiltro',{ date: date, screenTitle:description, serverData, isLive: false });
    }

    const handleAoVivoPress = async (choice) => {
      setIsLive(choice);

      if (!choice) {
          if(lastGamesPreJogo != null) {
            setGames(lastGamesPreJogo);
          }
          //setLoading(true);

          let result = await getJogos();
          setDicCotacoes(result.cotacoes);
          AsyncStorage.setItem('@diccotacoes', JSON.stringify(result.cotacoes));
          lastGamesPreJogo = result;
          setGames(result);

          //setLoading(false);
      } else {
        //setLoading(true);



        if(lastGamesOnline != null) {
          setGames(lastGamesOnline);
        }

        let result = await getJogosAoVivo();
        setDicCotacoes(result.cotacoes);
        AsyncStorage.setItem('@diccotacoes', JSON.stringify(result.cotacoes));
        lastGamesOnline = result;
        setGames(result);
        //setLoading(false);
      }
      
      const serverData = await getServerData();


      //navigation.navigate('CampeonatoAoVivo',{ screenTitle:'Jogos ao Vivo', serverData });
    }
   
    return (
      <Container>

        <GameTypeContainer>
          <AoVivoContainer onPress={()=>{handleAoVivoPress(false)}} selected={!isLive}>
            <AoVivoIcon name="football" size={26} />
            <AoVivoText> Pré-jogos</AoVivoText>
          </AoVivoContainer>
          
          {liveHabilitado && 
          <AoVivoContainer onPress={()=>{handleAoVivoPress(true)}} selected={isLive}>
            <AoVivoIcon name="football" size={26} />
            <AoVivoText> Jogos ao Vivo</AoVivoText>
          </AoVivoContainer>
          }
        </GameTypeContainer>
       
        <SearchContainer>
          <SearchInput placeholderTextColor='#828689' placeholder="Pesquisar..." value={search} onChangeText={(t)=>{setSearch(t)}} />
        </SearchContainer> 
        <GamesContainerArea contentContainerStyle={{marginTop: 10, paddingBottom: 100}}>

          
          <DateFilter onPress={handleDatePress} isLive={isLive} buttonsToShow={dateButtons} />
          
          
    
          {getPaises().map((p)=>{
            
            let campeonatos = games.campeonatos.filter((c) => c.pais == p.id)
            return (<GameComp key={p.id} onPress={handleGamePress} pais={p} campeonatos={campeonatos} filterDate={filterDate} pesquisa={search} />)
            
            })}
          
        </GamesContainerArea>
        
      </Container>
    );
  }
  
export default HomeScreen;