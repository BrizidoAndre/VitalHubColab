// Import de imagens
import image from "../../assets/img/Rectangle425.png"

// Import do react
import { useEffect, useState } from "react"
import { CalendarContainer, FlatlistContainer, HomeContainer, InputContainer, RowContainer } from "../../components/container/style"
import { NavButtonComponent } from "../../components/navButton/navButton"
import { Alert, ScrollView } from "react-native"
import Header from "../../components/header/header"
import Card from "../../components/card/card"
import { CancelAppointment, CreateAppointment, DoctorAppointment, DoneAppointment, ShowRecord } from "../../components/modalActions/modalActions"
import Appointment from "../appointment/appointment"
import { Mont20600, Title } from "../../components/title/title"
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
        doctorAppointment: false,
        done:false
    })
    // Use state para o modal do prontuário
    const [objModalRecord, setObjModalRecord] = useState({})

    // state para a data que está sendo selecionada para o usuário
    // eu estou setando a data como hoje no useEffect
    const [dateSelected, setDateSelected] = useState(parseInt(new Date().toLocaleDateString('default', { day: 'numeric' })))

    // useState das consultas a serem usadas pelos modais
    const [itemForModal, setItemForModal] = useState()


    // useState para recarregar as informações no flatlist
    const [refreshing, setRefreshing] = useState(false)


    // função de filtragem dos dados 
    const filterByStatus = (data) => {
        if (data.situacao.situacao === "Pendentes" && selected.agendadas) {
            return data
        }
        else if (data.situacao.situacao === "Realizados" && selected.realizadas) {
            return data
        }
        else if (data.situacao.situacao === "Cancelados" && selected.canceladas) {
            return data
        }
    }

    const showRightModal = (item) => {
        if (item.situacao.situacao === 'Pendentes') {
            alert('estou sendo executado')
            setModal({ cancel: true })
            setItemForModal(item.id)
        }
        else if (item.situacao.situacao === 'Realizados') {
            setModal({ record: true })
            setObjModalRecord(item)
        }
    }

    const showRightCardPress = (item) => {
        if (item.situacao.situacao === 'Pendentes' && !isMedic) {
            setObjModalRecord(item)
            setModal({ doctorAppointment: true })
        } else if (item.situacao.situacao === 'Realizados' && !isMedic) {
            setObjModalRecord(item)
            setModal({ record: true })
        } else if (item.situacao.situacao === 'Cancelados' && isMedic) {
            setObjModalRecord(item)
            setModal({ record: true })
        }  else if (item.situacao.situacao === 'Pendentes' && isMedic) {
            setObjModalRecord(item)
            setModal({ done: true })
            setItemForModal(item.id)
        } 
    }

    function resetModal() {
        setModal({})
        setItemForModal('')
    }

    // função para verificar se o usuário deu permissões para usar notificações
    async function verifyStatus() {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            Notifications.requestPermissionsAsync();
        }
    }


    //? As funções a partir daqui serão voltadas para o consumo da api 
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

    async function notificationDone(){
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Consulta realizada",
                body: 'Sua consulta foi efetuada neste instante',
            },
            trigger: null
        })
    }

    async function setIfMedic() {
        const user = await userDecodeToken()

        try {

            if (user.role === 'Medico') {
                setIsMedic(true)
                return;
            }
            setIsMedic(false)

        } catch (e) {
            console.log(e)
        }


    }

    async function listarConsultas() {
        try {
            setRefreshing(true)

            const user = await userDecodeToken()

            let dateNow = new Date()
            const date = {
                year: dateNow.toLocaleDateString('default', { year: 'numeric' }),
                month: dateNow.toLocaleDateString('default', { month: "numeric" }),
            }

            // constante para definir a data de hoje usando a seleção de data da home
            const dateString = date.year + '-' + date.month + '-' + dateSelected


            const res = await api.get((user.role === 'Medico' ? '/Medicos' : '/Pacientes') + '/BuscarPorData?data=' + dateString + '&id=' + user.id)

            const data = await res.data


            setListAppointment(data)

            setRefreshing(false)
        } catch (error) {
            console.log('Erro na api');
            console.log(error)
        }
    }

    // função para mudar uma consulta para cancelado
    async function changeAppointmentToCancel() {
        try {

            const res = await api.put('/Consultas/Status?idConsulta=' + itemForModal + '&status=Cancelados')

            if (res.status === 200) {
                notificationCancel();
                resetModal()
                listarConsultas()
            }
            else {
                resetModal()
                Alert("Erro", "Algum erro inesperado aconteceu!!!")
            }

        } catch (error) {
            console.log(error);
        }
    }

    // função para mudar uma consulta para realizado
    async function changeAppointmentToDone() {
        try {
            const res = await api.put('/Consultas/Status?idConsulta=' + itemForModal + '&status=Realizados')

            if (res.status === 200) {
                notificationDone();
                resetModal()
                listarConsultas()
            }
            else {
                resetModal()
                Alert("Erro", "Algum erro inesperado aconteceu!!!")
            }

        } catch (error) {
            console.log(error);
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
                        buttonTitle={'Realizados'} />
                    <NavButtonComponent
                        onPress={() => { setSelected({ canceladas: true }) }}
                        selected={selected.canceladas}
                        buttonTitle={'Cancelados'} />
                </RowContainer>
            </HomeContainer>

            <FlatlistContainer
                data={listAppointment.filter(filterByStatus)}
                renderItem={({ item }) =>
                    <Card
                        item={item}
                        image={image}
                        onPress={() => showRightModal(item)}
                        onPressCard={() => showRightCardPress(item)}
                        isMedic={isMedic} />}
                refreshing={refreshing}
                onRefresh={listarConsultas}
                ListEmptyComponent={<Title>Nenhuma consulta!</Title>}
            />

            <CancelAppointment
                hideModal={modal.cancel}
                onPressCancel={() => resetModal()}
                onPress={() => { changeAppointmentToCancel() }}
            />

            <DoneAppointment
                hideModal={modal.done}
                onPressCancel={()=> resetModal()}
                onPress={() => { changeAppointmentToDone()}}
            />

            <ShowRecord
                hideModal={modal.record}
                onPressCancel={() => { setModal({ record: false }) }}
                onPressNavigate={() => { navigation.navigate("Appointment", { objModalRecord, isMedic }) }}
                item={objModalRecord}
                isMedic={isMedic}
            />



            <CreateAppointment
                hideModal={modal.setAppointment}
                onPressCancel={() => resetModal()}
                navigation={navigation} />

            <DoctorAppointment
                hideModal={modal.doctorAppointment}
                item={objModalRecord}
                onPressCancel={() => resetModal()}
                onPressNavigate={() => {
                    resetModal()
                    navigation.navigate('ShowLocation', { objModalRecord })
                }}
            />

            {isMedic ? <></> : <Stethoscope onPress={() => setModal({ setAppointment: true })} />}


        </>
    )
}

export default Home