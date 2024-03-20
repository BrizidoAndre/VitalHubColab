import styled from "styled-components";
import {LinearGradient} from 'expo-linear-gradient'

export const HeaderContainer = styled(LinearGradient).attrs({
    colors: ['#60BFC5','#496BBA'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
})`
    width: 100%;
    height: 17%;
    border-radius: 12px;
    padding:15% 5% 5% 5%;

    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-between;
    position:fixed;
`

export const PictureHeader = styled.Image`
    width:60px;
    height: 60px;
    border-radius: 8px;
`

export const IconHeader = styled.Image`
    width:25px;
    height: 25px;
`
