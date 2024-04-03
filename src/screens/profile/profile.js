import { Container, InputContainer, LabelInputContainer, TwoInputContainer } from "../../components/container/style"
import { ImageModal } from "../../components/modal/modal"
import { SubTitle, Title } from "../../components/title/title"
import { InputLabelBlack, SmallInputLabel } from "../../components/input/inputLabel"
import { Button, ButtonLogout, SmallButton } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { HeaderImage } from "../../components/headerImage/headerImage"
import ScrollViewProfile from "../../components/scrollViewProfile/scrollViewProfile.js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"
import { userDecodeToken } from "../../utils/auth.js"
import { useEffect, useState } from "react"
import api from "../../service/service.js"

const Profile = ({ navigation }) => {

    const [item, setItem] = useState({})

    const [user, setUser] = useState({})

    const [endereco, setEndereco] = useState({})

    async function loadItem() {
        const token = await userDecodeToken()
        setItem(token)
    }

    async function loadAdress(){
        try{
            const res = await api.get('/Usuario/BuscarEndereco?id=' + user.enderecoId)

            const data = await res.data
            

            setEndereco(data)
        } catch(e){
            console.log(e)
        }
    }

    async function loadProfile() {

        try{
            const res = await api.get('/Pacientes/BuscarPorId?id=' + item.id)
            
            const data = await res.data

            
            data.dataNascimento = await data.dataNascimento.split(['T'])[0]
            setUser(data)

        } catch(e){
            console.log(e)
        }
    }


    async function Logout() {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }

    useEffect(() => {
        loadItem()
    }, [])
    
    useEffect(() => {
        loadProfile()
    }, [item])
    
    useEffect(() => {
        loadAdress()
    }, [user])

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
                            value={ user.dataNascimento }
                             
                        />
                        <InputLabelBlack
                            title={"CPF"}
                            value={user.cpf}
                             
                        />
                        <InputLabelBlack
                            title={"Endereço"}
                            value={endereco.logradouro + ' ' + endereco.numero}
                            
                        />

                        <TwoInputContainer>
                            <SmallInputLabel title={"CEP"} placeholder={"XXXXXXXX"} value={endereco.cep} />
                            <SmallInputLabel title={"CIDADE"} placeholder={"Ex: SP"} value={endereco.cidade} />
                        </TwoInputContainer>

                    </InputContainer>

                            <Button><ButtonTitle>SALVAR</ButtonTitle></Button>


                    <ButtonLogout onPress={() => {
                        Logout()
                    }}><ButtonTitle>Log off</ButtonTitle></ButtonLogout>
                </Container>
            </ScrollViewProfile>
        </Container>
    )

}

export default Profile;