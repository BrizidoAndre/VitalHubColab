import { Button } from "../../components/button/button"
import { ButtonTitle } from "../../components/button/buttonTitle"
import { ClinicCard, MedicCard } from "../../components/card/card"
import { FlatlistClinicCard, WithoutHeader } from "../../components/container/style"
import { LinkBlueSmall } from "../../components/links/links"
import { Title } from "../../components/title/title"

// import de imagens
import image from '../../assets/img/Rectangle425.png'
import { useState } from "react"


const SelectMedic = ({ navigation }) => {

    const [selected, setSelected] = useState('')

    const rawData = [
        {
            name: 'Medico Sakamura',
            specialty: 'Cardiologist',
            image: image
        },
        {
            name: 'Medico Despacito',
            specialty: 'Cardiologist',
            image: image
        },
        {
            name: 'Medico Poa',
            specialty: 'Cardiologist',
            image: image
        },
        {
            name: 'Medico Youre welcome',
            specialty: 'Cardiologist',
            image: image
        },
        {
            name: 'Medico bananas',
            specialty: 'Cardiologist',
            image: image
        },
        {
            name: 'Medico Peras',
            specialty: 'Cardiologist',
            image: image
        },
        {
            name: 'Medico Sushi',
            specialty: 'Cardiologist',
            image: image
        },
    ]

    return (
        <WithoutHeader>
            <Title>Selecionar Médico</Title>

            <FlatlistClinicCard
                data={rawData}
                renderItem={({ item }) =>
                    <MedicCard
                        select={selected}
                        onPress={()=>setSelected(item.name)}
                        image={item.image}
                        name={item.name}
                        specialty={item.specialty}
                    />}
            />


            <Button onPress={() => navigation.navigate("SelectData")}><ButtonTitle>CONTINUAR</ButtonTitle></Button>
            <LinkBlueSmall onPress={() => navigation.goBack()}>Cancelar</LinkBlueSmall>
        </WithoutHeader >
    )
}

export default SelectMedic