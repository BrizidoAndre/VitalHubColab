import { useEffect, useState } from "react"
import { Button } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { AllCalendar } from "../../components/calendar/calendar"
import { BottomCancelContainer, HideItems, InputContainer, WithoutHeader } from "../../components/container/style"
import { SelectLabel } from "../../components/input/inputLabel"
import { LinkBlueSmall } from "../../components/links/links"
import { Title } from "../../components/title/title"
import { ConfirmAppointment } from "../../components/modalActions/modalActions"


const SelectData = ({ navigation }) => {



    // state do modal de confirmação
    const [hideModal, setHideModal] = useState(false)

    // states para o select
    // booleano para mostrar ou não o select
    const [hideSelect, setHideSelect] = useState(false)
    // useState para configurar o placeholder
    const [timeAvailable, setTimeAvailable] = useState('Selecionar horário')

    // state para verificar qual data está sendo usada
    const [selected, setSelected] = useState(0)
    // State para verificar como o cadastro de consulta foi realizado
    const [item, setItem] = useState({
        data: 'teste',
        doctor: {
            name: 'Doutora Alessandra',
            specialty: 'Dermatóloga, Esteticista'
        },
        location: 'Lugar de teste',
        kind: 'Tipo de teste',
    })





    // state para analisar o horário a ser cadastrado
    const [times, setTimes] = useState([
        '12:00',
        '15:00',
        '09:00',
        '16:30',
    ])

    return (
        <>
            <WithoutHeader>

                <Title>Selecionar Data</Title>

                <InputContainer>

                    <AllCalendar onPress={setSelected} selected={selected} />

                    <SelectLabel
                        placeholder={timeAvailable}
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
                item={item}
                hideModal={hideModal}
                setHideModal={setHideModal}
                navigation={navigation}
            />
        </>
    )
}


export default SelectData