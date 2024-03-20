import { Center } from "../container/style"
import { StatusData, StatusGray, StatusGreen, StatusStar } from "../status/status"
import { Mont12500Blue, Mont12500Red, Mont16600, Sand14400, Sand14500Gray, Sand14600 } from "../title/title"
import { CardBox, CardBoxSelect, ClinicCardBox, ClinicCardBoxSelected, Container, ImageCard, ItemCardBox, MedicCardBox, RowCardBox, TextCardBox } from "./styles"

const Card = ({ name, age, image, nivel, time = "14:00", status = "c", onPress = null, onPressCard }) => {

    const statusCheck = () => {
        if (status === "a") {
            return (

                <RowCardBox>
                    <StatusGreen time={time} />
                    <Center>
                        <Mont12500Red onPress={onPress}>Cancelar</Mont12500Red>
                    </Center>
                </RowCardBox>
            )
        } else if (status === "r") {
            return (
                <RowCardBox>
                    <StatusGray time={time} />
                    <Center>
                        <Mont12500Blue onPress={onPress}>Ver Prontuário</Mont12500Blue>
                    </Center>
                </RowCardBox>
            )

        } else if (status === "c") {
            return (
                <RowCardBox>
                    <StatusGray time={time} />
                    <Center>
                    </Center>
                </RowCardBox>
            )

        }
    }

    return (
        <CardBox onPress={onPressCard}>
            <ImageCard source={image} />
            <Container>

                <TextCardBox>
                    <Mont16600>{name}</Mont16600>
                    <Sand14400>{age} anos · {nivel}</Sand14400>
                </TextCardBox>


                {statusCheck()}
            </Container>
        </CardBox>
    )
}

export const ClinicCard = ({ name, location, grade, time, onPress, select }) => {



    if (select === name) {
        return (
            <ClinicCardBoxSelected>
                <ItemCardBox>
                    <Mont16600>{name}</Mont16600>
                    <Sand14600>{location}</Sand14600>
                </ItemCardBox>

                <ItemCardBox>
                    <StatusStar grade={grade} />
                    <StatusData time={time} />
                </ItemCardBox>
            </ClinicCardBoxSelected>
        )
    }
    else {
        return (
            <ClinicCardBox onPress={onPress}>
                <ItemCardBox>
                    <Mont16600>{name}</Mont16600>
                    <Sand14600>{location}</Sand14600>
                </ItemCardBox>

                <ItemCardBox>
                    <StatusStar grade={grade} />
                    <StatusData time={time} />
                </ItemCardBox>
            </ClinicCardBox>
        )
    }
}

export const MedicCard = ({ name, specialty, image, onPress, select }) => {


    if (select ===name) {
        return (
            <CardBoxSelect>
                <ImageCard source={image} />
                <MedicCardBox>
                    <Mont16600>{name}</Mont16600>
                    <Sand14500Gray>{specialty}</Sand14500Gray>
                </MedicCardBox>
            </CardBoxSelect>
        )
    }

    else {
        return (
            <CardBox onPress={onPress}>
                <ImageCard source={image} />
                <MedicCardBox>
                    <Mont16600>{name}</Mont16600>
                    <Sand14500Gray>{specialty}</Sand14500Gray>
                </MedicCardBox>
            </CardBox>
        )
    }
}

export default Card