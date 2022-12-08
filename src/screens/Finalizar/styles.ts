import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.View`
background-color: #111;
flex: 1;
`;
export const Text = styled.Text`
    color: ${({bg}) => bg ?? 'black'};
`;
export const B = styled.Text`
    font-weight: bold;
`;
export const BilheteArea = styled.ScrollView`
    margin: 20px;
`;

export const Bilhete = styled.View`
    width: 100%;
    border: 1px solid #111;
    margin-top: 10px;
`;
export const BHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: #414141;
    align-items: center;
    height: 40px;
    padding-left: 10px;
    
`;
export const Btitle = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: white;
    max-width: 80%;
`;
export const BButton = styled.TouchableOpacity`

    background-color: red;
    height: 40px;
    justify-content: center;
    align-items: center;
    width: 50px;
    border-left-width: 4px;
    border-color: #111;
`;

export const BBody = styled.View`
    padding: 10px;
    background-color: #ddd;
    margin-top: 4px;
    
`;

export const BIcon = styled(AntDesign)`
color: white;
font-weight: bold;
`;

export const ApostaArea = styled.View`
    width: 100%;
    height: 70px;
    flex-direction: row;
    background-color: #fefefe;
    justify-content: center;
    align-items: center;
`;

export const ApostaButtonArea = styled.View`
    width: 100%;
    height: 70px;
    flex-direction: row;
    background-color: #fefefe;
    justify-content: space-around;
    align-items: center;
`;


export const View = styled.View`
    flex:${({flex}) => flex ? flex : 1};
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: ${({bg})=>bg ? bg : '#fefefe'};
`;

export const TextInput = styled.TextInput`
    background-color: #fff;
    width: 90px;
    padding: 0;
    padding-left: 5px;
    height: 50px;
    font-size: 16px;
`;

export const ActionButton = styled.TouchableOpacity`
    width: 100px;
    height: 50px;
    background-color: ${({bg})=>bg ? bg : 'red'};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

export const TextCenter = styled.Text`
    text-align: center;
    font-weight: bold;
    color: white;
`;

