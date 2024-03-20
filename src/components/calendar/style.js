import styled from "styled-components";

export const DateSelectedBox = styled.TouchableOpacity`
    background-color: #49B3BA;
    border-radius:50px;
    
    width:42px;
    height:42px;
    display: flex;
    justify-content:space-evenly;
    align-items:center;
`

export const TextDateSelected = styled.Text`
    font-size: 12px;
    font-family: Quicksand_600SemiBold;
    color:white;
`
export const TextNumberDateSelected = styled.Text`
    font-size: 16px;
    font-family: Quicksand_600SemiBold;
    color:white;
`

export const DateBox = styled.TouchableOpacity`
    border-radius:50px;
    width:42px;
    height:42px;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
`

export const TextDate = styled.Text`
    font-size: 12px;
    font-family: Quicksand_600SemiBold;
    color:#ACABB7;
`
export const TextNumberDate = styled.Text`
    font-size: 16px;
    font-family: Quicksand_600SemiBold;
    color:#5F5C6B;
`


export const CalendarRowContainer = styled.View`
    width: 100%;
    gap: 10px;


    display: flex;
    flex-direction:row;
    flex-wrap: wrap;

    justify-content: space-between;
    align-items: center;
`

export const CalendarRowNumberContainer = styled.View`
    width: 100%;
    gap: 35px;

    display: flex;
    flex-direction:row;
    flex-wrap: wrap;

    justify-content: space-between;
    align-items: center;
`

export const NumberDateContainer = styled.View`
    width: 20px;
    height: 20px;
    position: relative;
`

export const NumberDateContainerPosition = styled.View`
    position: absolute;
    width: 30px;
    height:30px;
    border-radius:30px;
    background-color: #49B3BA;
    right:-5px;
    top:-5px;

    display: flex;
    justify-content:center;
    align-items:center;

`