import React, {useState, useEffect} from 'react';
import { Container,AddClientArea,AddButton,TextInput, Text,Icon,TextBtn, ClientsList, DeleteButton, ClientCard, ClientInfo, ClientAction } from './styles';

import {getClientes, addClient, deleteClient} from '../../services/API'
import AddClientModal from '../../components/AddClientModal';
import { B } from '../Caixa/styles';
import {Alert} from 'react-native';

import LoadingModal from '../../components/LoadingModal';

function ClientsScreen() {

  const [clients,setClients] = useState([]);
  const [userName, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(()=>{
    const myClients = async () => {
      let result = await getClientes();
      setClients(result.clientes);
    }
    myClients();
  },[])

  const handleDelete = async (id) => {

    Alert.alert(
      "Atenção",
      "Tem certeza que deseja deletar este cliente?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: async () => {
          let data = await deleteClient(id);
          if (data.result == 0) {
            alert(data.result)
          } 
          setClients(data.clientes);
        } }
      ]
    );
    return; 


  }

  const handleBtnClick = async () => {
    setShowModal(true);
  } 

  const [showModal, setShowModal ] = useState(false);
  const handleCbClient = (r,p) => {
      setShowModal(false);
      setClients(r.clientes);
  }
  return (
      <Container>
        <LoadingModal show={isLoading} />
        <AddClientModal requestClose={()=>{setShowModal(false)}} show={showModal} cbClient={handleCbClient} />
        <ClientsList>

        {clients.map((c)=>{
          return(<ClientCard key={c.id}>
            <ClientInfo>
              <Text> 
                <Icon name="user" size={14} /><B>{c.nome}</B>
              </Text>

              <Text> 
                <Icon name="phone" size={14} /> {c.celular ?? ''}
              </Text>

            </ClientInfo>
            <ClientAction>
              <DeleteButton onPress={() => {handleDelete(c.id)}}>
                <Icon name="delete" size={18} />
                <TextBtn></TextBtn>
              </DeleteButton>
              
            </ClientAction>
            
          </ClientCard>)
        })}
       </ClientsList>

        <AddClientArea>
         <AddButton onPress={handleBtnClick}>
                <Icon name="adduser" size={18}  />
                <TextBtn> Adicionar Cliente </TextBtn>
              </AddButton>
        </AddClientArea>
      </Container>
    );
  }
  
export default ClientsScreen;