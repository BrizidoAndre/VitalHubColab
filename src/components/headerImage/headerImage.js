import { ImageContainer } from "../container/style"
import { Image } from "./styles"

export const HeaderImage = ({requireImage}) => {
    return (
        <ImageContainer>
            <Image source={requireImage} />
        </ImageContainer>
    )
}