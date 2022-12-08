import styled from 'styled-components/native';
import { Entypo, SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    background-color: #111;
`;
export const ScrollView = styled.ScrollView`
flex: 1;
width: 100%;
`;

export const FAIcon = styled(FontAwesome5)`
    color: #fefefe;
    margin-right: 10px;
    `

export const SimpleLineIcon = styled(SimpleLineIcons)`
    color: #fefefe;
    margin-right: 10px;
`

export const EntypoIcon = styled(Entypo)`
    color: #fefefe;
    margin-right: 10px;

`;

export const Text = styled.Text`
    color: white;
    font-size:16px;
`;

export const Card = styled.View`
    background-color: ${({type}) => {
        switch(type) {
            case 'primary':
                return '#23527C';
                break;
            case 'danger':
                return 'red';
                break;
            case 'success':
                return 'green';
                break;
            default: 
                return '#23527C';
                break;
        }
    }};
    width: 100%;
    padding: 10px 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
`;

export const CardGray = styled.View`
    background-color: gray;
    width: 100%;
    padding: 10px 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
`;
export const CardBlue = styled.View`
    background-color: #23527C;
    width: 100%;
    padding: 10px 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
`;
export const CardRed = styled.View`
    background-color: gray;
    width: 100%;
    padding: 10px 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
`;

export const B = styled.Text`
    font-weight:bold;
    font-size:14px;
`;
