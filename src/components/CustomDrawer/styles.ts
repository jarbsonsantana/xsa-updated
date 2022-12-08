import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fefefe;
`;

export const UserInfo = styled.SafeAreaView`
    padding-top: 28px;
    justify-content: center;
    align-items: center;
    background-color: #1a7ab0;
    padding-bottom: -1px;
`;

export const Avatar = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 35px;

`;

export const UserName = styled.Text`
    font-weight: bold;
    margin-top: 12px;
    font-size: 14px;
    color: white;
`;
export const UserEmail = styled.Text`
    margin-top: 2px;
    font-size: 12px;
    color: #eee;
`;

export const Text = styled.Text`
font-weight: normal;
color: white;
`;

export const Saldo = styled.View`
    margin-top: 16px;
    background-color: #1a7ab0;
    border: 1px dashed white;
    padding: 8px 16px;
    border-radius: 10px;
    margin-bottom: 2px;
    
`;
export const SaldoTitle = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: white;
`;
