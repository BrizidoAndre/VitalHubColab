import { Button } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { Container, InputContainer } from "../../components/container/style"
import { Input } from "../../components/input/input"
import { Logo } from "../../components/logo/style"
import { IconCancel } from "../../components/navigationIcons/navigationIcons"
import { SubTitle, Title } from "../../components/title/title"


const RedefinePassword = ({navigation}) => {

    return (
        <Container>

            <IconCancel navigation={navigation} />

            <Logo source={require("../../assets/img/VitalHubLogo.png")} />

            <Title>Redefinir Senha</Title>

            <SubTitle>Insira e confirme a sua nova senha</SubTitle>

            <InputContainer>
            <Input placeholder={"Nova senha"}/>
            <Input placeholder={"Confirmar nova senha"}/>
            </InputContainer>

            <Button>
                <ButtonTitle onPress={()=>navigation.navigate('Login')}>CONFIRMAR NOVA SENHA</ButtonTitle>
            </Button>
        </Container>
    )
}

export default RedefinePassword