
import { Container, InputContainer, LabelInputContainer, TwoInputContainer } from "../../components/container/style"
import { ImageModal } from "../../components/modal/modal"
import { SubTitle, Title } from "../../components/title/title"
import { InputLabelBlack, SmallInputLabel } from "../../components/input/inputLabel"
import { Button, ButtonLogout, SmallButton } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { HeaderImage } from "../../components/headerImage/headerImage"
import ScrollViewProfile from "../../components/scrollViewProfile/scrollViewProfile.js"
import EditProfile from "../editProfile/editProfile.js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"
import { userDecodeToken } from "../../utils/auth.js"
import { useEffect, useState } from "react"
import api from "../../service/service.js"

const Profile = ({ navigation }) => {

    const [item, setItem] = useState({})

    const [user, setUser] = useState({})

    async function loadItem() {
        const token = await userDecodeToken()

        setItem(token)
    }

    async function loadProfile() {
        const res = await api.get('/Pacientes/BuscarPorID?id=' + item.id)

        const data = await res.data

        setUser(data)
    }


    async function Logout() {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }

    useEffect(() => {
        loadItem()
        loadProfile()
    }, [])

    return (
        <Container>
            <HeaderImage requireImage={require("../../assets/img/Rectangle425.png")} />


            <ScrollViewProfile>
                <Title>{item.name}</Title>
                <SubTitle>{item.email}</SubTitle>
                <Container>

                    <InputContainer>
                        <InputLabelBlack
                            title={"Data de nascimento"}
                            value={user.dataNascimento}
                             
                        />
                        <InputLabelBlack
                            title={"CPF"}
                            value={user.cpf}
                             
                        />
                        <InputLabelBlack
                            title={"Endereço"}
                            value={user.enderecoId}
                            
                        />

                        <TwoInputContainer>
                            <SmallInputLabel title={"CEP"} placeholder={"XXXXXXXX"} />
                            <SmallInputLabel title={"CIDADE"} placeholder={"Ex: SP"} />
                        </TwoInputContainer>

                    </InputContainer>

                    <InputContainer>
                        <TwoInputContainer>
                            <SmallButton><ButtonTitle>SALVAR</ButtonTitle></SmallButton>
                            <SmallButton onPress={() => { navigation.navigate(EditProfile) }}
                            ><ButtonTitle>EDITAR</ButtonTitle></SmallButton>
                        </TwoInputContainer>

                    </InputContainer>

                    <ButtonLogout onPress={() => {
                        Logout()
                    }}><ButtonTitle>Log off</ButtonTitle></ButtonLogout>
                </Container>
            </ScrollViewProfile>
        </Container>
    )

}

export default Profile