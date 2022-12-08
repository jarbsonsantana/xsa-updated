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

export const ButtonNoBG = styled.TouchableOpacity`
    margin-top: 20px;
    justify-content: flex-end;
    align-items: flex-end;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;

`

export const Category = styled.View`
    background-color: #ccc;
    padding: 10px;
    margin-top: 10px;
    width: 100%;
`;
export const Item = styled.View`
    background-color: #333;
    padding: 10px;
    margin-top: 1px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
export const LineText = styled.Text`
    color: #fafafa;
    max-width: 80%;
`;


export const ModalDiv = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

`;

export const ModalBox = styled.View`
    width: 100%;
    height: 100%;
    background-color: white;
    justify-content: flex-start;
    align-items: flex-start;
    elevation: 5;
    padding: 20px;

    background-color: #151515;
`;

export const ButtonArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
export const ScrollView = styled.ScrollView`
    width: 100%;
`;