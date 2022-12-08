import styled from 'styled-components';

export const Text = styled.Text`
font-size: 14px;
`;

export const Modal = styled.Modal`

display: flex;
justify-content: center;
align-items: center;

`;

export const TextInput = styled.TextInput`
    border: 1px solid #ccc;
    width: 100%;
    height: 40px;
    margin-top: 10px;
    padding-left: 10px;
    font-size:14px;
`;

export const Button = styled.TouchableOpacity`
    flex: 1;
    margin-top: 10px;
    background-color: ${({bg}) => bg ? bg : 'teal'};
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    margin-left: 3px;
    margin-right: 3px;
`

export const ModalDiv = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

`;

export const ModalBox = styled.View`
    width: 80%;
    height: auto;
    background-color: white;
    justify-content: center;
    align-items: center;
    elevation: 5;
    padding: 20px;
`;

export const ButtonArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;