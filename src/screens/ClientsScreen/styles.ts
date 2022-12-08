import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;  
    background-color: #111;
`;

export const ClientsList = styled.ScrollView`
    width: 100%;
`;
export const Icon = styled(AntDesign)`
    color: #ccc;
    margin: 0 5px;
`;

export const Text = styled.Text`
    color: white;
`;
export const ClientInfo = styled.View``;
export const ClientAction = styled.View``;

export const ClientCard = styled.View`
    background-color: #333;
    border: 1px solid #111;
    border-radius: 5px;
    width: 100%;
    padding: 5px 20px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 5px;
`;
export const TextBtn = styled.Text`
color: white;
`;
export const DeleteButton = styled.TouchableOpacity`
    flex-direction: row;
    background-color: red;
    border-radius: 5px;
    padding: 5px;
`;
export const AddButton = styled.TouchableOpacity`
    flex-direction: row;
    flex: 1;
    background-color: green;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 15px 10px;
`;

export const AddClientArea = styled.View`
    background-color: #111;
    width: 100%;
    padding: 20px 10px;
    flex-direction: row;
    justify-content: space-between;
`;
export const TextInput = styled.TextInput`
    background-color: white;
    height: 40px;
    flex: 1;
    margin-right: 20px;
    border-radius: 5px;
    font-size: 16px;
    padding-left: 10px;
`;