import { Container, Container11, InputContainer, LabelInputContainer, TwoInputContainer } from "../../components/container/style"
import { ImageModal } from "../../components/modal/modal"
import { SubTitle, Title } from "../../components/title/title"
import { InputLabelBlack, SmallInputLabel } from "../../components/input/inputLabel"
import { Button, ButtonLogout, SmallButton, SmallButtonGreen } from "../../components/button/button"
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
import { CameraComp } from "../../components/CameraComp/CameraComp.js"
import { Camera } from "expo-camera"
import { ActivityIndicator } from "react-native"
import { NavigationHelpersContext } from "@react-navigation/native"

const Profile = ({ navigation, route }) => {



  // constante para a imagem ficar salva
  const [photo, setPhoto] = useState(null)

  const cameraRef = useRef(null)



  // state para regrar os valores do novo usuário
  const [createUser, setCreateUser] = useState({
    nome: '',
    email: '',
    senha: '',
    rg: '',
    cpf: '',
    dataNascimento: '',
    cep: '',
    logradouro: '',
    numero: '',
    cidade: '',
    foto: '',
    Arquivo: '',
    idTipoUsuario: ''
  })

  // useState para dealbilitar o botão
  const [disable, setDisable] = useState(false)

  const [isNewUser, setIsNewUser] = useState(true);

  // Use state para as fotos e modais
  const [openModal, setOpenModal] = useState(false)
  const [uriCameraCapture, setUriCameraCapture] = useState({
    uri: 'https://blobvitalhubg01m.blob.core.windows.net/blobvitalhubg01mcontainer/user-profile-icon-free-vector.jpg',
    data: '',
  })

  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    cep: '',
    cidade: '',
  });

  const loadProfile = async () => {
    try {
      const token = await userDecodeToken();

      // Se a página NÃO receber as informações do novo usuário
      if (token) {
        const res = await api.get('/Pacientes/BuscarPorId?id=' + token.id);
        const data = await res.data;

        console.log(data)

        setUriCameraCapture({
          ...uriCameraCapture,
          data: data.idNavigation.foto
        })

        data.dataNascimento = await data.dataNascimento.split(['T'])[0];

        setUserData({
          ...userData,
          id: token.id,
          nome: data.idNavigation.nome,
          email: data.idNavigation.email,
          dataNascimento: data.dataNascimento,
          cpf: data.cpf,
          rg: data.rg,
          logradouro: data.endereco.logradouro,
          numero: data.endereco.numero.toString(),
          cep: data.endereco.cep,
          cidade: data.endereco.cidade
        })
      }

      // O que vai acontecer quando um usuário for criado
      else {
        // Informações para cadastro do usuário
        const { user } = route.params;
        setCreateUser({
          ...user,
          nome: user.nome,
          email: user.email,
          senha: user.senha,
          idTipoUsuario: user.idTipoUsuario

        })
        setIsNewUser(false)
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function removeUser() {
    await AsyncStorage.removeItem('token')
    navigation.navigate('Login')
  }

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    AlterarFotoPerfil()
  }, [uriCameraCapture])

  async function AlterarFotoPerfil() {
    const formData = new FormData();
    formData.append("arquivo", {
      uri: uriCameraCapture.data,
      name: `image.${uriCameraCapture.data.split(".")[1]}`,
      type: `image/${uriCameraCapture.data.split(".")[1]}`
    })

    await api.put(`/usuario/AlterarFotoPerfil?id=${Profile.user}`, formData, {

      headers: {
        "Content-Type": "multipart/form-data"
      }

    }).then(async response => {
      await setProfileUpdate({
      })
    }).catch(error => {
      console.log(error);
    })
  }

  async function SaveProfile() {

    if (createUser.rg.length < 9 || createUser.dataNascimento.length < 10 || createUser.cpf.length < 11 ||
    createUser.endereco.length < 1 || createUser.numero.length < 1 || createUser.cep.length < 8 || createUser.cidade.length < 1) {
      alert('Informações inválidas', 'Preencha todas as informações corretamente');
      return;
    }

    setDisable(true)

    const formData = new FormData();

    // inserindo informações de cadastro no formulário
    formData.append("Rg", createUser.rg)
    formData.append("Cpf", createUser.cpf)
    formData.append("DataNascimento", createUser.dataNascimento)
    formData.append("Cep", createUser.cep)
    formData.append("Logradouro", createUser.logradouro)
    formData.append("Numero", createUser.numero)
    formData.append("Cidade", createUser.cidade)
    formData.append("Nome", createUser.nome)
    formData.append("Email", createUser.email)
    formData.append("Senha", createUser.senha)
    formData.append("IdTipoUsuario", createUser.idTipoUsuario)

    if (photo) {
      // inserindo imagem
      formData.append("Arquivo", {
        uri: photo,
        name: `image.${photo.split('.').pop()}`,
        type: `image/${photo.split('.').pop()}`
      })
    }


    await api.post('/Pacientes', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(response => {

      navigation.navigate("Login")

    }).catch(error => {
      console.log(error);
    })
  }

  // Use effect para a requisição das permissões
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
    })
  }, [])

  async function capturePhoto() {
    if (cameraRef) {
      const image = await cameraRef.current.takePictureAsync();

      setPhoto(image.uri)
      setUriCameraCapture({ data: image.uri })

      SavePhoto()
      setOpenModal(false)
    }

    if (photo) {
      await MediaLibrary.createAssetAsync(photo)
    }
  }

  async function SavePhoto() {
    if (photo) {
      await MediaLibrary.createAssetAsync(photo)
        .then(() => {
          alert('Foto salva com sucesso');
        })
        .catch(error => {
          alert('Erro ao salvar foto')
        })
    }
  }

  async function SelectImageGallery(){
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.Images,
        quality : 1
    });

    if (!result.canceled) {
        setPhoto( result.assets[0].uri )
    }
}

  async function EditProfile() {
    try {
      const res = await api.put('/Pacientes?idUsuario=' + userData.id, userData)

      const data = await res.status;

      navigation.navigate("Home")

    } catch (e) {
      console.log(e)
    }
  }


  return (
    <>
      <Container>
        <HeaderImage requireImage={uriCameraCapture.data ? { uri: uriCameraCapture.data } : { uri: uriCameraCapture.uri }} />

        <Container11>

          {/* botao da foto */}

          <AddPhotoButton onPress={() => {setOpenModal(!openModal)}} >
            <MaterialCommunityIcons
              name="camera-plus"
              size={20}
              color="#fbfbfb" />
          </AddPhotoButton>

        </Container11>


        <ScrollViewProfile>
          <Container>
            {isNewUser ? (
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

                  <TwoInputContainer>
                    <SmallInputLabel
                      title={"Endereço"}
                      value={userData.logradouro}
                      onChangeText={text => setUserData({ ...userData, logradouro: text })}
                      name="endereco"
                    />
                    <SmallInputLabel
                      title={"Número"}
                      value={userData.numero}
                      onChangeText={text => setUserData({ ...userData, numero: text })}
                      name="numero"
                    />
                  </TwoInputContainer>

                  <TwoInputContainer>
                    <SmallInputLabel
                      title={"CEP"}
                      value={userData.cep}
                      onChangeText={text => setUserData({ ...userData, cep: text })}
                      name="cep"
                    />
                    <SmallInputLabel
                      title={"Cidade"}
                      value={userData.cidade}
                      onChangeText={text => setUserData({ ...userData, cidade: text })}
                      name="cidade"
                    />
                  </TwoInputContainer>
                </InputContainer>
                <Button onPress={() => EditProfile()}>
                  <ButtonTitle>SALVAR</ButtonTitle>
                </Button>

                <ButtonLogout onPress={() => removeUser()}><ButtonTitle>Logout</ButtonTitle></ButtonLogout>


              </>
            ) : (
              <>
                <Title>{createUser.nome}</Title>
                <SubTitle>{createUser.email}</SubTitle>
                <InputContainer>
                  <InputLabelBlack
                    title={"RG"}
                    value={createUser.rg}
                    onChangeText={text => setCreateUser({ ...createUser, rg: text })}
                    name="email"
                    inputType="numeric"
                  />
                  <InputLabelBlack
                    title={"Data de nascimento"}
                    value={createUser.dataNascimento}
                    onChangeText={text => setCreateUser({ ...createUser, dataNascimento: text })}
                    name="dataNascimento"
                  />
                  <InputLabelBlack
                    title={"CPF"}
                    value={createUser.cpf}
                    onChangeText={text => setCreateUser({ ...createUser, cpf: text })}
                    name="cpf"
                    inputType="numeric"
                  />
                  <TwoInputContainer>
                    <SmallInputLabel
                      title={"Endereço"}
                      value={createUser.logradouro}
                      onChangeText={text => setCreateUser({ ...createUser, logradouro: text })}
                      name="endereco"
                    />
                    <SmallInputLabel
                      title={"Número"}
                      value={createUser.numero}
                      onChangeText={text => setCreateUser({ ...createUser, numero: text })}
                      name="numero"
                    />
                  </TwoInputContainer>
                  <TwoInputContainer>
                    <SmallInputLabel
                      title={"CEP"}
                      value={createUser.cep}
                      onChangeText={text => setCreateUser({ ...createUser, cep: text })}
                      name="cep"
                      inputType="numeric"

                    />
                    <SmallInputLabel
                      title={"CIDADE"}
                      value={createUser.cidade}
                      onChangeText={text => setCreateUser({ ...createUser, cidade: text })}
                      name="cidade"
                    />
                  </TwoInputContainer>
                </InputContainer>
                <Button disable={disable} onPress={() => SaveProfile()}>
                  {
                    !disable ?
                      <ButtonTitle>SALVAR</ButtonTitle>
                      :
                      <ActivityIndicator />
                  }

                </Button>
              </>
            )}
          </Container>
        </ScrollViewProfile>
      </Container>

      <CameraModal
        cameraRef={cameraRef}
        getMediaLibrary={true}
        openModal={openModal}
        setOpenModal={setOpenModal}
        capturePhoto={capturePhoto}
      />

    </>
  );
};

export default Profile;