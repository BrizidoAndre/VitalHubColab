import { useState } from "react";
import { Button } from "../button/button";
import { ButtonTitle } from "../button/buttonTitle";
import { ModalContainer, RowContainer, Container, InputContainer, BottomCancelContainer, BottomRowButtonContainer } from "../container/style";
import { InputLabel } from "../input/inputLabel";
import { LinkBlueSmall } from "../links/links";
import { Label, Mont20600, Mont24600, Sand14500Gray, Sand16500, Sand16600, Title } from "../title/title";
import { BottomModal, GrayBackground, ImageProfile, ModalCancel, ModalConfirmAppointment, ModalMedRecord, TextCenter, TrueModal } from "./styles";
import { AppointmentButton } from "../navButton/navButton";

// import das bibliotecas
import { Camera } from "expo-camera";
import { Ionicons, Entypo } from "@expo/vector-icons";


export const CancelAppointment = ({ hideModal = false, onPressCancel = null, onPress=null }) => {


    if (!hideModal) {
        return (<>
        </>)
    }
    return (
        <GrayBackground>
            <ModalCancel>
                <ModalContainer>
                    <Mont20600>Cancelar consulta</Mont20600>
                    <Sand16500>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</Sand16500>
                    <Button onPress={onPress}>
                        <ButtonTitle>CONFIRMAR</ButtonTitle>
                    </Button>
                    <LinkBlueSmall onPress={onPressCancel}>Cancelar</LinkBlueSmall>

                </ModalContainer>
            </ModalCancel>
        </GrayBackground>
    )
}

export const ShowRecord = ({ item = null, hideModal = false, onPressCancel = null, onPressNavigate = null }) => {

    if (!hideModal) {
        return (<>
        </>)
    }
    return (
        <GrayBackground>
            <ModalMedRecord>
                <ModalContainer>
                    <ImageProfile source={item.image} />
                    <Mont20600>{item.name}</Mont20600>
                    <RowContainer>
                        <Sand16500>{item.age} anos</Sand16500>
                        <Sand16500>{item.email}</Sand16500>
                    </RowContainer>
                    <Button onPress={onPressNavigate}>
                        <ButtonTitle>INSERIR PRONTUÁRIO</ButtonTitle>
                    </Button>
                    <LinkBlueSmall onPress={onPressCancel}>Cancelar</LinkBlueSmall>

                </ModalContainer>
            </ModalMedRecord>
        </GrayBackground>
    )
}


export const CreateAppointment = ({ hideModal, onPressCancel, onPress }) => {





    if (!hideModal) {
        return (
            <></>
        )
    }


    return (
        <GrayBackground>
            <BottomModal>
                <Container>
                    <Title>Agendar Consulta</Title>
                    <InputContainer>
                        <AppointmentLevel />

                        <InputLabel
                            title={'Informe a localização desejada'}
                            placeholder={"Ex: São Paulo"} />
                    </InputContainer>

                    <BottomCancelContainer>
                        <Button onPress={onPress}><ButtonTitle>CONTINUAR</ButtonTitle></Button>
                        <LinkBlueSmall onPress={onPressCancel}>Cancelar</LinkBlueSmall>
                    </BottomCancelContainer>
                </Container>

            </BottomModal>
        </GrayBackground>
    )
}

export const AppointmentLevel = ({ selectedInput = null }) => {

    const [appointmentLevel, setAppointmentLevel] = useState({
        exam: false,
        urgent: false,
        routine: false
    })

    return (
        <>
            <Label>Qual o nível da consulta</Label>
            <RowContainer>
                <AppointmentButton
                    selected={appointmentLevel.routine}
                    buttonTitle={'Rotina'}
                    onPress={() => setAppointmentLevel({ routine: true })} />

                <AppointmentButton
                    selected={appointmentLevel.exam}
                    buttonTitle={'Exame'}
                    onPress={() => setAppointmentLevel({ exam: true })} />

                <AppointmentButton
                    selected={appointmentLevel.urgent}
                    buttonTitle={'Urgência'}
                    onPress={() => setAppointmentLevel({ urgent: true })} />
            </RowContainer>
        </>
    )
}


export const DoctorAppointment = ({ item = null, hideModal = false, onPressCancel = null, onPressNavigate = null }) => {

    if (!hideModal) {
        return (<>
        </>)
    }
    return (
        <GrayBackground>
            <ModalMedRecord>
                <ModalContainer>
                    <ImageProfile source={item.image} />
                    <Mont20600>{item.name}</Mont20600>
                    <RowContainer>
                        <Sand16500>{item.specialty}</Sand16500>
                        <Sand16500>CRM-{item.CRM}</Sand16500>
                    </RowContainer>
                    <Button onPress={onPressNavigate}>
                        <ButtonTitle>VER LOCAL DA CONSULTA</ButtonTitle>
                    </Button>
                    <LinkBlueSmall onPress={onPressCancel}>Cancelar</LinkBlueSmall>

                </ModalContainer>
            </ModalMedRecord>
        </GrayBackground>
    )
}

export const ConfirmAppointment = ({ item, hideModal, setHideModal = null, navigation }) => {

    if (!hideModal) {
        return (
            <></>
        )
    }

    return (
        <GrayBackground>
            <ModalConfirmAppointment>
                <ModalContainer>
                    <Mont24600>Agendar Consulta</Mont24600>

                    <TextCenter>Consulte os dados selecionados para sua consulta</TextCenter>

                    <InputContainer>
                        <Sand16600>Data da Consulta</Sand16600>
                        <Sand14500Gray>{item.data}</Sand14500Gray>
                        <Sand16600>Médico da consulta</Sand16600>
                        <Sand14500Gray>{item.doctor.name}</Sand14500Gray>
                        <Sand14500Gray>{item.doctor.specialty}</Sand14500Gray>
                        <Sand16600>Data da Consulta</Sand16600>
                        <Sand14500Gray>{item.location}</Sand14500Gray>
                        <Sand16600>Data da Consulta</Sand16600>
                        <Sand14500Gray>{item.kind}</Sand14500Gray>
                    </InputContainer>

                    <Button onPress={() => navigation.navigate("Home")} >
                        <ButtonTitle>CONFIRMAR</ButtonTitle>
                    </Button>
                    <LinkBlueSmall onPress={() => setHideModal(false)}>Cancelar</LinkBlueSmall>

                </ModalContainer>
            </ModalConfirmAppointment>
        </GrayBackground>
    )
}



export const CameraModal = ({ openModal, setOpenModal, cameraRef, capturePhoto }) => {




    return (
        <TrueModal
            presentationStyle={"pageSheet"}
            statusBarTranslucent={true}
            animationType="slide"
            transparent={false}
            visible={openModal}>
            <Camera
                type={Camera.Constants.Type.back}
                style={{ width: "100%", height: "80%", flex: 1, position: "relative" }}
                ratio={'16:9'}
                ref={cameraRef} />
            <BottomRowButtonContainer>
                <Entypo name="arrow-with-circle-left" size={48} color="white" onPress={()=> setOpenModal(false)} />
                <Entypo name="circle" size={48} color="white" onPress={() => capturePhoto()} />
            </BottomRowButtonContainer>

        </TrueModal>
    )
}