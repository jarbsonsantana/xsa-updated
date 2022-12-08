import React, {useState} from 'react';
import { Container, Text, Card, TextInput, BtnArea, BtnText } from './styles';
import {changePassword} from '../../services/API'

function ChangePasswordScreen() {

    const [actualPass,setActualPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const handlePasswordChangeBtn = async() => {

      let result = await changePassword(actualPass,newPass,confirmation);
      alert(result.message);


    }
    return (
      <Container>
        <Card>
          <Text>Senha Atual</Text>
          <TextInput secureTextEntry value={actualPass} onChangeText={text => setActualPass(text)} />
          <Text>Nova Senha</Text>
          <TextInput secureTextEntry value={newPass} onChangeText={text => setNewPass(text)} />
          <Text>Repita a senha</Text>
          <TextInput secureTextEntry value={confirmation} onChangeText={text => setConfirmation(text)} />
          <BtnArea onPress={handlePasswordChangeBtn}>
            <BtnText> Alterar senha </BtnText>
          </BtnArea>
        </Card>
        
      </Container>
    );
  }
  
export default ChangePasswordScreen;