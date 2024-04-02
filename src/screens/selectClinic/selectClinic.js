import { FlatList } from "react-native"
import { Button } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { Container, FlatlistClinicCard, WithoutHeader } from "../../components/container/style"
import { LinkBlueSmall } from "../../components/links/links"
import { Title } from "../../components/title/title"
import { ClinicCard } from "../../components/card/card"
// Use states
import { useEffect, useState } from "react"
import api from "../../service/service"


const SelectClinic = ({ route,navigation }) => {

    const [selected, setSelected] = useState('')

    // criando um state para a criação de uma consulta
    const [newAppointment, setNewAppointment] = useState({
        situacaoId:"",
        pacienteId:"",
        medicoClinicaId:"",
        receitaId:"",
        prioridadeId:"",
        dataConsulta:"",
        descricao:"",
        diagnostico:"",
      })

    const {appointmentLevel} = route.params

    const [listClinics, setListClinics] = useState([])


    async function loadClinics() {
        try {
            const res = await api.get('/Clinica/ListarTodas')

            const data = await res.data

            setListClinics(data)
        } catch (error) {
            console.log('Erro');
            console.log(error);
        }
    }

    useEffect(()=>{
        loadClinics()
        setNewAppointment({
            ...newAppointment,

        })
        console.log(appointmentLevel)
    },[])


    return (
        <WithoutHeader>
            <Title>Selecionar clínica</Title>

            <FlatlistClinicCard
                data={listClinics}
                renderItem={({ item }) =>
                    <ClinicCard
                        item={item}
                        onPress={() => setSelected(item.id)}
                        select={selected}
                        grade={4.9}
                        time={'Seg-Sex'} />}
            />






            <Button onPress={() => navigation.navigate("SelectMedic")}><ButtonTitle>CONTINUAR</ButtonTitle></Button>
            <LinkBlueSmall onPress={() => navigation.goBack()}>Cancelar</LinkBlueSmall>
        </WithoutHeader >
    )
}


export default SelectClinic