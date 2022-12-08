import React, {useState} from 'react'

import {Modal, ModalDiv, ModalBox, Text, TextInput, Button, ButtonArea} from './styles';

import { addClient, insertClient } from '../../services/API';

const AddClientModal = ({show, cbClient, requestClose}) => {

    const [showModal, setShowModal] = useState(show);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');


    const addClientAction = async () => {
        if (name == '') {
            alert('Digite um nome para o cliente');
            return
        } 

            var response = await insertClient(name, phone);
            console.log(response);

        
        if (response.result == 1) {
            setName('');
            setPhone('');
            cbClient(response);
        } else {
            alert(response.message);
        }
        console.log('clientResponse:', response)
    }
    return (     
        <Modal
        animationType="slide"
        transparent={true}
        visible={show}
    >
        <ModalDiv>
            <ModalBox>
                <Text> Adicionar Cliente </Text>
                <TextInput value={name} onChangeText={(t)=>setName(t)} placeholder="Nome do Cliente" />
                <TextInput keyboardType="phone-pad" value={phone} onChangeText={(p)=>setPhone(p)} placeholder="Telefone" />
                <ButtonArea>
                    <Button bg={'#eee'} onPress={() => { requestClose() }}>
                        <Text style={{color: '#111', fontWeight: 'bold'}}> Cancelar </Text>
                    </Button>
                    <Button onPress={addClientAction}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}> Adicionar </Text>
                    </Button>
                </ButtonArea>
            </ModalBox>
        </ModalDiv>
    </Modal>
    )
}

export default AddClientModal;