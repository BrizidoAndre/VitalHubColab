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
import { Image } from "react-native";

export const InputLabelBlack = ({ title,  bigInput = false, value, onChangeText, name=null, inputType='default' }) => {
    return (
        <>
            <Label>{title}</Label>
            {bigInput ?
                <BigInputBlack value={value} keyboardType={inputType} onChangeText={(txt) => onChangeText(txt)} /> :
                <InputBlack value={value} keyboardType={inputType} onChangeText={(txt) => onChangeText(txt)} />}
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

export const InputLabelImageBlack = ({ title, image=null }) => {
    return (
        <>
            <Label>{title}</Label>
            {image ?
            <Image 
                style={{width:"100%",height:170}}
                source={{
                    uri: image
                }}
            /> 
            :
            <BigInputImageBlack>
                <Mont14500Gray>
                    <IconCamera source={notFound} />  Nenhuma foto informada</Mont14500Gray>
            </BigInputImageBlack>
            }
        </>
    )
}

export const InputLabel = ({ title, placeholder, bigInput = false, value, setValue }) => {
    return (
        <>
            <Label>{title}</Label>

            {bigInput ?
                <BigInput
                    multiline={true}
                    placeholder={placeholder} value={value} onChangeText={setValue}/> :
                <Input placeholder={placeholder} value={value} onChangeText={setValue} />
            }
        </>
    )
}

export const SmallInputLabel = ({ title, placeholder, value, onChangeText, inputType='default' }) => {
    return (
        <SmallInputLabelContainer>
            <Label>{title}</Label>
            <InputBlack placeholder={placeholder} keyboardType={inputType} value={value} onChangeText={(txt)=>onChangeText(txt)} />
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