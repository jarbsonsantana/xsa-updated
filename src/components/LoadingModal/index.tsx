import React, {useState} from 'react'

import {Modal, ModalDiv, ModalBox, Text, Overlay} from './styles';
import {ActivityIndicator} from 'react-native'


const LoadingModal = ({show}) => {


    return (     
        <Modal
        animationType="fade"
        transparent={true}

        visible={show}
        >
        <ModalDiv>
            <Overlay />
            <ModalBox>
                <ActivityIndicator color="white" size="large" style={{marginBottom: 20}} />
                <Text>Carregando...</Text>
            </ModalBox>
        </ModalDiv>
    </Modal>
    )
}

export default LoadingModal;