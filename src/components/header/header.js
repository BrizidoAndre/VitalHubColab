import { HeaderSubTitle, WhiteHeaderTitle} from "../title/title";
import { HeaderContainer, IconHeader, PictureHeader } from "./styles";
import Profile from "../../assets/img/Rectangle425.png"
import { HeaderTextContainer, RowContainer } from "../container/style";
import Bell from "../../assets/img/Group94.png"
import { TouchableOpacity, View } from "react-native";


const Header = ({item, navigation}) => {
    return (
        <HeaderContainer>

                <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                <RowContainer>
                    <PictureHeader source={Profile}  />

                    <HeaderTextContainer>
                        <HeaderSubTitle>Bem Vindo</HeaderSubTitle>
                        <WhiteHeaderTitle>{item.name}</WhiteHeaderTitle>
                    </HeaderTextContainer>
                </RowContainer>
                </TouchableOpacity>

                <IconHeader source={Bell} />
        </HeaderContainer>
    )
}

export default Header;