import { Button } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { Container, InputNumberContainer } from "../../components/container/style"
import { InputNumber } from "../../components/input/input"
import { LinkBlueSmall } from "../../components/links/links"
import { Logo } from "../../components/logo/style"
import { IconCancel } from "../../components/navigationIcons/navigationIcons"
import { SubTitle, Title } from "../../components/title/title"
import RedefinePassword from "../redefinePassword/redefinePassword"

const CheckEmail = ({navigation}) => {



return(
    <Container>

        <IconCancel navigation={navigation} />

    <Logo source={require("../../assets/img/VitalHubLogo.png")} />

    <Title>Verifique seu email</Title>

    <SubTitle>Digite o código de 4 dígitos enviado para <LinkBlueSmall>username@email.com</LinkBlueSmall></SubTitle>

    <InputNumberContainer>
    <InputNumber 
    placeholder={"0"} 
    maxLength={1}
    keyboardType={'numeric'}/>
    <InputNumber 
    placeholder={"0"} 
    maxLength={1}
    keyboardType={'numeric'}/>
    <InputNumber 
    placeholder={"0"} 
    maxLength={1}
    keyboardType={'numeric'}/>
    <InputNumber 
    placeholder={"0"} 
    maxLength={1}
    keyboardType={'numeric'}/>
    </InputNumberContainer>

    <Button onPress={() => {navigation.navigate("RedefinePassword")}}> 
        <ButtonTitle>ENTRAR</ButtonTitle>
    </Button>

    <LinkBlueSmall>Reenviar código</LinkBlueSmall>
    </Container>
)
}

export default CheckEmail