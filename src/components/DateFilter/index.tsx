import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import { diffServerTimeValidate } from '../../services/API';
import { AreaButton, AreaButtonText, AreaButtonTitle, AreaDate, Icon } from './styles';

export const DateFilter = ({onPress, isLive, buttonsToShow}) => {

    const semana = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    let anotherDate = new Date();
    anotherDate.setDate(anotherDate.getDate()+2);

    
    const [activeDate, setActiveDate] = useState('');
    const [currentFilter, setCurrentFilter] = useState('');
    const [serverDate, setServerDate] = useState(null);

    const [dataToRender, setDataToRender] = useState<any>(null);

    function showBtn(btnTitle) { 
        return (buttonsToShow.indexOf(btnTitle) > -1);
    }

    useEffect(()=>{
        const populateDate = async () => {
            let result = await fetch('https://api-cs1.123bet.com.br/cs-games.php?now-time')
            .then((response) => response.text());
    
            let _date = (parseInt(result)-60*60*4)*1000;
            setServerDate(_date);
        }
        const getServerData = async  () => {
            let _serverData =  await AsyncStorage.getItem('@serverData') || '{}';
            let __serverData = JSON.parse(_serverData);
            setDataToRender(__serverData);
          }

        getServerData();
        populateDate();
    }, [])

    

    const returnDate = (str) => {
    
            // let _date = new Date((parseInt(dateEpoch)*1000)-(60*60*3*1000));
            let _date = new Date(serverDate);
            console.log('svDate: ',_date);


        switch(str) {
            case 'today': 
            return  _date.toISOString().substring(0, 10);
            case 'tomorow':
                 _date = new Date(serverDate);
                _date.setDate(_date.getDate()+1);
                return  _date.toISOString().substring(0, 10)
            case 'after-tomorow':
                 _date = new Date(serverDate);
                _date.setDate(_date.getDate()+2);
                return  _date.toISOString().substring(0, 10)
            default:
                return null;

        }
    }


    const handlePress = (date, description = null) => {
        if (date == 'online') {
            return onPress('online');
        }
        return onPress(returnDate(date), description)
    }
    console.log(dataToRender);

    if (!isLive) {
        return (
            <AreaDate>
                {showBtn('hoje') && 
                <AreaButton active={currentFilter == 'today'} onPress={()=>{handlePress('today', 'HOJE')}}>
                    <Icon name="calendar-outline" size={20} />
                  <AreaButtonText>Jogos de</AreaButtonText>
                  <AreaButtonTitle>HOJE</AreaButtonTitle>
                </AreaButton>
                }
                {showBtn('amanha') && 
                <AreaButton active={currentFilter == 'tomorow'} onPress={()=>{handlePress('tomorow', 'AMANHÃ')}}>
                    <Icon name="calendar-outline" size={20} />
                  <AreaButtonText>Jogos de</AreaButtonText>
                  <AreaButtonTitle>AMANHÃ</AreaButtonTitle>
                </AreaButton>
                }
                {showBtn('depoisdeamanha') &&
                <AreaButton active={currentFilter == 'after-tomorow'} onPress={()=>{handlePress('after-tomorow', semana[anotherDate.getDay()])}}>
                  <Icon name="calendar-outline" size={20} />
                  <AreaButtonText>Jogos de</AreaButtonText>
                  <AreaButtonTitle>{semana[(anotherDate.getDay())]}</AreaButtonTitle>
                </AreaButton>
                }

                {showBtn('todos') &&
                <AreaButton active={currentFilter == ''} onPress={()=>{/*handlePress('all', 'TODOS')*/}}>
                  <Icon name="calendar-outline" size={20} />
                  <AreaButtonText>Todos os</AreaButtonText>
                  <AreaButtonTitle>JOGOS</AreaButtonTitle>
                </AreaButton>
    }
            </AreaDate>
        )
    } else {
        return (
            <AreaDate style={{height: 70}}>
                <AreaButton style={{height: 50}} active={currentFilter == 'today'} onPress={()=>{handlePress('online', 'HOJE')}}>    
                  <AreaButtonTitle>Todos os Jogos</AreaButtonTitle>
                </AreaButton>
            </AreaDate>
        )
    }
    
}

export default DateFilter;