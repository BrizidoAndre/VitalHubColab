import { useEffect, useRef, useState } from "react";
import { Button } from "../button/button";
import { ButtonTitle } from "../button/buttonTitle";
import { ModalContainer, RowContainer, Container, InputContainer, BottomCancelContainer, BottomRowButtonContainer, CameraPermissionContainer, LoadingContainer, StatusContainer } from "../container/style";
import { InputLabel } from "../input/inputLabel";
import { LinkBlueSmall } from "../links/links";
import { Label, Mont20600, Mont24600, Sand14500Gray, Sand16500, Sand16600, SubTitle, Title } from "../title/title";
import { BottomModal, GrayBackground, ImageProfile, ModalCancel, ModalConfirmAppointment, ModalMedRecord, PersonalModalContainer, TextCenter, TrueModal } from "./styles";
import { AppointmentButton } from "../navButton/navButton";

// import das bibliotecas
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons, Entypo } from "@expo/vector-icons";

// import do axios
import api from "../../service/service";
import { userDecodeToken } from "../../utils/auth";
import { prepareAge } from "../../utils/dateFunctions";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { LastPhoto } from "../addphoto/styles";
import { ActivityIndicator } from "react-native";

export const PersonalModal = ({ hideModal = false, onPressCancel = null, cancelText = "Cancelar", title, subTitle }) => {


    if (!hideModal) {
        return (<>
        </>)
    }
    return (
        <GrayBackground>
            <PersonalModalContainer>
                <ModalContainer>
                    <Title>{title}</Title>
                    <SubTitle>{subTitle}</SubTitle>
                    <LinkBlueSmall onPress={onPressCancel}>{cancelText}</LinkBlueSmall>
                </ModalContainer>
            </PersonalModalContainer>
        </GrayBackground>
    )
}

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

export const DoneAppointment = ({ hideModal = false, onPressCancel = null, onPress = null }) => {

    if (!hideModal) {
        return (<>
        </>)
    }
    return (
        <GrayBackground>
            <ModalCancel>
                <ModalContainer>
                    <Mont20600>Consulta pendente</Mont20600>
                    <SubTitle>Ao pressionar o botão, essa consulta aparecerá como realizada. A consulta foi efetuada?</SubTitle>
                    <Button onPress={onPress}>
                        <ButtonTitle>CONFIRMAR</ButtonTitle>
                    </Button>
                    <LinkBlueSmall onPress={onPressCancel}>Cancelar</LinkBlueSmall>

                </ModalContainer>
            </ModalCancel>
        </GrayBackground>
    )
}

export const ShowRecord = ({ item = null, hideModal = false, onPressCancel = null, onPressNavigate = null, isMedic }) => {

    if (!hideModal) {
        return (<>
        </>)
    }

    return (
        <GrayBackground>
            <ModalMedRecord>
                <ModalContainer>
                    {isMedic ?
                        <>
                            <ImageProfile source={{ uri: item.paciente.idNavigation.foto }} />
                            <Mont20600>{item.paciente.idNavigation.nome}</Mont20600>
                            <RowContainer>
                                <Sand16500>{prepareAge(item.paciente.dataNascimento)} anos</Sand16500>
                                <Sand16500>{item.paciente.idNavigation.email}</Sand16500>
                            </RowContainer>
                            <Button onPress={onPressNavigate}>
                                <ButtonTitle>INSERIR PRONTUÁRIO</ButtonTitle>
                            </Button>
                            <LinkBlueSmall onPress={onPressCancel}>Cancelar</LinkBlueSmall>
                        </> :
                        <>
                            <ImageProfile source={{ uri: item.medicoClinica.medico.idNavigation.foto }} />
                            <Mont20600>{item.medicoClinica.medico.idNavigation.nome}</Mont20600>
                            <RowContainer>
                                <Sand16500>{item.medicoClinica.medico.especialidade.especialidade1}</Sand16500>
                                <Sand16500>CRM - {item.medicoClinica.medico.crm}</Sand16500>
                            </RowContainer>
                            <Button onPress={onPressNavigate}>
                                <ButtonTitle>VISUALIZAR PRONTUÁRIO</ButtonTitle>
                            </Button>
                            <LinkBlueSmall onPress={onPressCancel}>Cancelar</LinkBlueSmall>
                        </>}


                </ModalContainer>
            </ModalMedRecord>
        </GrayBackground>
    )
}


export const CreateAppointment = ({ hideModal, onPressCancel, navigation }) => {


    const [appointmentLevel, setAppointmentLevel] = useState('Rotina')
    const [localizacao, setLocalizacao] = useState();


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
                            placeholder={"Ex: São Paulo"} 
                            value={localizacao}
                            setValue={setLocalizacao}/>
                    </InputContainer>

                    <BottomCancelContainer>
                        <Button onPress={() => navigation.navigate('SelectClinic', {
                            appointmentLevel,
                            localizacao
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
                    <ImageProfile source={{ uri: item.medicoClinica.medico.idNavigation.foto }} />
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
    function prepareTime(date) {
        const time = date.toString(date)

        const rightText = time.substring(18, 21)
        let rightHour = parseInt(time.substring(16, 18)) + 3
        if (rightHour < 10) {
            rightHour = '0' + rightHour
        }


        return rightHour + rightText
    }

    async function loadMedicClinic() {
        try {
            console.log("Id do médico: " +  item.medicoId)

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
                descricao: null,
                diagnostico: null,
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
                        navigation.replace("Main")
                    }} >
                        <ButtonTitle>CONFIRMAR</ButtonTitle>
                    </Button>
                    <LinkBlueSmall onPress={() => setHideModal(false)}>Cancelar</LinkBlueSmall>

                </ModalContainer>
            </ModalConfirmAppointment>
        </GrayBackground>
    )
}


export const LoadingModal = ({ showLoad }) => {
    return (showLoad ?

        <LoadingContainer>
            <ActivityIndicator color={'#49B3BA'} />
        </LoadingContainer>
        :
        <>
        </>
    )
}



export const CameraModal = ({ openModal, setOpenModal, capturePhoto, cameraRef }) => {

    const [facing, setFacing] = useState('back')
    const [permission, requestPermission] = useCameraPermissions()


    if (!permission) {
        return (<><ActivityIndicator /></>)
    }

    if (!permission.granted) {

        return (
            <CameraPermissionContainer>
                <Title>Nós precisamos da sua permissão para usar a câmera</Title>
                <SubTitle>Clique no ícone para requisitar a permissão</SubTitle>
                <Entypo name="lock-open" size={48} color="black" onPress={() => requestPermission()} />
            </CameraPermissionContainer>
        )
    }


    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }


    return (
        <TrueModal
            animationType="slide"
            transparent={false}
            visible={openModal}>
            <CameraView
                ref={cameraRef}
                facing={facing}
                style={{ width: "100%", height: "80%", flex: 1, position: "relative" }}
            />
            <BottomRowButtonContainer>
                <Entypo name="arrow-bold-left" size={48} color="white" onPress={() => setOpenModal(false)} />
                <Entypo name="circle" size={48} color="white" onPress={() => capturePhoto()} />
                <Entypo name="cycle" size={48} color="white" onPress={() => toggleCameraFacing()} />
            </BottomRowButtonContainer>

        </TrueModal>
    )
}