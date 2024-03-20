import { IconBack, IconTouch } from "../iconBack/iconBack"


export const IconReturn = ({navigation}) => {


    return(
        <>
        <IconTouch
            onPress={() => navigation.goBack()}>
            <IconBack 
            source={require("../../assets/img/Group169.png")}
            />
            </IconTouch>
        </>
    )
}

export const IconCancel = ({navigation}) => {


    return(
        <>
        <IconTouch
            onPress={() => navigation.goBack()}>
            <IconBack 
            source={require("../../assets/img/Group170.png")}
            />
            </IconTouch>
        </>
    )
}