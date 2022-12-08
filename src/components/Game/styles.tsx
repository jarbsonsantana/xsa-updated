import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const GamesContainerArea = styled.ScrollView`
    width: 100%;
    padding: 20px;
`;

export const CampeonatosArea = styled.View`

    display: ${({display}) => !display ?'none':'flex'};
    margin-bottom: 20px;
    margin-top: -10px;

`;

export const PaisImg = styled.Image`
    width: 30px;
    height: 30px;
    margin-right: 30px;
    margin-left: 10px;
    border-radius: 10px;
`;
export const GameArea = styled.View``;

export const Game = styled.TouchableOpacity`
    display: flex;
    height: 46px;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    elevation: 2;
    background-color: #33383B;
    margin-bottom: 10px;
    flex-direction: row;
`;
export const SubGame = styled.TouchableOpacity`
    display: flex;
    height: 40px;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    background-color: #131C21;
    margin-top: 8px;
    elevation: 2;
    flex-direction: row;
    justify-content: space-between;
`;
export const RoundedArea = styled.View`
    background-color: #555;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`
export const Text = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: white;
`;
export const SubGameText = styled.Text`
    font-size: 16px;
    color: white;
`;