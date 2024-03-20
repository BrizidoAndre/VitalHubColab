
import { Container, InputContainer, LabelInputContainer, TwoInputContainer } from "../../components/container/style"
import { ImageModal } from "../../components/modal/modal"
import { SubTitle, Title } from "../../components/title/title"
import { InputLabelBlack, SmallInputLabel } from "../../components/input/inputLabel"
import { SmallButton } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { HeaderImage } from "../../components/headerImage/headerImage"
import ScrollViewProfile from "../../components/scrollViewProfile/scrollViewProfile.js"
import EditProfile from "../editProfile/editProfile.js"

const Profile = ({ navigation }) => {

    return (
        <Container>
            <HeaderImage requireImage={require("../../assets/img/Rectangle425.png")} />


            <ScrollViewProfile>
                <Title>Richard Kosta</Title>
                <SubTitle>richard.kosta@email.com</SubTitle>
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

                    <InputContainer>
                        <TwoInputContainer>
                            <SmallButton><ButtonTitle>SALVAR</ButtonTitle></SmallButton>
                            <SmallButton onPress={() => { navigation.navigate(EditProfile) }}
                            ><ButtonTitle>EDITAR</ButtonTitle></SmallButton>
                        </TwoInputContainer>
                    </InputContainer>
                </Container>
            </ScrollViewProfile>
        </Container>
    )

}

export default Profile