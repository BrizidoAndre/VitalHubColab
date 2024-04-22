import { Container, InputContainer } from "../../components/container/style";
import { IconBack, IconTouch } from "../../components/iconBack/iconBack";
import { Logo } from "../../components/logo/style";
import { SubTitle, Title } from "../../components/title/title";
import { Input } from "../../components/input/input";
import { Button} from "../../components/button/button";
import { ButtonTitle } from "../../components/button/buttonTitle";
import CheckEmail from "../checkEmail/checkEmail";
import Login from "../login/login";
import { TouchableHighlight } from "react-native";
import { IconReturn } from "../../components/navigationIcons/navigationIcons";
import { useState } from "react";
import api from "../../service/service";

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');

    async function EnviarEmail(){
        await api.post(`/RecuperarSenha?email=${email}`)
        .then( () => {
            navigation.replace("CheckEmail", { emailRecuperacao : email });
        }). catch(error => {
            console.log(error)
        })
    }

    return(
        <Container>

            <IconReturn navigation={navigation} />

            <Logo source={require("../../assets/img/VitalHubLogo.png")} />

            <Title>Recuperar senha</Title>

            <SubTitle>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha </SubTitle>

            <InputContainer>
            <Input placeholder={"Usuário ou E-mail"} 
            value={email}
            onChangeText={(txt) => setEmail(txt)}/>
            </InputContainer>

            <Button onPress={()=> EnviarEmail()}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Button>

        </Container>
    )
}

export default ForgotPassword;