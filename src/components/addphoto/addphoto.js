import { FixedButtton } from "./styles"

const AddPhoto = ( {onPress} ) => {

    return (
        <FixedButtton onPress={onPress}>
            <AddPhoto source={require("../../assets/img/addphoto.png")} />
        </FixedButtton>
    )
}

export default AddPhoto