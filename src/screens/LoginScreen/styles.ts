import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Logotipo = styled.Image`
    width: 200px;
    height: 200px;
`;

export const DefaultInput = styled.TextInput`
    width: 80%;
    margin-top: 12px;
    background-color: white;
    height: 45px;
    border-radius: 5px;
    padding: 0 16px;
`;

export const InputArea = styled.View`
    width: 100%;
    margin-top: 26px;
    justify-content: center;
    align-items: center;
`;

export const ButtonArea = styled.View`
    width: 85%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 26px;
    padding: 0 12px;
`;

export const Text = styled.Text`
    color: white;
`;

export const ButtonContainer = styled.TouchableOpacity`
    padding: 10px 20px;
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 0;
    justify-content: center;
    align-items: center;
    
    background-color: ${(props) => props.primary? 'green': 'gray'};
    border-radius: 5px;
`;
