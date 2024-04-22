import { useEffect, useRef, useState } from "react"
import { Button } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { Container, InputNumberContainer } from "../../components/container/style"
import { InputNumber } from "../../components/input/input"
import { LinkBlueSmall } from "../../components/links/links"
import { Logo } from "../../components/logo/style"
import { IconCancel } from "../../components/navigationIcons/navigationIcons"
import { SubTitle, Title } from "../../components/title/title"
import RedefinePassword from "../redefinePassword/redefinePassword"
import api from "../../service/service"

const CheckEmail = ({navigation, route}) => {
    const [codigo, setCodigo] = useState ('')
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    function focusNextInput (index){
        //Se o index e menor do que a quantidade de campos
        if (index < inputs.length - 1){
            inputs[index + 1].current.focus()
        }
    }

    function focusPrevInput (index){
        if (index > 0) {
            inputs[index - 1].current.focus()
        }
    }

    async function ValidarCodigo(){

        await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
        .then( () => {
            navigation.replace("RedefinePassword", {emailRecuperacao : route.params.emailRecuperacao });

        }).catch(error => {
            console.log(error);
        })
    }
    
    useEffect(() => {
        inputs[0].current.focus()
    }, [])


return(
    <Container>

        <IconCancel navigation={navigation} />

    <Logo source={require("../../assets/img/VitalHubLogo.png")} />

    <Title>Verifique seu email</Title>

    <SubTitle>Digite o código de 4 dígitos enviado para 
        <LinkBlueSmall>{ route.params.emailRecuperacao }</LinkBlueSmall>
    </SubTitle>

    <InputNumberContainer>

    {
        [0, 1, 2, 3].map( (index) => (
            <InputNumber 
            key={index} //chave de acordo com o index do map
            ref={inputs[index]} //referencia de acordo com o index do map
            placeholder={"0"} 
            maxLength={1}
            keyboardType={'numeric'}
            caretHidden={true}

            onChangeText={ (text) => {
                //verificar se o texto nao e vazio (para voltar ao campo anterior)
                if (text == "") {
                    focusPrevInput(index)

                }else{
                    const novoCodigo = [...codigo] // separa os valores em casinhas do array
                    novoCodigo[index] = text //Corrige o valor de acordo com a posicao
                    setCodigo(novoCodigo.join(''))//juntando todas em uma string


                    //verificar se o campo tem um caracter (passa para o proximo campo)
                    focusNextInput(index)
                }
                
            }}
            />
        ))
    }
    </InputNumberContainer>

    <Button onPress={() => {ValidarCodigo()}}> 
        <ButtonTitle>ENVIAR</ButtonTitle>
    </Button>

    <LinkBlueSmall>Reenviar código</LinkBlueSmall>
    </Container>
)
}

export default CheckEmail