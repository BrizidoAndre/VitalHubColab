// Import de imagens
import image from "../../assets/img/Rectangle425.png"

// Import do react
import { useEffect, useState } from "react"
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

    const rawData = [
        {
            id: "imasdf",
            name: 'Richard comedouro',
            age: 22,
            nivel: 'Rotina',
            image: image,
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "a"
        },
        {
            id: "imasdf132443",
            name: 'Richard lirineu',
            age: 22,
            nivel: 'Rotina',
            image: image,
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "a"
        },
        {
            id: "imasdfd",
            name: 'Richard paylera',
            age: 22,
            nivel: 'Urgencia',
            image: image,
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "r"
        },
        {
            id: "imasdfs",
            name: 'Richard paylerado',
            age: 22,
            nivel: 'Exame',
            image: image,
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "r"
        },
        {
            id: "imasdfasd",
            name: 'Richard Rasmussem',
            age: 22,
            nivel: 'Exame',
            image: image,
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "a"
        },
        {
            id: "imasdfqwe",
            name: 'Richard Rasmussem',
            age: 22,
            nivel: 'Exame',
            image: image,
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "c"
        },
        {
            id: "imasdfzxc",
            name: 'Richard Rasmussem',
            age: 22,
            nivel: 'Urgencia',
            image: image,
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "c"
        },
        {
            id: "imasdffghhg",
            name: 'Richard Rasmussem',
            age: 22,
            nivel: 'Rotina',
            image: image,
            email: 'emaildoe@email.com',
            time: "14:00",
            status: "a"
        },
    ]

    const rawDataMedic = [
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
            status: "a"
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

    const [dateSelected, setDateSelected] = useState({
        a: true
    })


    // Dados mocados para teste do flatlist
    // Dador mocados para mostragem do perfil
    const profile = {
        name: 'Richard Rasmusse'
    }

    // função de filtragem dos dados 
    const checkStatus = (data) => {
        if (data.status === "a" && selected.agendadas === true) {
            return data
        }
        else if (data.status === "r" && selected.realizadas === true) {
            return data
        }
        else if (data.status === "c" && selected.canceladas === true) {
            return data
        }
    }

    const verifyMedic = () => {
        if (isMedic) {
            return rawData.filter(checkStatus)
        }
        else {
            return rawDataMedic.filter(checkStatus)
        }
    }

    //? AQUI ESTÁ OS DADOS
    const data = verifyMedic();




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

    useEffect(() => {
        verifyStatus()
    }, [])



    return (
        <>
            <Header item={profile} navigation={navigation} />
            <HomeContainer>
                <CalendarContainer>
                    <Mont20600>{getToday()}</Mont20600>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <RowContainer>
                            <ProduceDate
                                i={0}
                                selected={dateSelected.a}
                                onPress={() => { setDateSelected({ a: true }) }} />

                            <ProduceDate
                                i={1}
                                selected={dateSelected.b}
                                onPress={() => { setDateSelected({ b: true }) }} />

                            <ProduceDate
                                i={2}
                                selected={dateSelected.c}
                                onPress={() => { setDateSelected({ c: true }) }} />

                            <ProduceDate
                                i={3}
                                selected={dateSelected.d}
                                onPress={() => { setDateSelected({ d: true }) }} />

                            <ProduceDate
                                i={4}
                                selected={dateSelected.e}
                                onPress={() => { setDateSelected({ e: true }) }} />

                            <ProduceDate
                                i={5}
                                selected={dateSelected.f}
                                onPress={() => { setDateSelected({ f: true }) }} />

                            <ProduceDate
                                i={6}
                                selected={dateSelected.g}
                                onPress={() => { setDateSelected({ g: true }) }} />

                        </RowContainer>
                    </ScrollView>
                </CalendarContainer>

                <RowContainer>
                    <NavButtonComponent
                        onPress={() => { setSelected({ agendadas: true }) }}
                        selected={selected.agendadas}
                        buttonTitle={'Agendadas'} />
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
                data={data}
                renderItem={({ item }) =>
                    <Card
                        name={item.name}
                        age={item.age}
                        image={item.image}
                        status={item.status}
                        time={item.time}
                        nivel={item.nivel}
                        onPress={() => showRightModal(item)}
                        onPressCard={() => showRightCardModal(item)} />} />

            <CancelAppointment
                hideModal={modal.cancel}
                onPressCancel={() => setModal({ cancel: false })}
                onPress={() => {notificationCancel(); setModal({ cancel: false})}}
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
                onPress={() => { navigation.navigate("SelectClinic"); setModal({ setAppointment: false }) }} />

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