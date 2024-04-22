import { Button } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { FlatlistClinicCard, WithoutHeader } from "../../components/container/style"
import { LinkBlueSmall } from "../../components/links/links"
import { Title } from "../../components/title/title"
import { ClinicCard } from "../../components/card/card"
// Use states
import { useEffect, useState } from "react"
import api from "../../service/service"
import { Alert } from "react-native"


const SelectClinic = ({ route, navigation }) => {

    const [selected, setSelected] = useState('')

    // criando um state para a criação de uma consulta
    const [newAppointment, setNewAppointment] = useState({
    })

    const { appointmentLevel } = route.params

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

    function correctLevel() {
        let levelId = '';
        switch (appointmentLevel) {
            case 'Rotina':
                levelId = 'BE7F28CD-232F-4906-9FB8-41018D6099B1';
                break;
            case 'Exame':
                levelId = '24AAC772-78A6-4A12-8CB8-FAF0A9DCF6F9';
                break;
            case 'Urgência':
                levelId = '4D388964-CB39-4F99-9DD9-704B48F6FC86';
                break;
        }

        setNewAppointment({
            situacaoId: '',
            pacienteId: "",
            medicoClinicaId: "",
            medicoId: '',
            clinicaId: '',
            receitaId: null,
            prioridadeId: levelId,
            prioridade: appointmentLevel,
            dataConsulta: "",
            descricao: "",
            diagnostico: "",
        })
    }


    function nextPage() {

        if (selected) {
            navigation.navigate("SelectMedic", { newAppointment })
            setSelected()
        }
        else {
            Alert.alert("Erro ao passar de página", 'Nenhuma clinica foi selecionada')
        }

    }

    useEffect(() => {
        loadClinics()
        correctLevel()
    }, [])


    return (
        <WithoutHeader>
            <Title>Selecionar clínica</Title>

            <FlatlistClinicCard
                data={listClinics}
                renderItem={({ item }) =>
                    <ClinicCard
                        item={item}
                        onPress={() => {
                            setSelected(item.id)
                            setNewAppointment({
                                ...newAppointment,
                                clinicaId: item.id,
                                clinica: item
                            })
                        }}
                        select={selected}
                        grade={4.9}
                        time={'Seg-Sex'} />}
            />






            <Button onPress={() => nextPage()}><ButtonTitle>CONTINUAR</ButtonTitle></Button>
            <LinkBlueSmall onPress={() => navigation.goBack()}>Cancelar</LinkBlueSmall>
        </WithoutHeader >
    )
}


export default SelectClinic