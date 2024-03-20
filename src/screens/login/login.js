import { Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { ButtonContainer, Container, InputContainer } from "../../components/container/style";
import { Logo } from "../../components/logo/style";
import { Title } from "../../components/title/title";
import { Input } from "../../components/input/input";
import { LinkBlueSmall, LinkDescription, LinkMedium } from "../../components/links/links";
import { Button, ButtonGoogle } from "../../components/button/button";
import ForgotPassword from "../forgotPassword/forgotPassword";
import { ButtonTitle, ButtonTitleGoogle } from "../../components/button/buttonTitle";
import { IconBack } from "../../components/iconBack/iconBack";
import CreateAccount from "../createAccount/createAccount";

const Login = ({ navigation }) => {

    function Login(){
        navigation.replace("Main")
    }




    return (
        <Container>

            <Logo source={require("../../assets/img/VitalHubLogo.png")} />

            <Title>Entrar ou criar conta</Title>

            <InputContainer>
                <Input
                    placeholder="Usuário ou email" />
                <Input
                    placeholder="Senha..."
                    secureTextEntry={true}
                />


                <LinkMedium onPress={() => { navigation.navigate("ForgotPassword") }}>Esqueceu sua senha</LinkMedium>
            </InputContainer>


            <Button onPress={()=>Login()}>
                <ButtonTitle>ENTRAR</ButtonTitle>
            </Button>


            <ButtonGoogle>
                <ButtonContainer>
                    <Image source={require("../../assets/img/GOOGLE.png")} />
                    <ButtonTitleGoogle>ENTRAR COM GOOGLE</ButtonTitleGoogle>
                </ButtonContainer>
            </ButtonGoogle>

            <ButtonContainer>
                <LinkDescription>Não tem uma conta! </LinkDescription>
                <LinkBlueSmall onPress={() => { navigation.navigate(CreateAccount) }}>Crie uma conta agora</LinkBlueSmall>
            </ButtonContainer>

        </Container>
    )
}

export default Login;