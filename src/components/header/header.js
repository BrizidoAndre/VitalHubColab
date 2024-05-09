import { HeaderSubTitle, WhiteHeaderTitle} from "../title/title";
import { HeaderContainer, IconHeader, PictureHeader } from "./styles";
import Profile from "../../assets/img/Rectangle425.png"
import { HeaderTextContainer, RowContainer } from "../container/style";
import Bell from "../../assets/img/Group94.png"
import { TouchableOpacity, View } from "react-native";
import { userDecodeToken } from "../../utils/auth";
import { useEffect, useState } from "react";
import api from "../../service/service";


const Header = ({ navigation}) => {

    const [item, setItem] = useState({})
    const [photo, setPhoto] = useState()

    async function profileLoad(){
        const token = await userDecodeToken()

        setItem(token)
        

        const res = await api.get('/Usuario/BuscarPorId?id=' + token.id)

        const data = await res.data;

        console.log(data.foto)

        setPhoto(data.foto)
    }

    useEffect(()=> {
        profileLoad()
    }, [])

    return (
        <HeaderContainer>

                <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                <RowContainer>
                    <PictureHeader source={{uri: photo}}  />

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