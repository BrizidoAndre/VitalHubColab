import { Center } from "../container/style"
import { StatusData, StatusGray, StatusGreen, StatusStar } from "../status/status"
import { Mont12500Blue, Mont12500Red, Mont16600, Sand14400, Sand14500Gray, Sand14600 } from "../title/title"
import { CardBox, CardBoxSelect, ClinicCardBox, ClinicCardBoxSelected, Container, ImageCard, ItemCardBox, MedicCardBox, RowCardBox, TextCardBox } from "./styles"


// importando uma imagem mocada
import image from '../../assets/img/Rectangle425.png'


const Card = ({item, image, onPress = null, onPressCard, isMedic }) => {

    const status = item.situacao.situacao;
    const nivel = item.prioridade.prioridade;


    function calculateAge(){

        const yearNow = new Date()
        
        const birth = new Date(item.paciente.dataNascimento)
        const diff_ms = Date.now() - birth.getTime()


        var age_dt = new Date(diff_ms); 

        result =  Math.abs(age_dt.getUTCFullYear() - yearNow.getFullYear());

        return yearNow.getFullYear()
    }

    const statusCheck = () => {
        if (status === "Pendentes") {
            return (

                <RowCardBox>
                    <StatusGreen time={item.dataConsulta.substring(11,16)} />
                    <Center>
                        <Mont12500Red onPress={onPress}>Cancelar</Mont12500Red>
                    </Center>
                </RowCardBox>
            )
        } else if (status === "Realizados") {
            return (
                <RowCardBox>
                    <StatusGray time={item.dataConsulta.substring(11,16)} />
                    <Center>
                        <Mont12500Blue onPress={onPress}>Ver Prontuário</Mont12500Blue>
                    </Center>
                </RowCardBox>
            )

        } else if (status === "Cancelados") {
            return (
                <RowCardBox>
                    <StatusGray time={item.dataConsulta.substring(11,16)} />
                    <Center>
                    </Center>
                </RowCardBox>
            )

        }
    }

    function priorityCheck(){
        switch (nivel) {
            case 1:
                return 'Rotina'
                break;
            case 2:
                return 'Exame'
                break;
            case 3:
                return 'Urgência'
                break;
        
            default:
                break;
        }
    }

    return (
        <CardBox onPress={onPressCard}>
            <ImageCard source={!isMedic ?{uri:item.medicoClinica.medico.idNavigation.foto}:{uri:item.paciente.idNavigation.foto}} />
            <Container>

                <TextCardBox>
                    {!isMedic ?<Mont16600>{item.medicoClinica.medico.idNavigation.nome}</Mont16600> : <Mont16600>{item.paciente.idNavigation.nome}</Mont16600>}
                    {!isMedic ?<Sand14400>CRM {item.medicoClinica.medico.crm} . {priorityCheck()}</Sand14400> : <Sand14400>{calculateAge()} anos · {priorityCheck()}</Sand14400>}
                    
                </TextCardBox>


                {statusCheck()}
            </Container>
        </CardBox>
    )
}

export const ClinicCard = ({ item, grade, time, onPress, select }) => {



    if (select === item.id) {
        return (
            <ClinicCardBoxSelected>
                <ItemCardBox>
                    <Mont16600 style={{maxWidth:200}}>{item.nomeFantasia}</Mont16600>
                    <Sand14600>{item.endereco.logradouro} {item.endereco.numero}</Sand14600>
                </ItemCardBox>

                <ItemCardBox>
                    <StatusStar grade={grade} />
                    <StatusData time={time} />
                </ItemCardBox>
            </ClinicCardBoxSelected>
        )
    }
    else {
        return (
            <ClinicCardBox onPress={onPress}>
                <ItemCardBox>
                    <Mont16600 style={{maxWidth:200}}>{item.nomeFantasia}</Mont16600>
                    <Sand14600>{item.endereco.logradouro} {item.endereco.numero}</Sand14600>
                </ItemCardBox>

                <ItemCardBox>
                    <StatusStar grade={grade} />
                    <StatusData time={time} />
                </ItemCardBox>
            </ClinicCardBox>
        )
    }
}

export const MedicCard = ({ item, onPress, select }) => {


    if (select === item.id) {
        return (
            <CardBoxSelect>
                <ImageCard source={{uri: item.idNavigation.foto}} />
                <MedicCardBox>
                    <Mont16600>{item.idNavigation.nome}</Mont16600>
                    <Sand14500Gray>{item.especialidade.especialidade1}</Sand14500Gray>
                </MedicCardBox>
            </CardBoxSelect>
        )
    }

    else {
        return (
            <CardBox onPress={onPress}>
                <ImageCard source={{uri: item.idNavigation.foto}} />
                <MedicCardBox>
                    <Mont16600>{item.idNavigation.nome}</Mont16600>
                    <Sand14500Gray>{item.especialidade.especialidade1}</Sand14500Gray>
                </MedicCardBox>
            </CardBox>
        )
    }
}

export default Card