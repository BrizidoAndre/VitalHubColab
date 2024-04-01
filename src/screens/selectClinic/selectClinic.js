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

    const {appointmentLevel} = route.params

    const [listClinics, setListClinics] = useState([])

    const rawData = [
        {
            name: 'Senai Paulo Skaf',
            location: 'São Caetano do Sul, SP',
            time: 'Seg-Sex',
            grade: "4.5"
        },
        {
            name: 'Binanas',
            location: 'Leprechaum',
            time: 'Seg-Sex',
            grade: "4.5"
        },
        {
            name: 'Senai Ipiranga',
            location: 'Mooca, SP',
            time: 'Seg-Sex',
            grade: "4.5"
        },
        {
            name: 'Leucócitos',
            location: 'Corrente sanguínea, Humano',
            time: 'Seg-Sex',
            grade: "4.5"
        },
        {
            name: 'Mariachi',
            location: 'México, Velho México',
            time: 'Seg-Sex',
            grade: "4.5"
        },
        {
            name: 'Black Betty',
            location: 'Bam ba nam',
            time: 'Seg-Sex',
            grade: "4.5"
        },
        {
            name: 'I dont play video games',
            location: 'No more SP',
            time: 'Seg-Sex',
            grade: "4.5"
        },
        {
            name: 'Natura',
            location: 'Datebayo, Vila secreta da folha',
            time: 'Seg-Sex',
            grade: "4.5"
        },
    ]

    async function loadClinics() {
        try {
            const res = await api.get('/Clinica/ListarTodas')

            const data = await res.data

            setListClinics(data)
            console.log(data);

        } catch (error) {
            console.log('Erro');
            console.log(error);
        }
    }

    useEffect(()=>{
        loadClinics()

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