import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

export const HeaderIcon = styled(Ionicons)`
    color: #333333;
`;
export const Container = styled.View`
    background-color: #333;
`;
export const Text = styled.Text``;
export const Row = styled.View`
    width: 100%;
    background-color: darkgrey;
    height: 70px;
    padding: 10px 20px;
    flex-direction: row;
`;
export const ScrollView = styled.ScrollView`
    width: 100%;
    height: 100%;
`;
export const RowTitle = styled.View`
    width: 100%;
    background-color: #333333;
    height: 40px;
    padding: 10px 20px;
`;

export const ScreenTitle = styled.View`
    width: 100%;
    background-color: white;
    flex-direction: row;
    elevation: 3;
    padding: 10px 20px;
    align-items: center;
    padding-top: 30px;
    margin-bottom: 5px;
`;

export const Th = styled.View`
    width: 100%;
    background-color: #000;
    height: 30px;
    flex-direction: row;
    align-items: center;
    padding: 0 20px;
`;
export const Td = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
export const TdLeft = styled.View`
    flex: 1;
    flex-direction: row;
    

`;

export const TitleTable = styled.Text`
color: gold;
font-weight: bold;
text-align: left;

`

export const Title = styled.Text`
    color: #333333;
    font-size: 18px;
`;

export const GameTitle = styled.Text`
    color: #fefefe;
    font-size: 14px;
    font-weight: bold;
`;
export const GameDetails = styled.Text`
    color: #fefefe;
    font-size: 12px;
`;

export const CotacaoBtn = styled.View`
    padding: 5px 10px;
    height: 30px;
    width: 60px;
    justify-content: center;
    align-items: center;

`;

export const ButtonFinalizar = styled.TouchableOpacity`
    flex: 1;
    padding: 5px 10px;
    background-color: gold;
    height: 45px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;
export const ButtonImprimir = styled.TouchableOpacity`
    width: 40px;
    margin-right: 5px;
    padding: 5px 5px;
    background-color: #fefeef;
    height: 45px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;


export const FinalizarTxt = styled.Text`
    font-weight: bold;
    font-size: 12px;

`;



export const InputValor = styled.TextInput`
    background-color: white;
    flex: 1;
    border-radius: 5px;
    margin-right: 10px;
    padding-left: 10px;
    height: 45px;
`;

export const Button = styled.TouchableOpacity`
    padding-left: 5px;
    padding-right: 5px;
`;
export const GameArea = styled.View`
    flex-direction: column;
`;