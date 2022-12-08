import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #111;
`;

export const Card = styled.View`
    border-radius: 5px;
    background-color:#333;
    width: 100%;
    padding: 0px 20px;
`;
export const TextInput = styled.TextInput`
    height: 40px;
    background-color: #eee;
    border: 1px solid #fff;
    padding-left: 10px;
    border-radius: 5px;
`;

export const BtnArea = styled.TouchableOpacity`
    height: 50px;
    margin-top: 40px;
    margin-bottom: 20px;
    background-color: green;
    border-radius: 3px;
    justify-content: center;
    align-items: center;
`;


export const BtnText = styled.Text`
    font-size: 16px;
    color: white;
`;

export const Text = styled.Text`
    margin-top: 20px;
    margin-bottom: 5px;
    color: white;
`;
