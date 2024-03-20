import styled from "styled-components"

export const Container = styled.SafeAreaView`
flex: 1;
align-items: center;
background-color: #fafafa;
justify-self: center;
`
export const Center = styled.TouchableOpacity`
display: flex;
align-items: center;
justify-content: center;
`
export const HomeContainer = styled.SafeAreaView`
display: flex;
align-items: center;
background-color: #fafafa;
justify-self:center;

gap:30px;
`

export const WithoutHeader = styled.SafeAreaView`
display: flex;
margin-top: 20%;
align-items: center;

`

export const ButtonContainer = styled.View`
width: 80%;
display: flex;
flex-direction: row;
justify-content: space-around;
`

export const InputContainer = styled.View`
display: flex;
align-items: flex-start;
gap: 10px;

width: 90%;
margin-bottom: 20px;

`

export const InputNumberContainer = styled.View`
width: 80%;
margin: 20px 0 30px 0;

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const ImageContainer = styled.View`
    width: 100%;
    height: 40%;

    position: fixed;
    top: 0px;
`

export const TwoInputContainer = styled.View`
    width: 100%;
    
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    margin:20px 0;
`

export const SmallInputLabelContainer = styled.View`
    width: 45%;
`

export const RowContainer = styled.View`
    display: flex;
    flex-direction:row;
    gap:10px;

    justify-content: space-between;
`

export const RowFullContainer = styled.View`
    display: flex;
    flex-direction:row;
    gap:10px;
    width: 100%;

    justify-content: space-between;
`

export const HeaderTextContainer = styled.View`
    display: flex;
    align-items:flex-start;
    justify-content: center;
`

export const Scroll = styled.ScrollView`
    width: 100%;
`

export const FlatlistContainer = styled.FlatList`
    width: 100%;
    margin: 30px 5%;
`

export const FlatlistClinicCard = styled.FlatList`
    width: 100%;
    height: 75%;
    
    margin: 0 0 20px 10%;
`

export const ModalContainer = styled.View`
    height: 100%;

    display: flex;
    justify-content: space-around;
    align-items:center;

`

export const CalendarContainer = styled.View`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    margin: 30px 0 20px 0;
`

export const HideItems = styled.View`
    width: 100%;
    align-items: center;
    z-index: -1;
    position: absolute;
    bottom:-40%;
`

export const RowAlign = styled.View`
    width: 100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content: space-around;
`

export const BottomCancelContainer = styled.View`
    display: flex;
    width:100%;
    position: absolute;
    bottom:10px;

    align-items: center;

`

export const BottomRowButtonContainer = styled.View`
    width:80%;
    display: flex;
    flex-direction: row;
    justify-content:center;

    gap: 30px;


    position: absolute;
    bottom: 20px;
    align-self:center;
    ;
`