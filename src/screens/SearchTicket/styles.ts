import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    background-color: #111;
`;

export const Text = styled.Text`
    color: white;
    font-weight: bold;
    text-align: center;
`;
export const View = styled.View``;
export const BlackText = styled.Text``;

export const Card = styled.View`
    background-color: #444;
    border-radius: 5px;
    border: 1px solid #555;
    width: 100%;
    padding: 20px;
    margin: 5px;
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;   
`;

export const TextInput = styled.TextInput`
    border: 1px solid #fff;
    flex: 2;
    background-color: white;
    padding: 10px;
    height: auto;
    font-size: 18px;
    border: 1px solid #aaa;
`
export const Button = styled.TouchableOpacity`
    background-color: green;
    padding: 10px 15px;
    margin: 10px;
    border-radius: 5px; 
    flex: 1;
`

export const ButtonFull = styled.TouchableOpacity`
    width: 100%;
    background-color: green;
    padding: 15px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    border-radius: 5px; 
`;

export const ButtonWhite = styled.TouchableOpacity`
background-color: #333;
border: 2px solid #333;
padding: 8px 16px;
margin: 10px;
border-radius: 5px; 
flex-direction: row;
`
export const ButtonTextDark = styled.Text``;