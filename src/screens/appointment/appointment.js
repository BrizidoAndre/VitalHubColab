// importando biblioteca
import { Camera } from "expo-camera"
import * as MediaLibrary from 'expo-media-library'

// Importando componentes
import { Button, SmallButton, SmallButtonGreen, SmallButtonTransparentContainer } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { Container, InputContainer, RowAlign, RowContainer, RowFullContainer, TwoInputContainer } from "../../components/container/style"
import { HeaderImage } from "../../components/headerImage/headerImage"
import { BigInputBlack, Input } from "../../components/input/input"
import { InputLabel, InputLabelBlack, InputLabelBlackText, InputLabelImageBlack } from "../../components/input/inputLabel"
import { IconReturn } from "../../components/navigationIcons/navigationIcons"
import ScrollViewProfile from "../../components/scrollViewProfile/scrollViewProfile"
import { Mont12500Red, Mont14600White, Sand14500Gray, SubTitle, Title } from "../../components/title/title"
import { IconCamera, Line, LinkReturn } from "./styles"

// Importando imagens
import cameraImage from '../../assets/img/mdi_camera-plus-outline.png'

// Importando React
import { useEffect, useRef, useState } from "react"
import { CameraModal } from "../../components/modalActions/modalActions"
import { TextInput } from "react-native"
import api from "../../service/service"
import { prepareAge } from "../../utils/dateFunctions"


// VARIÁVEL NA PÁGINA PARA VERIFICAR SE O USUÁRIO É MÉDICO OU NÃO
const Appointment = ({ navigation, route }) => {

    // constante para verificar se o usuário é ou não médico
    const [medic, setMedic] = useState(false);

    // constante para referências da câmera
    const cameraRef = useRef(null)
    // constante para a imagem ficar salva
    const [photo, setPhoto] = useState(null)
    // Use state para o tipo da camera
    const [camera, setCamera] = useState(Camera.Constants.Type.back)
    // Use state para os modais
    const [openModal, setOpenModal] = useState(false)
    // verificação se o usuário está editando ou não os detalhes da consulta
    const [isEdit, setIsEdit] = useState(false)

    // criando o state para a visualização do medico e paciente do prontuário
    const [appointmentObj, setAppointmentObj] = useState({
        consultaId: "",
        medicamento: "",
        descricao: "",
        diagnostico: "",
        name: "",
        age: "",
        email: '',
        crm: '',
        medicSpecialty: '',
    });


    // obtendo o objeto passado para a página
    const { objModalRecord, isMedic } = route.params;



    async function capturePhoto() {
        if (cameraRef) {
            const image = await cameraRef.current.takePictureAsync();

            console.log(image.uri);
            setPhoto(image.uri)
            setOpenModal(true)
        }

        if (photo) {
            await MediaLibrary.createAssetAsync(photo)
        }
    }

    async function savePhoto() {

    }


    // funções do prontuário obter e alterar
    async function loadAppointment() {
        const res = await api.get('/Consultas/BuscarPorId?id=' + objModalRecord.id)

        const data = await res.data;


        if (!isMedic) {
            setAppointmentObj({
                consultaId: data.id,
                descricao: data.descricao,
                diagnostico: data.diagnostico,
                medicamento: data.receita.medicamento,
                name: objModalRecord.medicoClinica.medico.idNavigation.nome,
                medicSpecialty: objModalRecord.medicoClinica.medico.especialidade.especialidade1,
                crm: objModalRecord.medicoClinica.medico.crm
            })
        }
        else {
            setAppointmentObj({
                consultaId: data.id,
                descricao: data.descricao,
                diagnostico: data.diagnostico,
                medicamento: data.receita.medicamento,
                age: objModalRecord.paciente.dataNascimento,
                email: objModalRecord.paciente.idNavigation.email,
                name: objModalRecord.paciente.idNavigation.nome,
            })
        }

    }
    async function saveAppointment() {
        try {
            const res = await api.put('/Consultas/Prontuario', appointmentObj)

            setIsEdit(false)
        } catch (e) {
            console.log("Erro na api");
            console.log(e)
        }
    }

    // Use effect para a requisição das permissões
    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

        })()

        // quando carrega a página verifica se usuário é médico
        setMedic(isMedic);
        loadAppointment()
    }, [])


    return (
        <Container>
            {medic ?
                <>
                    <IconReturn navigation={navigation} />

                    <HeaderImage requireImage={require("../../assets/img/Rectangle425.png")} />

                    <ScrollViewProfile>
                        <Title>{appointmentObj.name}</Title>
                        <Container>
                            <RowContainer>
                                <SubTitle>{prepareAge(appointmentObj.age)} anos</SubTitle>
                                <SubTitle>{appointmentObj.email}</SubTitle>
                            </RowContainer>
                            
                            {isEdit
                                ?
                                <>
                                    <InputContainer>
                                        <InputLabel
                                            bigInput={true}
                                            title={"Descrição da consulta"}
                                            placeholder={"Descrição"}
                                            value={appointmentObj.descricao}
                                            setValue={(e) => setAppointmentObj({ ...appointmentObj, descricao: e })}
                                        />
                                        <InputLabel
                                            title={"Diagnóstico do paciente"}
                                            placeholder={"Diagnóstico"}
                                            value={appointmentObj.diagnostico}
                                            setValue={(e) => setAppointmentObj({ ...appointmentObj, diagnostico: e })}
                                        />
                                        <InputLabel
                                            bigInput={true}
                                            title={"Preescrição Médica"}
                                            placeholder={"Preescrição Médica"}
                                            value={appointmentObj.medicamento}
                                            setValue={(e) => setAppointmentObj({ ...appointmentObj, medicamento: e })}
                                        />
                                        <TwoInputContainer>
                                            <SmallButton onPress={() => setIsEdit(false)}><ButtonTitle>CANCELAR</ButtonTitle></SmallButton>
                                            <SmallButton onPress={() => saveAppointment()}><ButtonTitle>SALVAR</ButtonTitle></SmallButton>
                                        </TwoInputContainer>
                                    </InputContainer>
                                </>
                                :
                                <>
                                    <InputContainer>
                                        <InputLabelBlackText bigInput={true} title={"Descrição da consulta"} text={appointmentObj.descricao} />
                                        <InputLabelBlackText title={"Diagnóstico do paciente"} text={appointmentObj.diagnostico} />
                                        <InputLabelBlackText bigInput={true} title={"Preescrição Médica"} text={appointmentObj.medicamento} />

                                    </InputContainer>

                                    <Button onPress={() => { setIsEdit(true) }}><ButtonTitle>EDITAR</ButtonTitle></Button>
                                </>}
                        </Container>
                    </ScrollViewProfile>
                </>
                :
                <>
                    <IconReturn navigation={navigation} />

                    <HeaderImage requireImage={require("../../assets/img/Rectangle425.png")} />

                    <ScrollViewProfile>
                        <Container>
                            <Title>{appointmentObj.name}</Title>
                            <RowContainer>
                                <Sand14500Gray>{appointmentObj.medicSpecialty}</Sand14500Gray>
                                <Sand14500Gray>CRM-{appointmentObj.crm}</Sand14500Gray>
                            </RowContainer>


                            <InputContainer>
                                <InputLabelBlackText
                                    bigInput={true}
                                    title={"Descrição da consulta"}
                                    text={appointmentObj.descricao} />

                                <InputLabelBlackText
                                    title={"Diagnóstico do paciente"}
                                    text={appointmentObj.diagnostico} />

                                <InputLabelBlackText
                                    bigInput={true}
                                    title={"Preescrição Médica"}
                                    text={appointmentObj.medicamento} />

                                <InputLabelImageBlack
                                    title={"Exames médicos"} />

                                <RowFullContainer>
                                    <SmallButtonGreen onPress={() => setOpenModal(true)} >
                                        <RowAlign>
                                            <IconCamera source={cameraImage} />
                                            <Mont14600White>Enviar</Mont14600White>
                                        </RowAlign>
                                    </SmallButtonGreen>
                                    <SmallButtonTransparentContainer >
                                        <Mont12500Red>Cancelar</Mont12500Red>
                                    </SmallButtonTransparentContainer>
                                </RowFullContainer>

                                <Line />

                                <BigInputBlack />
                            </InputContainer>

                            <LinkReturn
                                onPress={() => { navigation.goBack() }}
                            >Voltar</LinkReturn>
                        </Container>
                    </ScrollViewProfile>

                    <CameraModal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        cameraRef={cameraRef}
                        capturePhoto={() => capturePhoto()} />
                </>
            }


        </Container>
    )
}

export default Appointment