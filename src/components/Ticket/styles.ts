import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;

`;
export const TextRotated = styled.Text`
    text-align: center;
    transform:rotate(-90deg);
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-left: 20px;
   
`;
export const TouchableOpacityIcon = styled.TouchableOpacity``;

export const Cod = styled.Text`
    font-size: 16px;
    letter-spacing: 4px;
    color: white;
    font-weight: bold;
`;

export const Modal = styled.Modal`
    margin: 20px;
    background-color: white;
    border-radius: 20px;
    padding: 35px;
    align-items: center;
    elevation: 5;
`;


export const Icon = styled(Entypo)`
    color: #eee;
    margin: 0;
    padding-left: 10px;

`;
export const CardInfo = styled.View``;
export const CardInfoIcon = styled.View`
    
    flex: 1;
    flex-direction:row;
`;

export const Text = styled.Text`
    color: #fff;
    font-weight: normal;
`;
export const B = styled.Text`
    font-weight:bold; 
`;
export const CardArea = styled.View``;

export const Card = styled.TouchableOpacity`
    background-color: #333;
    border-radius: 10px;
    width: 100%;
    padding: 20px;
    margin: 0;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color: ${({status}) => {
        switch(status) {
            case 'success':
                return 'green';
            case 'info':
                return 'green';
            case 'danger':
                return 'red'
            case 'default':
                return '#212121';
            default:
                return '#444';
        }
    }};
`;

export const TextInput = styled.TextInput`
    border: 1px solid #fff;
    background-color: white;
    padding: 10px;
    height: auto;
    font-size: 18px;
    border: 1px solid #aaa;
`
export const Button = styled.TouchableOpacity`

    background-color: green;
    padding: 10px 20px;
    margin: 10px;
    margin-top: 20px;
    padding-top: 20px;
    border-radius: 5px; 
`