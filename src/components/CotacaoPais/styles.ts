import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

export const Icon = styled(Ionicons)`
    color: #333333;
`;
export const Container = styled.View``;
export const Text = styled.Text``;
export const Row = styled.View`
    width: 100%;
    background-color: darkgrey;
    height: 70px;
    padding: 10px 20px;
    flex-direction: row;
`;
export const RowTitle = styled.View`
    width: 100%;
    background-color: blue;
    height: 50px;
    padding: 10px 20px;
    flex-direction: row;
    align-items: center;
    margin-top: 2px;
`;
export const TO = styled.TouchableOpacity`

`;


export const CotacaoBtn = styled.TouchableOpacity`
    padding: 5px 10px;
    background-color: ${(props) => props.selected? 'gold': '#eee'};
    height: 30px;
    width: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const Locked = styled.View`
    padding: 5px 10px;
    background-color: #aaa;
    height: 30px;
    width: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;


export const CotacaoTxt = styled.Text`
    color: #333;
`;

export const Title = styled.Text`
    color: #333333;
    font-size: 18px;
`;

export const GameTitle = styled.Text`
    color: #fefefe;
    font-size: 13px;
    font-weight: bold;
`;
export const GameDetails = styled.Text`
    color: #fefefe;
    font-size: 12px;
`;



export const InputValor = styled.TextInput`
    background-color: white;
    width: 100px;
    border-radius: 10px;
    height: 40px;
`;

export const Button = styled.TouchableOpacity`
    padding-left: 5px;
    padding-right: 5px;
`;
export const GameArea = styled.View`
    flex-direction: row;
    flex: 1;
    align-items: center;
`;
export const Image = styled.Image`
    width: 25px;
    height: 25px;
    margin-right: 20px;
`;


export const CotacaoArea = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
`;
export const SeeMoreBtn = styled.TouchableOpacity`

`;