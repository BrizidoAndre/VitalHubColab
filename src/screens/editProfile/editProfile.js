import { StatusBar } from "expo-status-bar"
import { SmallButton } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { Container, InputContainer, TwoInputContainer } from "../../components/container/style"
import { HeaderImage } from "../../components/headerImage/headerImage"
import { InputLabel, InputLabelBlack, SmallInputLabel } from "../../components/input/inputLabel"
import { ImageModal } from "../../components/modal/modal"
import { IconReturn } from "../../components/navigationIcons/navigationIcons"
import ScrollViewProfile from "../../components/scrollViewProfile/scrollViewProfile"
import { SubTitle, Title } from "../../components/title/title"

const EditProfile = ({ navigation }) => {
    return (
        <Container>
            <IconReturn navigation={navigation} />

            <HeaderImage requireImage={require("../../assets/img/Rectangle425.png")} />

            <ImageModal>
                <Title>Richard Kosta</Title>
                <SubTitle>richard.kosta@email.com</SubTitle>
            </ImageModal>

            <ScrollViewProfile>
                <Container>

                    <InputContainer>
                        <InputLabelBlack title={"Data de nascimento"} placeholder={"04/10/1999"} />
                        <InputLabelBlack title={"CPD"} placeholder={"143553660123"} />
                        <InputLabelBlack title={"Endereço"} placeholder={"Rua dos Açores, 132"} />

                        <TwoInputContainer>
                            <SmallInputLabel title={"CEP"} placeholder={"XXXXXXXX"} />
                            <SmallInputLabel title={"CIDADE"} placeholder={"Ex: SP"} />
                        </TwoInputContainer>

                    </InputContainer>
                        <SmallButton><ButtonTitle>SALVAR</ButtonTitle></SmallButton>
                </Container>
            </ScrollViewProfile>

        </Container>
    )
}

export default EditProfile