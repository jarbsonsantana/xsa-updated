import styled from 'styled-components/native';
import {Picker} from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

export const IconDate = styled(MaterialIcons)`
color: white;
margin-right: 10px;
`
export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    background-color: #111;
`;

export const MainCard = styled.View`
    background-color: #444;
    width: 100%;
    margin-top: 5px;
`;

export const MainButton = styled.TouchableOpacity`
    width: 100%;
    margin-top: 5px;
    height: 40px;
    background-color: #2E8BC0;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;
export const TextWhite = styled.Text`
    font-size: 16px;
    color: white;
`;

export const Card = styled.TouchableOpacity`
    background-color: #444;
    margin-top: 5px;
    flex: 1;
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const CardResult = styled.View`
    background-color: #444;
    margin-top: 5px;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-between;
    align-items:center;
    flex-direction: row;
`;

export const TextDate = styled.Text`
    color: white;
    font-size: 16px;
`

export const Row = styled.View`
flex-direction: row;
`;

export const Select = styled(Picker)`
    background-color: white;
`;

export const Text = styled.Text`
    color: #fff;
`;
export const RowFull = styled.View`
    width: 100%;
    justify-content: space-around;
    flex-direction: row;
    padding-top: 10px;
    align-items: center;
`;
export const ButtonIcon = styled(MaterialIcons)`
    color: white;
`;
