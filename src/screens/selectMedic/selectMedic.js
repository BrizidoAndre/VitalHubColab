import { Button } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { ClinicCard, MedicCard } from "../../components/card/card"
import { FlatlistClinicCard, WithoutHeader } from "../../components/container/style"
import { LinkBlueSmall } from "../../components/links/links"
import { Title } from "../../components/title/title"

// import de imagens
import image from '../../assets/img/Rectangle425.png'
import { useEffect, useState } from "react"
import api from "../../service/service"
import { Alert } from "react-native"
import { PersonalModal } from "../../components/modalActions/modalActions"

// importando axios para consumo da api

const SelectMedic = ({ route, navigation }) => {

    const [selected, setSelected] = useState('')

    const [newContinueAppointment, setNewAppointment] = useState({})

    const [hideModal, setHideModal] = useState(false);
    const [modal, setModal] = useState({
        title: '',
        subtitle: ''
    })

    const { newAppointment } = route.params

    // use state para armazenar a lista de médicos
    const [medicosLista, setMedicosLista] = useState([])

    // função para buscar a lista de médicos
    async function loadMedics() {
        try {
            // instanciando a chamada de api
            const response = await api.get('/Medicos/BuscarPorIdClinica?id=' + newAppointment.clinicaId)

            const list = response.data

            setMedicosLista(list)

        } catch (error) {
            console.log(error);
        }
    }


    function nextPage() {
        if (selected) {
            navigation.replace("SelectData", { newContinueAppointment })
            setSelected()
        }
        else {
            setModal({
                title:"Erro ao cadastrar consulta",
                subtitle: "Você ainda não selecionou um médico para sua consulta!"
            })
            setHideModal(true)
        }
    }

    useEffect(() => {
        loadMedics()
        setNewAppointment(newAppointment)
        console.log(newAppointment.clinicaId)
    }, [])

    return (
        <>
            <WithoutHeader>
                <Title>Selecionar Médico</Title>

                <FlatlistClinicCard
                    data={medicosLista}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <MedicCard
                            select={selected}
                            onPress={() => {
                                setSelected(item.id)
                                console.log(item.idNavigation.id)
                                setNewAppointment({
                                    ...newContinueAppointment,
                                    medicoId: item.idNavigation.id,
                                    medico: item
                                })
                            }}
                            item={item}
                        />}
                />


                <Button onPress={() => nextPage()}><ButtonTitle>CONTINUAR</ButtonTitle></Button>
                <LinkBlueSmall onPress={() => navigation.goBack()}>Cancelar</LinkBlueSmall>
            </WithoutHeader >
            <PersonalModal
                title={modal.title}
                subTitle={modal.subtitle}
                hideModal={hideModal}
                onPressCancel={()=>{setHideModal(false)}}
            />
        </>
    )
}

export default SelectMedic