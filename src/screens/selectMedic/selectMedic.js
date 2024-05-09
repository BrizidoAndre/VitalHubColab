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

// importando axios para consumo da api

const SelectMedic = ({ route, navigation }) => {

    const [selected, setSelected] = useState('')

    const [newContinueAppointment, setNewAppointment] = useState({})

    const { newAppointment } = route.params
    
    // use state para armazenar a lista de médicos
    const [medicosLista, setMedicosLista] = useState([])

    // função para buscar a lista de médicos
    async function loadMedics() {
        try {
            // instanciando a chamada de api
            const response = await api.get('/Medicos')

            const list = response.data

            setMedicosLista(list)

        } catch (error) {
            console.log(error);
        }
    }


    function nextPage(){
        if(selected){
            navigation.replace("SelectData", {newContinueAppointment} )
            setSelected()
        }
        else{
            Alert.alert("Erro ao cadastrar consulta", "Você ainda não selecionou um médico para sua consulta!")
        }
    }

    useEffect(() => {
        loadMedics()
        setNewAppointment(newAppointment)
    },[])

    return (
        <WithoutHeader>
            <Title>Selecionar Médico</Title>

            <FlatlistClinicCard
                data={medicosLista}
                keyExtractor={(item) => item.id}
                renderItem={({item}) =>
                    <MedicCard
                        select={selected}
                        onPress={() => {
                            setSelected(item.id)
                            setNewAppointment({
                                ...newContinueAppointment,
                                medicoId:item.id,
                                medico:item
                            })
                        }}
                        item={item}
                    />}
            />


            <Button onPress={() => nextPage()}><ButtonTitle>CONTINUAR</ButtonTitle></Button>
            <LinkBlueSmall onPress={() => navigation.goBack()}>Cancelar</LinkBlueSmall>
        </WithoutHeader >
    )
}

export default SelectMedic