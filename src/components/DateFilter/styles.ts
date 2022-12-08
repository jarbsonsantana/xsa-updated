import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons';

export const AreaDate = styled.View`
    width: 100%;
    height: 90px;
    flex-direction: row;
    justify-content: space-between;
    background-color: #090E11;
    margin-bottom: 20px;
`;

export const Icon = styled(Ionicons)`
    color: white;
    margin-bottom: 8px;
`


export const AreaButton = styled.TouchableOpacity`
    flex: 1;
    margin: 5px;
    padding: 10px 5px;
    
    height: auto;
    background-color: ${(props) => props.active ? '#666' : '#333'};
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    
`;
export const AreaButtonText = styled.Text`
    color: #ffffff;
    text-align: center;
    width: 100%;
    font-size: 7px;
`
export const AreaButtonTitle = styled.Text`
    font-weight: bold;
    font-size: 10px;
    color: #ffffff;
`