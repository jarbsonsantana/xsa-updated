import React, {useState, useEffect} from 'react'

import {Modal, ModalDiv, ModalBox, Text, TextInput, Button, ButtonArea} from './styles';
import { Picker } from '@react-native-picker/picker';

import { addClient, getClientes, insertClient } from '../../services/API';
import { View } from 'react-native';

const AddOrSelectClientModal = ({show, cbClient, requestClose}) => {

    const [showModal, setShowModal] = useState(show);
    const [clients, setClients] = useState([]);
    const [clientSelected, setClientSelected] = useState(0);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');


    useEffect(()=>{

        const getClients = async () => {
            let _clients = await getClientes();
            
            setClients(_clients.clientes);
            console.log('Clientes: ', clients);
        }

        getClients();

    }, [])



    const addClientAction = async () => {
        if (name == '') {
            alert('Digite um nome para o cliente');
            return
        } 

            var response = await insertClient(name, phone);

        
        if (response.result == 1) {
            setName('');
            setPhone('');
            setClients(response.clientes);
            setClientSelected(response.id);
            alert('Cliente adicionado e já selecionado. Clique em "Aprovar".');
            //cbClient(response);

        }
        
        console.log('clientResponse:', response)
    }

    const handleClientSelected = (itemValue) => {
        setClientSelected(itemValue)

        let response = {
            id: itemValue,
            clientes : clients
        };
        //cbClient(response);
    }

    const callBackAdd = () => {
        if (clientSelected == 0) {
            alert('Selecione um cliente');
            return;
        } 

        let response = {
            id: clientSelected,
            clientes: clients
        }

        cbClient(response);
    }



    return (     
        <Modal
        animationType="slide"
        transparent={true}
        visible={show}
    >
        <ModalDiv>
            <ModalBox>
            <Text> Selecione um cliente  </Text>
            <View style={{alignItems: 'flex-start'}}>
                <Picker 
                        mode="dialog"
                        accessibilityLabel="Client Picker"
                        prompt="Selecione um cliente"
                        dropdownIconColor="grey"
                        style={{width: 250, backgroundColor: '#eee',  height: 50, marginTop: 10, marginBottom: 10}}
                        selectedValue={clientSelected}
                        onValueChange={(itemValue, itemIndex) => handleClientSelected(itemValue)}
                        >
                        <Picker.Item 
                        label="Selecione o Cliente" 
                        value="0"
                        style={{width: 200, color: 'black'}}
                        />
                        {clients && clients.map((c) =><Picker.Item 
                            key={c.id}
                            label={c.nome} 
                            value={c.id}
                            style={{backgroundColor: 'cyan'}}
                        /> )
                        
                        }
                </Picker>
                </View>
                <Text> Ou adicione um novo Cliente </Text>
                <TextInput value={name} onChangeText={(t)=>setName(t)} placeholder="Nome do Cliente" />
                <TextInput keyboardType="phone-pad" value={phone} onChangeText={(p)=>setPhone(p)} placeholder="Telefone" />
                <ButtonArea>
                    
                    <Button onPress={addClientAction}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}> Adicionar Cliente </Text>
                    </Button>
                </ButtonArea>

                <ButtonArea>
                    <Button bg={'#eee'} onPress={() => { requestClose() }}>
                        <Text style={{color: '#111', fontWeight: 'bold'}}> Cancelar </Text>
                    </Button>
                    <Button bg={"green"} onPress={callBackAdd}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}> Aprovar </Text>
                    </Button>
                </ButtonArea>
            </ModalBox>
        </ModalDiv>
    </Modal>
    )
}

export default AddOrSelectClientModal;