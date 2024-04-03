import styled from "styled-components";
import { Container, InputContainer } from "../../components/container/style";
import { Logo } from "../../components/logo/style";
import { SubTitle, Title } from "../../components/title/title";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { ButtonTitle } from "../../components/button/buttonTitle";
import { LinkBlueSmall } from "../../components/links/links";
import Login from "../login/login";
import { useState } from "react";
import { Alert } from "react-native";
import api from "../../service/service";

const CreateAccount = ({ navigation }) => {
    const [rg, setRg] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
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
            const response = await api.post('http://172.16.39.79:4466/api/Pacientes', {
                rg: rg,
                cpf: cpf,
                dataNascimento: dataNascimento,
                cep: cep,
                logradouro: logradouro,
                numero: numero,
                cidade: cidade,
                nome: nome,
                email: email,
                senha: senha,
                idTipoUsuario: idTipoUsuario
            })
      
          if (!response.ok) {
            const data = await response();
            setError(data.error);
          } else {
            setRg("");
            setCpf("");
            setDataNascimento("");
            setCep("");
            setLogradouro("");
            setNumero("");
            setCidade("");
            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");
            setIdTipoUsuario("");
            setError("");

            navigation.navigate("Login");
          }
        } catch (e) {
            console.log(e);
            Alert.alert('Erro ao criar conta')
        }
      };

    return (
        <Container>


            <InputContainer>
                <Input placeholder={"rg"}/>
                <Input placeholder={"cpf"}/>
                <Input placeholder={"dataNascimento"}/>
                <Input placeholder={"cep"}/>
                <Input placeholder={"logradouro"}/>
                <Input placeholder={"numero"}/>
                <Input placeholder={"cidade"}/>
                <Input placeholder={"nome"}/>
                <Input placeholder={"E-mail"}/>
                <Input placeholder={"Senha"}/>
                <Input placeholder={"Confirmar senha"}/>

            </InputContainer>

            <Button>
                <ButtonTitle onPress={Cadastrar}>CADASTRAR</ButtonTitle>
            </Button>

            <LinkBlueSmall onPress={() => {navigation.navigate(Login)}}>Cancelar</LinkBlueSmall>
        </Container>
    )
}

export default CreateAccount;