import { IconWatch, StatusCardGray, StatusCardGreen } from "./styles"
import { Sand14600Gray, Sand14600Green, Sand14600Yellow } from "../title/title"

import GrayWatch from '../../assets/img/mingcute_time-fill.png'
import GreenWatch from '../../assets/img/Vector.png'
import Calendar from '../../assets/img/mdi_calendar.png'
import Star from '../../assets/img/star.png'
import { View } from "react-native"
import { RowContainer } from "../container/style"
import { StarBox } from "../card/styles"

export const StatusGreen = ({time}) => {
    return (
        <StatusCardGreen>
            <IconWatch source={GreenWatch}/>
            <Sand14600Green>-</Sand14600Green>
            <Sand14600Green>{time}</Sand14600Green>
        </StatusCardGreen>
    )
}

export const StatusGray = ({time}) => {
    return (
        <StatusCardGray>
            <IconWatch source={GrayWatch}/>
            <Sand14600Gray>-</Sand14600Gray>
            <Sand14600Gray>{time}</Sand14600Gray>
        </StatusCardGray>
    )
}

export const StatusData = ({time}) => {
    return(
        <StatusCardGreen>
            <IconWatch source={Calendar}/>
            <Sand14600Green>{time}</Sand14600Green>
        </StatusCardGreen>
    )
}

export const StatusStar = ({grade}) => {
    return(
        <StarBox>
            <IconWatch source={Star}/>
            <Sand14600Yellow>{grade}</Sand14600Yellow>
        </StarBox>
    )
}