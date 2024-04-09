import { useEffect, useState } from "react";
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

// import do axios
import api from "../../service/service";
import { userDecodeToken } from "../../utils/auth";


export const CancelAppointment = ({ hideModal = false, onPressCancel = null, onPress = null }) => {


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


export const CreateAppointment = ({ hideModal, onPressCancel, navigation }) => {


    const [appointmentLevel, setAppointmentLevel] = useState('Rotina')


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
                        <AppointmentLevel appointmentLevel={appointmentLevel} setAppointmentLevel={setAppointmentLevel} />

                        <InputLabel
                            title={'Informe a localização desejada'}
                            placeholder={"Ex: São Paulo"} />
                    </InputContainer>

                    <BottomCancelContainer>
                        <Button onPress={() => navigation.navigate('SelectClinic', {
                            appointmentLevel
                        }

                        )}
                        ><ButtonTitle>CONTINUAR</ButtonTitle></Button>
                        <LinkBlueSmall onPress={onPressCancel}>Cancelar</LinkBlueSmall>
                    </BottomCancelContainer>
                </Container>

            </BottomModal>
        </GrayBackground>
    )
}

export const AppointmentLevel = ({ selectedInput = null, appointmentLevel, setAppointmentLevel }) => {



    return (
        <>
            <Label>Qual o nível da consulta</Label>
            <RowContainer>
                <AppointmentButton
                    selected={appointmentLevel === 'Rotina'}
                    buttonTitle={'Rotina'}
                    onPress={() => setAppointmentLevel('Rotina')} />

                <AppointmentButton
                    selected={appointmentLevel === 'Exame'}
                    buttonTitle={'Exame'}
                    onPress={() => setAppointmentLevel('Exame')} />

                <AppointmentButton
                    selected={appointmentLevel === 'Urgência'}
                    buttonTitle={'Urgência'}
                    onPress={() => setAppointmentLevel('Urgência')} />
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
                    <Mont20600>{item.medicoClinica.medico.idNavigation.nome}</Mont20600>
                    <RowContainer>
                        <Sand16500>{item.medicoClinica.medico.especialidade.especialidade1}</Sand16500>
                        <Sand16500>CRM-{item.medicoClinica.medico.crm}</Sand16500>
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

export const ConfirmAppointment = ({ item, setItem, hideModal, setHideModal = null, navigation }) => {


    function prepareData(date) {
        return date.toLocaleDateString('default', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    // função para preparar o tempo da consulta para mostrar de maneira correta para o usuário
    function prepareTime(date){
        const time = date.toString(date)

        const rightText = time.substring(18,21)
        let rightHour = parseInt(time.substring(16,18)) + 3
        if(rightHour < 10){
            rightHour = '0' + rightHour
        }


        return rightHour + rightText
    }

    async function loadMedicClinic() {
        try {

            const res = await api.get('/Consultas/BuscarMedicoClinica?idMedico=' + item.medicoId + '&idClinica=' + item.clinicaId)

            const data = await res.data

            setItem({
                ...item,
                medicoClinicaId: data.id
            })


        } catch (e) {
            console.log('Erro na api');
            console.log(e)
        }
    }

    async function cadastrarConsulta() {
        try {
            let user = await userDecodeToken()

            const res = await api.post('/Consultas/Cadastrar', {
                situacaoId: "6B4217A2-4D62-4F85-AB4D-3AFB24BFBE04",
                pacienteId: user.id,
                medicoClinicaId: item.medicoClinicaId,
                receitaId: null,
                prioridadeId: item.prioridadeId,
                dataConsulta: item.dataConsulta,
                descricao: "Novo médico",
                diagnostico: "string",
            })

            const data = await res.data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (hideModal) {
            loadMedicClinic()
        }

        console.log(item.dataConsulta);
    }, [hideModal])


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
                        <Sand14500Gray>{prepareData(item.dataConsulta)} - {prepareTime(item.dataConsulta)}</Sand14500Gray>
                        <Sand16600>Médico da consulta</Sand16600>
                        <Sand14500Gray>{item.medico.idNavigation.nome}</Sand14500Gray>
                        <Sand14500Gray>{item.medico.especialidade.especialidade1}</Sand14500Gray>
                        <Sand16600>Local da Consulta</Sand16600>
                        <Sand14500Gray>{item.clinica.endereco.numero} {item.clinica.endereco.logradouro}, {item.clinica.endereco.cidade}</Sand14500Gray>
                        <Sand16600>Tipo da Consulta</Sand16600>
                        <Sand14500Gray>{item.prioridade}</Sand14500Gray>
                    </InputContainer>

                    <Button onPress={() => {
                        cadastrarConsulta()
                        navigation.navigate("Home")
                    }} >
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
                <Entypo name="arrow-with-circle-left" size={48} color="white" onPress={() => setOpenModal(false)} />
                <Entypo name="circle" size={48} color="white" onPress={() => capturePhoto()} />
            </BottomRowButtonContainer>

        </TrueModal>
    )
}