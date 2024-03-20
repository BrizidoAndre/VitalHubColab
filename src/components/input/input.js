import styled from "styled-components";

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#34898f'
})`
    width: 100%;
    height: 53px;
    padding:16px;

    border:2px solid #49b3ba;
    border-radius: 5px;
    color: #34898f;
    font-size: 16px;
    font-family: MontserratAlternates_600SemiBold;
`

export const SmallInput = styled.TouchableOpacity`
    width: 31%;
    height: 55px;
    padding:16px;

    border:2px solid #49b3ba;
    border-radius: 5px;
    display: flex;
    align-items:center;
`

export const SmallInputGreen = styled.TouchableOpacity`
    width: 31%;
    height: 55px;
    padding:16px;

    border:2px solid #49b3ba;
    background-color: #49b3ba;
    border-radius: 5px;
    display: flex;
    align-items:center;
`

export const BigInput = styled.TextInput.attrs({
    placeholderTextColor: '#34898f',
})`
    width: 100%;
    height: 170px;
    padding:16px;
    text-align:justify;
    text-align-vertical:top;

    border:2px solid #49b3ba;
    border-radius: 5px;
    color: #34898f;
    font-size: 16px;
    font-family: MontserratAlternates_600SemiBold;
`


export const InputNumber = styled.TextInput.attrs({
    placeholderTextColor: '#34898F'
})`
    width: 65px;
    height:62px;

    border: 2px solid #77CACF;
    border-radius: 5px;

    text-align:center;

    color: #34898F;
    font-size:40px;
`


export const InputBlack = styled.TextInput.attrs({
    placeholderTextColor: '#000000'
})`
    width: 100%;
    height: 55px;
    border-radius: 5px;
    background-color:#e5e3e3;
    padding: 16px;

    font-family: MontserratAlternates_500Medium;
    font-size:14px;
`

export const BigInputBlack = styled.TextInput.attrs({
    placeholderTextColor: "#000000"
})`
    width: 100%;
    height: 170px;
    padding:16px;
    text-align:justify;
    text-align-vertical:top;
    border-radius: 5px;
    background-color:#e5e3e3;

    font-family: MontserratAlternates_500Medium;
    font-size:14px;
`

export const BigInputImageBlack = styled.View`
    width: 100%;
    height: 170px;
    padding:16px;
    border-radius: 5px;
    background-color:#e5e3e3;

    justify-content: center;
    align-items:center;
`

export const Select = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    border:2px solid #60BFC5;
    padding: 15px;
    border-radius: 5px;

    background-color: white;

    display: flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;

    position:relative;
`

export const SelectRow = styled.TouchableOpacity`
    width: 100%;
    height:50px;
    padding: 15px;
`

export const FlatListSelect = styled.FlatList`
    width: 110%;
    position: absolute;
    background-color: white;
    top:50px;
`