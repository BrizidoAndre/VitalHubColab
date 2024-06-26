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
import { removeFromStorage } from "../../utils/auth";

const CreateAccount = ({ navigation }) => {

  const [user, setUser] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    idTipoUsuario: 'A4FD73A0-9F0B-4462-A9CF-E3460CAC328A',
  })

  const [submitted, setSubmitted] = useState(false)

  const Cadastrar = async () => {
    if (user.nome.length < 1 || user.email.length < 1 || user.senha.length < 1 || user.confirmaSenha.length < 1) {
      alert('Informações inválidas', 'Preencha todas as informações corretamente');
      return;
    }

    if (user.senha !== user.confirmaSenha) {
      alert("Senhas devem ser iguais");
      return;
    }
    removeFromStorage()

    navigation.navigate('Profile', { user });
  };


  const verifyValue = (value, setValue) => {
    if(submitted){
      
    }
  }

  return (
    <Container>

      <Logo source={require("../../assets/img/VitalHubLogo.png")} />

      <Title>Criar conta</Title>

      <SubTitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</SubTitle>

      <InputContainer>
        <Input
          placeholder={"Nome"}
          value={user.nome}
          onChangeText={(txt) => setUser({
            ...user,
            nome: txt
          })}
        ></Input>
        <Input
          placeholder={"E-mail"}
          value={user.email}
          onChangeText={(txt) => setUser({
            ...user,
            email: txt
          })}
        />
        <Input
          placeholder={"Senha"}
          value={user.senha}
          secureTextEntry={true}
          onChangeText={(txt) => setUser({
            ...user,
            senha: txt
          })}
        />
        <Input
          placeholder={"Confirmar senha"}
          value={user.confirmaSenha}
          secureTextEntry={true}
          onChangeText={(txt) => setUser({
            ...user,
            confirmaSenha: txt
          })}
        />
      </InputContainer>

      <Button onPress={() => Cadastrar()}>
        <ButtonTitle>CADASTRAR</ButtonTitle>
      </Button>

      <LinkBlueSmall onPress={() => { navigation.navigate(Login) }}>Cancelar</LinkBlueSmall>
    </Container>
  )
}

export default CreateAccount;