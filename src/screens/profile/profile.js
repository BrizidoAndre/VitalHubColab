import { Container, Container11, InputContainer, LabelInputContainer, TwoInputContainer } from "../../components/container/style"
import { ImageModal } from "../../components/modal/modal"
import { SubTitle, Title } from "../../components/title/title"
import { InputLabelBlack, SmallInputLabel } from "../../components/input/inputLabel"
import { Button, ButtonLogout, SmallButton } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { HeaderImage } from "../../components/headerImage/headerImage"
import ScrollViewProfile from "../../components/scrollViewProfile/scrollViewProfile.js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"
import { userDecodeToken } from "../../utils/auth.js"
import { useEffect, useRef, useState } from "react"
import api from "../../service/service.js"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { AddPhotoButton } from "../../components/addphoto/styles.js"
import { CameraModal } from "../../components/modalActions/modalActions.js"

const Profile = ({ navigation }) => {

  // modal da câmera para abri o modal
  const [openModal, setOpenModal] = useState(false)
  const cameraRef = useRef(null)
  const [photo, setPhoto] = useState(null) 

  async function capturePhoto() {
    if (cameraRef) {
        const image = await cameraRef.current.takePictureAsync();

        console.log(image.uri);
        setPhoto(image.uri)
        setOpenModal(true)
    }

    // if(photo){
    //     await MediaLibrary.createAssetAsync(photo)
    // }
}

async function savePhoto() {

}

  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    endereco: '',
    cep: '',
    cidade: '',
  });

  const loadProfile = async () => {
    try {
      const token = await userDecodeToken();
      if (token) {
        const res = await api.get('/Pacientes/BuscarPorId?id=' + token.id);
        const data = await res.data;
        data.dataNascimento = await data.dataNascimento.split(['T'])[0];
        setUserData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const saveData = async () => {
    try {
      await api.setItem('userData', JSON.stringify(userData));
      navigation.navigate('Home');
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <HeaderImage requireImage={require("../../assets/img/Rectangle425.png")} />

      <Container11>

        {/* botao da foto */}

        <AddPhotoButton onPress={() => setOpenModal(true)}>
          <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb" />
        </AddPhotoButton>

      </Container11>


      <ScrollViewProfile>
        <Container>
          {userData.nome ? (
            <>
              <Title>{userData.nome}</Title>
              <SubTitle>{userData.email}</SubTitle>
              <InputContainer>
                <InputLabelBlack
                  title={"Data de nascimento"}
                  value={userData.dataNascimento}
                  onChangeText={text => setUserData({ ...userData, dataNascimento: text })}
                  name="dataNascimento"
                />
                <InputLabelBlack
                  title={"CPF"}
                  value={userData.cpf}
                  onChangeText={text => setUserData({ ...userData, cpf: text })}
                  name="cpf"
                />
                <InputLabelBlack
                  title={"Endereço"}
                  value={userData.endereco}
                  onChangeText={text => setUserData({ ...userData, endereco: text })}
                  name="endereco"
                />
                <TwoInputContainer>
                  <SmallInputLabel
                    title={"CEP"}
                    value={userData.cep}
                    onChangeText={text => setUserData({ ...userData, cep: text })}
                    name="cep"
                  />
                  <SmallInputLabel
                    title={"CIDADE"}
                    value={userData.cidade}
                    onChangeText={text => setUserData({ ...userData, cidade: text })}
                    name="cidade"
                  />
                </TwoInputContainer>
              </InputContainer>
              <Button onPress={() => saveData(navigation.navigate('Home'))}>
                <ButtonTitle>SALVAR</ButtonTitle>
              </Button>

              <CameraModal
                getMediaLibrary={true}
                openModal={openModal}
                setOpenModal={setOpenModal}
                cameraRef={cameraRef}
                capturePhoto={() => capturePhoto()}
              />

            </>
          ) : (
            <>
              <InputContainer>
                <InputLabelBlack
                  title={"Email"}
                  value={userData.email}
                  onChangeText={text => setUserData({ ...userData, email: text })}
                  name="email"
                />
                <InputLabelBlack
                  title={"Data de nascimento"}
                  value={userData.dataNascimento}
                  onChangeText={text => setUserData({ ...userData, dataNascimento: text })}
                  name="dataNascimento"
                />
                <InputLabelBlack
                  title={"CPF"}
                  value={userData.cpf}
                  onChangeText={text => setUserData({ ...userData, cpf: text })}
                  name="cpf"
                />
                <InputLabelBlack
                  title={"Endereço"}
                  value={userData.endereco}
                  onChangeText={text => setUserData({ ...userData, endereco: text })}
                  name="endereco"
                />
                <TwoInputContainer>
                  <SmallInputLabel
                    title={"CEP"}
                    value={userData.cep}
                    onChangeText={text => setUserData({ ...userData, cep: text })}
                    name="cep"
                  />
                  <SmallInputLabel
                    title={"CIDADE"}
                    value={userData.cidade}
                    onChangeText={text => setUserData({ ...userData, cidade: text })}
                    name="cidade"
                  />
                </TwoInputContainer>
              </InputContainer>
              <Button onPress={() => saveData(navigation.navigate('Home'))}>
                <ButtonTitle>SALVAR</ButtonTitle>
              </Button>
            </>
          )}
        </Container>
      </ScrollViewProfile>
    </Container>
  );
};

export default Profile;