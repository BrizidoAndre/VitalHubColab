import styled from "styled-components"
import { SmallInputLabelContainer } from "../../components/container/style"
import { Label, Mont14500 } from "../../components/title/title"

export const SmallInputLabel = ({ title, text }) => {
    return (
        <SmallInputLabelContainer>
            <Label>{title}</Label>
            <InputSpace><Mont14500>{text}</Mont14500></InputSpace>
        </SmallInputLabelContainer>
    )
}

export const InputLabelBlack = ({ title, text }) => {
    return (
        <>
            <Label>{title}</Label>
            <InputBlack><Mont14500>{text}</Mont14500></InputBlack>
        </>
    )
}

export const InputSpace = styled.View`
    width: 100%;
    height: 55px;
    border-radius: 5px;
    background-color:#e5e3e3;
    padding: 16px;
`

export const InputBlack = styled.View`
    width: 100%;
    height: 55px;
    border-radius: 5px;
    background-color:#e5e3e3;
    padding: 16px;
`

