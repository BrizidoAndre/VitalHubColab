// importando biblioteca
import { Camera } from "expo-camera"
import * as MediaLibrary from 'expo-media-library'

// Importando componentes
import { Button, SmallButtonGreen, SmallButtonTransparentContainer } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { Container, InputContainer, RowAlign, RowFullContainer } from "../../components/container/style"
import { HeaderImage } from "../../components/headerImage/headerImage"
import { BigInputBlack } from "../../components/input/input"
import { InputLabelBlack, InputLabelImageBlack } from "../../components/input/inputLabel"
import { IconReturn } from "../../components/navigationIcons/navigationIcons"
import ScrollViewProfile from "../../components/scrollViewProfile/scrollViewProfile"
import { Mont12500Red, Mont14600White, Sand14500Gray, SubTitle, Title } from "../../components/title/title"
import { IconCamera, Line, LinkReturn } from "./styles"

// Importando imagens
import cameraImage from '../../assets/img/mdi_camera-plus-outline.png'

// Importando React
import { Alert, Modal } from "react-native"
import { useEffect, useRef, useState } from "react"
import { CameraModal } from "../../components/modalActions/modalActions"


// VARIÁVEL NA PÁGINA PARA VERIFICAR SE O USUÁRIO É MÉDICO OU NÃO
const Appointment = ({ navigation, medic = true }) => {

    // constante para referências
    const cameraRef = useRef(null)
    // constante para a imagem ficar salva
    const [photo, setPhoto] = useState(null)
    // Use state para o tipo da camera
    const [camera, setCamera] = useState(Camera.Constants.Type.back)

    // Use state para os modais
    const [openModal, setOpenModal] = useState(false)



    async function capturePhoto(){
        if(cameraRef){
            const image = await cameraRef.current.takePictureAsync();

            console.log(image.uri);
            setPhoto(image.uri)
            setOpenModal(true)
        }

        // if(photo){
        //     await MediaLibrary.createAssetAsync(photo)
        // }
    }

    async function savePhoto(){
        
    }




    // Use effect para a requisição das permissões
    useEffect(() => {
        (async () => {

            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

        })()

    }, [])




    return (
        <Container>
            {medic ?
                <>
                    <IconReturn navigation={navigation} />

                    <HeaderImage requireImage={require("../../assets/img/Rectangle425.png")} />

                    <ScrollViewProfile>
                        <Container>
                            <Title>Dr. Clone Richard</Title>
                            <Sand14500Gray>Clinico Geral    CRM-15647</Sand14500Gray>


                            <InputContainer>
                                <InputLabelBlack
                                    bigInput={true}
                                    title={"Descrição da consulta"}
                                    placeholder={"Descrição"} />

                                <InputLabelBlack
                                    title={"Diagnóstico do paciente"}
                                    placeholder={"Diagnóstico"} />

                                <InputLabelBlack
                                    bigInput={true}
                                    title={"Preescrição Médica"}
                                    placeholder={"Preescrição Médica"} />

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


                            <LinkReturn onPress={() => { navigation.goBack() }}>Voltar</LinkReturn>
                        </Container>
                    </ScrollViewProfile>


                    <CameraModal openModal={openModal} setOpenModal={setOpenModal} cameraRef={cameraRef} capturePhoto={() => capturePhoto()} />
                </>
                :
                <>

                    <IconReturn navigation={navigation} />

                    <HeaderImage requireImage={require("../../assets/img/Rectangle425.png")} />

                    <ScrollViewProfile>
                        <Title>Richard Kosta</Title>
                        <SubTitle>22 anos   richard.kosta@email.com</SubTitle>


                        <Container>
                            <InputContainer>
                                <InputLabelBlack bigInput={true} title={"Descrição da consulta"} placeholder={"Descrição"} />
                                <InputLabelBlack title={"Diagnóstico do paciente"} placeholder={"Diagnóstico"} />
                                <InputLabelBlack bigInput={true} title={"Preescrição Médica"} placeholder={"Preescrição Médica"} />

                            </InputContainer>

                            <Button onPress={() => { navigation.navigate("EditAppointment") }}><ButtonTitle>EDITAR</ButtonTitle></Button>
                        </Container>
                    </ScrollViewProfile>
                </>

            }


        </Container>
    )
}

export default Appointment