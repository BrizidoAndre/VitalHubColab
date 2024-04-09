import { useEffect, useState } from "react"
import { Button } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { AllCalendar } from "../../components/calendar/calendar"
import { BottomCancelContainer, HideItems, InputContainer, WithoutHeader } from "../../components/container/style"
import { SelectLabel } from "../../components/input/inputLabel"
import { LinkBlueSmall } from "../../components/links/links"
import { Title } from "../../components/title/title"
import { ConfirmAppointment } from "../../components/modalActions/modalActions"


const SelectData = ({route, navigation }) => {

    // obtendo os parametros da página anterior
    const {newContinueAppointment} = route.params

    // useState para confirmação e criar uma nova consulta
    const [newAppointment, setNewAppointment] = useState({})


    // state do modal de confirmação
    const [hideModal, setHideModal] = useState(false)

    // states para o select
    // booleano para mostrar ou não o select
    const [hideSelect, setHideSelect] = useState(false)

    // state para verificar qual data está sendo usada
    const [selected, setSelected] = useState(0)
    
    // useState para o item selecionado
    const [timeAvailable, setTimeAvailable] = useState({
        time: '09:00',
        value: 9
    })

    // state para analisar o horário a ser cadastrado
    const times = [
        {
            time: '09:00',
            value: 9
        },
        {
            time: '12:00',
            value: 12
        },
        {
            time: '14:00',
            value: 14
        },
        {
            time: '16:00',
            value: 16
        }
    ]

    function prepareData(){
        let data = new Date()
        
        data.setDate(data.getDate() + selected)

        data.setHours(timeAvailable.value - 3)

        data.setMinutes(0,0,0)

        return data;
    }

    useEffect(()=>{
        setNewAppointment({
            ...newContinueAppointment,
            dataConsulta: prepareData()
        })
    },[selected, timeAvailable])

    return (
        <>
            <WithoutHeader>

                <Title>Selecionar Data</Title>

                <InputContainer>

                    <AllCalendar onPress={setSelected} selected={selected} />

                    <SelectLabel
                        placeholder={timeAvailable.time}
                        title={"Selecione um horário disponível"}
                        hideSelect={hideSelect}
                        setHideSelect={() => setHideSelect(!hideSelect)}
                        item={times}
                        onPress={setTimeAvailable} />
                </InputContainer>


                <HideItems>
                    <Button onPress={() => setHideModal(true)}><ButtonTitle>CONFIRMAR</ButtonTitle></Button>
                    <LinkBlueSmall onPress={() => navigation.goBack()}>Cancelar</LinkBlueSmall>
                </HideItems>
            </WithoutHeader>


            <ConfirmAppointment
                item={newAppointment}
                setItem={setNewAppointment}
                hideModal={hideModal}
                setHideModal={setHideModal}
                navigation={navigation}
            />
        </>
    )
}


export default SelectData