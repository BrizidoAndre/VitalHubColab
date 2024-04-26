import styled from "styled-components"

export const AddPhotoButton = styled.TouchableOpacity.attrs({
    activeOpacity : 0.8
})`
    padding: 12px;
    border-radius: 10px;
    background-color: #496bba;
    border: 1px solid #fbfbfb;

    bottom: -20;
    right : 15px;
    position: absolute;
`

export const LastPhoto = styled.Image`
    width: 64px;
    height: 65px;
    border-radius: 15px;
`