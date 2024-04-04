import { Container, InputContainer } from "../../components/container/style";
import { Logo } from "../../components/logo/style";
import { SubTitle, Title } from "../../components/title/title";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { ButtonTitle } from "../../components/button/buttonTitle";
import { LinkBlueSmall } from "../../components/links/links";
import Login from "../login/login";

const CreateAccountInfo = ({ navigation }) => {
    const [rg, setRg] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [nome, setNome] = useState('')

    const Cadastro = async () => {
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
            })

            if (!response.ok) {
              const data = await response.json();
              Alert.alert(data.error);
            } else  {
            setRg("");
            setCpf("");
            setDataNascimento("");
            setCep("");
            setLogradouro("");
            setNumero("");
            setCidade("");
            setNome("");
            setError("");
            console.log(e.Alert);
            Alert.alert("Conta criada");

            navigation.navigate("Login");
          }
        } catch (e) {
            console.log(e);
            Alert.alert('')
        }
      };

    return (
        <Container>
            <Logo source={require("../../assets/img/VitalHubLogo.png")} />

            <Title>Criar conta</Title>

            <SubTitle>Insira suas informações pessoais para realizar seu cadastro.</SubTitle>

            <InputContainer>
                <Input 
                    placeholder={"rg"}
                    value={rg}
                    onChangeText={(txt) => setRg(txt)}
                />
                <Input 
                  placeholder={"cpf"}
                  value={cpf}
                  onChangeText={(txt) => setCpf(txt)}
                />
                <Input 
                  placeholder={"dataNascimento"}
                  value={dataNascimento}
                  onChangeText={(data) => setDataNascimento(data)}
                />
                <Input 
                  placeholder={"cep"}
                  value={cep}
                  onChangeText={(txt) => setCep(txt)}
                />
                <Input 
                  placeholder={"logradouro"}  
                  value={logradouro}
                  onChangeText={(txt) => setLogradouro(txt)}
                />
                <Input 
                  placeholder={"numero"}
                  value={numero}
                  onChangeText={(txt) => setNumero(txt)}
                />
                <Input 
                  placeholder={"cidade"}
                  value={cidade}
                  onChangeText={(txt) => setCidade(txt)}
                />
                <Input 
                  placeholder={"nome"}
                  value={nome}
                  onChangeText={(txt) => setNome(txt)}
                />
            </InputContainer>

            <Button onPress={() => {navigation.navigate(CreateAccount)}}>
                <ButtonTitle>PRÓXIMO</ButtonTitle>
            </Button>

            <LinkBlueSmall onPress={() => {navigation.navigate(Login)}}>Cancelar</LinkBlueSmall>
        </Container>
    )
}

export default CreateAccountInfo;