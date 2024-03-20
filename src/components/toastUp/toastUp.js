import { useRef } from "react";
import { Title } from "../title/title"
import styled from "styled-components"
import { Animated } from "react-native";

const ToastUp = ({up=false}) => {


    const fadeAnim = useRef(new Animated.Value(-60)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: -60,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };


    return (
            <Title>Teste</Title>
    )
}
