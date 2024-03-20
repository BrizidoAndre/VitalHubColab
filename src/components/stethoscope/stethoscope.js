import { StethosImage, FixedButtton } from "./styles"

const Stethoscope = ( {onPress} ) => {

    return (
        <FixedButtton onPress={onPress}>
            <StethosImage source={require("../../assets/img/estetoscopio.png")} />
        </FixedButtton>
    )
}

export default Stethoscope