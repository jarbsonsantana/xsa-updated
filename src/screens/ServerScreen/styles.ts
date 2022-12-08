import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Text = styled.Text`
    font-size:24px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 15px rgba(0, 0, 0, 0.75);
    letter-spacing: 2px;
`;
export const ButtonText = styled.Text`
    font-size:16px;
    font-weight: normal;
    color: white;
    text-align: center;
    letter-spacing: 1.5px;

`;

export const Input = styled.TextInput`
    background-color: rgba(0,0,0,0.85);
    border-radius: 5px;
    margin-top: 16px;
    width: 80%;
    height: 45px;
    text-align:center;
    color: white;
    text-shadow: -1px 1px 10px rgba(0, 0, 0, 0.75);
    font-size: 16px;
    letter-spacing: 1.5px;
`;

export const Button = styled.TouchableOpacity`
    margin-top: 16px;
    background-color: green;
    width: 80%;
    text-align: center;
    padding: 16px 8px;
    border-radius: 5px;
    box-shadow: -1px 1px 500px rgba(255, 255, 255, 0.75);
    
`;
