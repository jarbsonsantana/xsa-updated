import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    background-color: #111;
`;

export const Text = styled.Text`
color: white;

`;
export const TicketsList = styled.ScrollView`
margin: 0;
padding: 0;
width: 100%;
`;

export const Button = styled.TouchableOpacity`

`;

export const Sumario = styled.View`
    width: 100%;
    background-color: #333;
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px;
`;

export const SumarioText = styled.Text`
font-size: 12px;
color: white;
`;
export const B = styled.Text`
font-weight: bold;
`;

export const Header = styled.View`
    width: 100%;
    height: 50px;
    background-color: #111;
    padding: 15px;
`;