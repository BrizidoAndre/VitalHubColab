import { ActivityIndicator, Alert, Image } from "react-native";
import { ButtonContainer, Container, InputContainer } from "../../components/container/style";
import { Logo } from "../../components/logo/style";
import { Title } from "../../components/title/title";
import { Input } from "../../components/input/input";
import { LinkBlueSmall, LinkDescription, LinkMedium } from "../../components/links/links";
import { Button, ButtonGoogle } from "../../components/button/button";
import { ButtonTitle, ButtonTitleGoogle } from "../../components/button/buttonTitle";
import CreateAccount from "../createAccount/createAccount";
import { useState } from "react";

// Importando biblioteca para armazenar o token no cell
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../service/service";

const Login = ({ navigation }) => {

    // states para o cadastro
    const [email, setEmail] = useState('medico@email.com')
    const [password, setPassword] = useState('Medicosenha')

    // state para o botão de login
    const [loginTime, setLoginTime] = useState(false);

    async function Login() {
        try {
            setLoginTime(true)
            // Chamar a api de login
            const response = await api.post('/Login', {
                email: email,
                senha: password
            })

            await AsyncStorage.setItem('token', JSON.stringify(response.data))
            navigation.replace("Main")
            setLoginTime(false)
        } catch (e) {
            console.log(e);
            Alert.alert('Login incorreto!', 'Email ou senha inválidos')
            setLoginTime(false)
        }
    }



    return (
        <Container>

            <Logo source={require("../../assets/img/VitalHubLogo.png")} />

            <Title>Entrar ou criar conta</Title>

            <InputContainer>
                <Input
                    placeholder="Usuário ou email"
                    value={email}
                    onChangeText={(txt) => setEmail(txt)} />
                <Input
                    placeholder="Senha..."
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(txt) => setPassword(txt)}
                />


                <LinkMedium onPress={() => { navigation.navigate("ForgotPassword") }}>Esqueceu sua senha</LinkMedium>
            </InputContainer>


            <Button onPress={() => Login()} disabled={loginTime}>
                {
                    !loginTime ?
                        <ButtonTitle>ENTRAR</ButtonTitle>
                        :
                        <ActivityIndicator color={'#fff'}/>
                }
            </Button>


            <ButtonGoogle>
                <ButtonContainer>
                    <Image source={require("../../assets/img/GOOGLE.png")} />
                    <ButtonTitleGoogle>ENTRAR COM GOOGLE</ButtonTitleGoogle>
                </ButtonContainer>
            </ButtonGoogle>

            <ButtonContainer>
                <LinkDescription>Não tem uma conta! </LinkDescription>
                <LinkBlueSmall onPress={() => { navigation.navigate('CreateAccount') }}>Crie uma conta agora</LinkBlueSmall>
            </ButtonContainer>

        </Container>
    )
}

export default Login;