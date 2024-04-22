import { useState } from "react"
import { Button } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { Container, InputContainer } from "../../components/container/style"
import { Input } from "../../components/input/input"
import { Logo } from "../../components/logo/style"
import { IconCancel } from "../../components/navigationIcons/navigationIcons"
import { SubTitle, Title } from "../../components/title/title"
import api from "../../service/service"


const RedefinePassword = ({navigation, route}) => {
    const [senha, setSenha] = useState ('')
    const [confirmar, setConfirmar] = useState ('')

    async function AtualizarSenha() {
        if (senha === confirmar) {
            await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`,{senhaNova : senha
            }).then(() => {
                navigation.replace("Login")
            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <Container>

            <IconCancel navigation={navigation} />

            <Logo source={require("../../assets/img/VitalHubLogo.png")} />

            <Title>Redefinir Senha</Title>

            <SubTitle>Insira e confirme a sua nova senha</SubTitle>

            <InputContainer>
            <Input 
            placeholder={"Nova senha"}
            secureTextEntry={true}
            value={senha}
            onChangeText={(txt) => setSenha(txt)}
            />
            <Input 
            placeholder={"Confirmar nova senha"}
            secureTextEntry={true}
            value={confirmar}
            onChangeText={(txt) => setConfirmar(txt)}
            />
            </InputContainer>

            <Button onPress={()=>AtualizarSenha('Login')}>
                <ButtonTitle>CONFIRMAR NOVA SENHA</ButtonTitle>
            </Button>
        </Container>
    )
}

export default RedefinePassword