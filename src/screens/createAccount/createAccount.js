import styled from "styled-components";
import { Container, InputContainer } from "../../components/container/style";
import { Logo } from "../../components/logo/style";
import { SubTitle, Title } from "../../components/title/title";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { ButtonTitle } from "../../components/button/buttonTitle";
import { LinkBlueSmall } from "../../components/links/links";
import Login from "../login/login";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import api from "../../service/service";
import Profile from "../profile/profile";

const CreateAccount = ({ navigation }) => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [idTipoUsuario, setIdTipoUsuario] = useState("A4FD73A0-9F0B-4462-A9CF-E3460CAC328A")

    const Cadastrar = async () => {
        if (senha !== confirmarSenha) {
          setError("Senhas devem ser iguais");
          return;
        }
      
        try {
            const response = await api.post('http://192.168.19.134:4466/api/Pacientes', {
              email: email,
              senha: senha,
            })

            if (!response.ok) {
              const data = await response.json();
              Alert.alert(data.error);
            } else  {
            setEmail("");
            setSenha("");
            setConfirmarSenha("");
            setIdTipoUsuario("");
            setCadastro("");

            console.log(e.Alert);
            Alert.alert("Conta criada");
            navigation.navigate("Login");
          }
        } catch (e) {
            console.log(e);
            Alert.alert('ERROx')
        }
      };

    return (
        <Container>

            <Logo source={require("../../assets/img/VitalHubLogo.png")} />

            <Title>Criar conta</Title>

            <SubTitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</SubTitle>

            <InputContainer>
                <Input 
                  placeholder={"Nome"}
                  value={nome}
                  onChangeText={(txt) => setNome(txt)}
                />
                <Input 
                  placeholder={"E-mail"}
                  value={email}
                  onChangeText={(txt) => setEmail(txt)}
                />
                <Input 
                  placeholder={"Senha"}
                  value={senha}
                  onChangeText={(txt) => setSenha(txt)}
                />
                <Input 
                  placeholder={"Confirmar senha"}
                  value={confirmarSenha}
                  onChangeText={(txt) => setConfirmarSenha(txt)}
                />
            </InputContainer>

            <Button onPress={() => navigation.navigate('Profile')}>
                <ButtonTitle>CADASTRAR</ButtonTitle>
            </Button>

            <LinkBlueSmall onPress={() => {navigation.navigate(Login)}}>Cancelar</LinkBlueSmall>
        </Container>
    )
}

export default CreateAccount;