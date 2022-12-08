import React, {useState} from 'react'

import {Modal, ModalDiv, ModalBox, Text, Overlay} from './styles';
import {ActivityIndicator} from 'react-native'


const ProcessingModal = ({show, text}) => {


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
                <Text>{text}</Text>
            </ModalBox>
        </ModalDiv>
    </Modal>
    )
}

export default ProcessingModal;