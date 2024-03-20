import styled from "styled-components";
import { Container, InputContainer } from "../../components/container/style";
import { Logo } from "../../components/logo/style";
import { SubTitle, Title } from "../../components/title/title";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { ButtonTitle } from "../../components/button/buttonTitle";
import { LinkBlueSmall } from "../../components/links/links";
import Login from "../login/login";

const CreateAccount = ({ navigation }) => {


    return (
        <Container>
            <Logo source={require("../../assets/img/VitalHubLogo.png")} />

            <Title>Criar conta</Title>

            <SubTitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</SubTitle>

            <InputContainer>
                <Input placeholder={"Usuário ou E-mail"}/>
                <Input placeholder={"Senha"}/>
                <Input placeholder={"Confirmar senha"}/>
            </InputContainer>

            <Button>
                <ButtonTitle>CADASTRAR</ButtonTitle>
            </Button>

            <LinkBlueSmall onPress={() => {navigation.navigate(Login)}}>Cancelar</LinkBlueSmall>
        </Container>
    )
}

export default CreateAccount