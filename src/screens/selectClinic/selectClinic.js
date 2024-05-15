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
import { PersonalModal } from "../../components/modalActions/modalActions"


const SelectClinic = ({ route, navigation }) => {

    const [selected, setSelected] = useState('')

    // criando um state para a criação de uma consulta
    const [newAppointment, setNewAppointment] = useState({
    })

    const { appointmentLevel, localizacao } = route.params

    const [listClinics, setListClinics] = useState([])

    const [hideModal, setHideModal] = useState(false);
    const [modal, setModal] = useState({
        title:'',
        subtitle:''
    })


    async function loadClinics() {
        try {

            const res = await api.get('/Clinica/BuscarPorCidade?cidade=' + encodeURI(localizacao))
            const data = await res.data;


            return data;
        } catch (error) {
            console.log('Erro');
            console.log(error);
        }
    }

    async function loadAllClinics() {
        try {

            const res = await api.get('/Clinica/ListarTodas')

            const data = await res.data

            return data
        } catch (error) {
            console.log('Erro');
            console.log(error);
        }
    }

    async function checkClinics() {
        let clinicas = await loadClinics();


        if (clinicas.length > 0) {
            setListClinics(clinicas)
            return;
        }


        setModal({
            title:'Busca inválida',
            subtitle: 'Nenhuma clínica presente na cidade buscada. Retornando todas as clinicas.'
        })
        
        setHideModal(true)
        setListClinics(await loadAllClinics())
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
            navigation.replace("SelectMedic", { newAppointment })
            setSelected()
        }
        else {
            setModal({
                title:"Erro ao passar de página",
                subtitle: 'Nenhuma clinica foi selecionada'
            })
           setHideModal(true)
        }

    }



    useEffect(() => {
        checkClinics()
        correctLevel()
    }, [])


    return (
        <>
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

            <PersonalModal
                hideModal={hideModal}
                onPressCancel={() => { setHideModal(false) }}
                title={modal.title}
                subTitle={modal.subtitle}
            />
        </>
    )
}


export default SelectClinic