import styled from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #090E11;
`;

export const GamesContainerArea = styled.ScrollView`
    width: 100%;
    margin-top: 5px;

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
    height: 40px;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
    elevation: 2;
    background-color: #fefefe;
    margin-bottom: 10px;
    flex-direction: row;
`;

export const Text = styled.Text`
    font-size: 16px;
`;

export const SearchContainer = styled.View`
    display:flex;
    width: 100%;
    height: 50px;
    margin: 20px;
    align-items: center;
    justify-content: center;
`;
export const SearchInput = styled.TextInput`
    width: 100%;
    height: 50px;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: #33383B;
    margin-top: 10px;
    border: 2px solid #1E2428;
    border-radius: 10px;
    color: white;
`;
export const AreaDate = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    justify-content: space-between;
`;
export const AreaButton = styled.TouchableOpacity`
    flex: 1;
    margin: 5px;
    padding: 10px;
    
    height: 50px;
    background-color: #333;
    align-items: center;
    border-radius: 10px;
`;
export const AreaButtonText = styled.Text`
    color: white;
    text-align: center;
    width: 100%;
    font-size: 10px;
`
export const AreaButtonTitle = styled.Text`
    font-weight: bold;
    font-size: 14px;
    color: #fefefe;
`

export const AoVivoContainer = styled.TouchableOpacity`
    background-color: ${(props) => props.selected ? 'gold' : 'grey'};
    flex: 1;
    margin: 0 10px;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 10px;
`;
export const AoVivoText = styled.Text`
    color: #333;
    font-weight: bold;
`;

export const AoVivoIcon = styled(Ionicons)`
`;

export const GameTypeContainer = styled.View`
flex-direction: row;
`;
