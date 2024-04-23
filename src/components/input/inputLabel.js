import { SmallInputLabelContainer } from "../container/style"
import { IconWatch } from "../status/styles"
import { Label, Mont14500Gray, Mont14600Green, Sand14600 } from "../title/title"
import {
    BigInput,
    BigInputBlack,
    BigInputBlackText,
    BigInputImageBlack,
    FlatListSelect,
    Input,
    InputBlack,
    InputBlackText,
    Select,
    SelectRow
} from "./input"
import { IconCamera } from "../../screens/appointment/styles";
import notFound from '../../assets/img/iconoir_file-not-found.png'

export const InputLabelBlack = ({ title, bigInput = false, value, onChangeText }) => {
    return (
        <>
            <Label>{title}</Label>
            {bigInput ?
                <BigInputBlack value={value} onChangeText={(txt) => onChangeText(txt)} /> :
                <InputBlack value={value} onChangeText={(txt) => onChangeText(txt)} />}
        </>
    )
}

export const InputLabelBlackText = ({ title, bigInput = false, text }) => {
    return (
        <>
            <Label>{title}</Label>
            {bigInput ?
                <BigInputBlackText >{text}</BigInputBlackText> :
                <InputBlackText>{text}</InputBlackText>}
        </>
    )
}

export const InputLabelImageBlack = ({ title }) => {
    return (
        <>
            <Label>{title}</Label>
            <BigInputImageBlack>
                <Mont14500Gray>
                    <IconCamera source={notFound} />  Nenhuma foto informada</Mont14500Gray>
            </BigInputImageBlack>
        </>
    )
}

export const InputLabel = ({ title, placeholder, bigInput = false, value }) => {
    return (
        <>
            <Label>{title}</Label>

            {bigInput ?
                <BigInput
                    multiline={true}
                    placeholder={placeholder} value={value} /> :
                <Input placeholder={placeholder} value={value} />
            }
        </>
    )
}

export const SmallInputLabel = ({ title, placeholder, value }) => {
    return (
        <SmallInputLabelContainer>
            <Label>{title}</Label>
            <InputBlack placeholder={placeholder} value={value} />
        </SmallInputLabelContainer>
    )
}

export const SelectLabel = ({ title, placeholder, item, hideSelect, setHideSelect, onPress }) => {
    return (
        <>
            <Sand14600>{title}</Sand14600>

            <Select onPress={setHideSelect}>
                <Mont14600Green>{placeholder}</Mont14600Green>
                <IconWatch source={require('../../assets/img/Arrow.png')} />
                <SelectModal item={item} hideSelect={hideSelect} onPress={onPress} setHideSelect={setHideSelect} />
            </Select>
        </>
    )
}

export const SelectCard = ({ time, onPress, setHideSelect }) => {

    return (
        <SelectRow onPress={() => { onPress(time); setHideSelect(false) }}>
            <Mont14600Green>{time.time}</Mont14600Green>
        </SelectRow>
    )
}

export const SelectModal = ({ item, hideSelect, onPress, setHideSelect }) => {

    if (!hideSelect) {
        return (
            <></>
        )
    }
    return (
        <FlatListSelect
            data={item}
            renderItem={({ item }) => <SelectCard onPress={onPress} setHideSelect={setHideSelect} time={item} />}
        />
    )
}