// Import de imagens
import image from "../../assets/img/Rectangle425.png"

// Import do react
import { useEffect, useReducer, useState } from "react"
import { CalendarContainer, FlatlistContainer, HomeContainer, InputContainer, RowContainer } from "../../components/container/style"
import { NavButtonComponent } from "../../components/navButton/navButton"
import { ScrollView } from "react-native"
import Header from "../../components/header/header"
import Card from "../../components/card/card"
import { CancelAppointment, CreateAppointment, DoctorAppointment, ShowRecord } from "../../components/modalActions/modalActions"
import Appointment from "../appointment/appointment"
import { Mont20600 } from "../../components/title/title"
import { ProduceDate } from "../../components/calendar/calendar"
import { getToday } from "../../../Utils"
import Stethoscope from "../../components/stethoscope/stethoscope"

// importando biblioteca de notificação
import * as Notifications from 'expo-notifications'
import { userDecodeToken } from "../../utils/auth"
import api from "../../service/service"

// para configurar o comportamento das notificações
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        // para mostrar a notificação na tela
        shouldShowAlert: true,
        // configura o som das notificações
        shouldPlaySound: true,
        // configura o número de notificações no icon do app
        shouldSetBadge: false,
    }),
})

const Home = ({ navigation }) => {

    const rawDataMedic = [
        {
            id: "imasdf",
            name: 'Dr. Claudios',
            specialty: 'Clínico Geral',
            CRM: '15286',
            age: 22,
            image: image,
            nivel: 'Rotina',
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "a"
        },
        {
            id: "imasdf",
            name: 'sem doutor nenhum não so',
            specialty: 'Clínico Geral',
            CRM: '15286',
            age: 22,
            image: image,
            nivel: 'Rotina',
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "r"
        },
        {
            id: "imasdf",
            name: 'Dr. Claudio',
            specialty: 'Clínico Geral',
            CRM: '15286',
            age: 22,
            image: image,
            nivel: 'Rotina',
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "c"
        },
    ]

    // state de lista das consultas
    const [listAppointment, setListAppointment] = useState([])

    
    //! VER SE O USUÁRIO É UM MÉDICO
    const [isMedic, setIsMedic] = useState(false);


    // use states para os agendados realizado e cancelado
    const [selected, setSelected] = useState({
        agendadas: true,
        realizadas: false,
        canceladas: false,
    });
    // Use states para os modais
    const [modal, setModal] = useState({
        cancel: false,
        record: false,
        setAppointment: false,
        doctorAppointment: false
    })
    // Use state para o modal do prontuário
    const [objModalRecord, setObjModalRecord] = useState({})

    // state para a data que está sendo selecionada para o usuário
    // eu estou setando a data como hoje no useEffect
    const [dateSelected, setDateSelected] = useState(parseInt(new Date().toLocaleDateString('default',{day:'numeric'}))) 



    // função de filtragem dos dados 
    const filterByStatus = (data) => {
        if (data.situacao.situacao === "Pendentes" && selected.agendadas) {
            return data
        }
        else if (data.situacao.situacao === "Realizadas" && selected.realizadas) {
            return data
        }
        else if (data.situacao.situacao === "Cancelados" && selected.canceladas) {
            return data
        }
    }




    const showRightModal = (obj) => {
        if (obj.status === "a") {
            setModal({ cancel: true })
        }
        else if (obj.status === 'r' && isMedic) {
            setModal({ record: true })
            setObjModalRecord(obj)
        }
    }

    const showRightCardModal = (item) => {
        if (item.status === 'a' && !isMedic) {
            setModal({ doctorAppointment: true })
            setObjModalRecord(item)
        } else if (item.status === 'r' && !isMedic) {
            navigation.navigate("Appointment")
        } else if (item.status === 'a' && isMedic) {
            setModal({ record: true })
            setObjModalRecord(item)
        }
    }

    // função para verificar se o usuário deu permissões para usar notificações
    async function verifyStatus() {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            Notifications.requestPermissionsAsync();
        }
    }

    // função para criar a notificação de cancelar
    async function notificationCancel() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Consulta cancelada",
                body: 'Sua consulta foi certamente cancelada',
            },
            trigger: null
        })
    }

    async function setIfMedic() {
        const user = await userDecodeToken()

        if (user.role === 'Medico') {
            setIsMedic(true)
            return;
        }
        setIsMedic(false)

    }

    async function listarConsultas() {
        try {

            const user = await userDecodeToken()

            let dateNow = new Date()
            const date = {
                year: dateNow.toLocaleDateString('default',{year:'numeric'}),
                month: dateNow.toLocaleDateString('default',{month:"numeric"}),
            }

            const dateString = date.year + '-' + date.month + '-' + dateSelected
            

            const res = await api.get('/Pacientes/BuscarPorData?data='+dateString+'&id=' + user.id)

            const data = await res.data

            setListAppointment(data)

            console.log(data);

        } catch (error) {
            console.log('Erro na api');
            console.log(error)
        }
    }

    useEffect(() => {
        verifyStatus()
        setIfMedic()
    }, [])

    useEffect(() => {
        listarConsultas()
    }, [dateSelected])



    return (
        <>
            <Header navigation={navigation} />
            <HomeContainer>
                <CalendarContainer>
                    <Mont20600>{getToday()}</Mont20600>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <RowContainer>
                            <ProduceDate
                                i={0}
                                selected={dateSelected}
                                setSelected={setDateSelected}
                            />

                            <ProduceDate
                                i={1}
                                selected={dateSelected}
                                setSelected={setDateSelected}
                            />

                            <ProduceDate
                                i={2}
                                selected={dateSelected}
                                setSelected={setDateSelected}
                            />

                            <ProduceDate
                                i={3}
                                selected={dateSelected}
                                setSelected={setDateSelected}
                            />

                            <ProduceDate
                                i={4}
                                selected={dateSelected}
                                setSelected={setDateSelected}
                            />

                            <ProduceDate
                                i={5}
                                selected={dateSelected}
                                setSelected={setDateSelected}
                            />

                            <ProduceDate
                                i={6}
                                selected={dateSelected}
                                setSelected={setDateSelected} />

                        </RowContainer>
                    </ScrollView>
                </CalendarContainer>

                <RowContainer>
                    <NavButtonComponent
                        onPress={() => { setSelected({ agendadas: true }) }}
                        selected={selected.agendadas}
                        buttonTitle={'Pendentes'} />
                    <NavButtonComponent
                        onPress={() => { setSelected({ realizadas: true }) }}
                        selected={selected.realizadas}
                        buttonTitle={'Realizadas'} />
                    <NavButtonComponent
                        onPress={() => { setSelected({ canceladas: true }) }}
                        selected={selected.canceladas}
                        buttonTitle={'Canceladas'} />
                </RowContainer>
            </HomeContainer>



            <FlatlistContainer
                data={listAppointment.filter(filterByStatus)}
                renderItem={({ item }) =>
                    <Card
                        name={item.medicoClinica.medico.idNavigation.nome}
                        age={item.age}
                        image={image}
                        status={item.situacao.situacao}
                        time={item.dataConsulta}
                        nivel={item.prioridade.prioridade}
                        onPress={() => showRightModal(item)}
                        onPressCard={() => showRightCardModal(item)} 
                        isMedic={true}
                        CRM={item.medicoClinica.medico.crm}/>} 
                        />

            <CancelAppointment
                hideModal={modal.cancel}
                onPressCancel={() => setModal({ cancel: false })}
                onPress={() => { notificationCancel(); setModal({ cancel: false }) }}
            />

            <ShowRecord
                item={objModalRecord}
                hideModal={modal.record}
                onPressCancel={() => { setModal({ record: false }) }}
                onPressNavigate={() => { navigation.navigate("Appointment") }}
            />



            <CreateAppointment
                hideModal={modal.setAppointment}
                onPressCancel={() => setModal({ setAppointment: false })}
                navigation={navigation} />

            <DoctorAppointment
                hideModal={modal.doctorAppointment}
                item={objModalRecord}
                onPressCancel={() => setModal({ doctorAppointment: false })}
                onPressNavigate={() => navigation.navigate('ShowLocation')}
            />

            {isMedic ? <></> : <Stethoscope onPress={() => setModal({ setAppointment: true })} />}


        </>
    )
}

export default Home