import styled from "styled-components";

export const CardBox = styled.TouchableOpacity`
    border-radius: 5px;
    elevation: 2;

    width: 90%;
    height: 100px;
    padding: 15px;

    background-color: white;

    margin:6px 0;

    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items:center;
    gap:10px;
`

export const CardBoxSelect = styled(CardBox)`
    border: 2px solid #496BBA;
`

export const ClinicCardBox = styled.TouchableOpacity`
    border-radius: 5px;
    elevation: 2;

    width: 90%;
    height: 85px;
    
    background-color: white;
    
    padding: 15px;
    margin:6px 0;
    gap:10px;

    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items:center;
`

export const ClinicCardBoxSelected = styled(ClinicCardBox)`
    border: 2px solid #496BBA;
`

export const ItemCardBox = styled.View`
    display: flex;
    justify-content: space-between;

    gap: 10px;
`

export const StarBox = styled.View`
    display: flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
`

export const ImageCard = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 5px;
`

export const TextCardBox = styled.View`
    width: 100%;
    display: flex;
    align-items:flex-start;
    gap:3px;
    margin-bottom: 10px;

`

export const RowCardBox = styled.View`
    width: 100%;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`

export const MedicCardBox = styled.View`
    display: flex;
    align-items:flex-start;
    width: 75%;
    
    gap:10px
`

export const Container = styled.SafeAreaView`
flex: 1;
align-items: center;
background-color: #fff;
justify-self: center;
`