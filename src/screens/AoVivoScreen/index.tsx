import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native'
import { Container, GamesContainerArea, Text, SearchContainer, SearchInput, AreaDate, AreaButton, AreaButtonText, AreaButtonTitle } from './styles';
import { diffServerTimeValidate, getJogos } from '../../services/API';
import GameComp from '../../components/Game';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateFilter from '../../components/DateFilter';


import { UseAoVivo } from '../../hooks/useAoVivo';


function AoVivoScreen() {

    const [aoVivo, getAoVivoGames] = UseAoVivo();

    getAoVivoGames();


    const navigation = useNavigation();

    const [apostasFeitas, setApostasFeitas] = useState([]);

    const [games, setGames] = useState({});
    
    const [loading,setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [search2, setSearch2] = useState('');
    const [filterDate, setFilterDate] = useState('');
 
    useEffect(()=>{
      const getGamesData = async () => {
          
          let result = await getJogos();
          setGames(result);
          await AsyncStorage.setItem('@diccotacoes', JSON.stringify(result.cotacoes));
          setLoading(false);
          diffServerTimeValidate();

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

    const handleGamePress = (game) => {
      navigation.navigate('Campeonato',{game: game})
    }

    const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
   

    const handleDatePress = (date) => {
      navigation.navigate('CampeonatoComFiltro',{game: games, date: date})
    }
   
    return (
      <Container>
       
        <SearchContainer>
          <SearchInput placeholderTextColor='#828689' placeholder="Pesquisar..." value={search} onChangeText={(t)=>{setSearch(t)}} />
        </SearchContainer> 
        <GamesContainerArea contentContainerStyle={{marginTop: 10, paddingBottom: 100}}>

          <DateFilter onPress={handleDatePress}/>
          {/* (date)=>{setFilterDate(date)} */}
          {getPaises().map((p)=>{
            
            let campeonatos = games.campeonatos.filter((c) => c.pais == p.id)
            return (<GameComp key={p.id} onPress={handleGamePress} pais={p} campeonatos={campeonatos} filterDate={filterDate} pesquisa={search} />)
            
            })}
          
        </GamesContainerArea>
        
      </Container>
    );
  }
  
export default AoVivoScreen;