import { useEffect, useReducer, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, Text } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { CalendarContainer, Center, InputContainer, RowContainer } from "../../components/container/style";
import { Sand14600, Title } from "../../components/title/title";
import { InputLabelBlack, SmallInputLabel } from "./styles";
import { LocationAccuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { mapsKey } from "../../../Utils";
import { HeaderContainer } from "../../components/header/styles";


const ShowLocation = ({ }) => {
    const mapReference = useRef(null)
    const [initialPosition, setInitialPosition] = useState(null)
    const [finalPosition, setFinalPosition] = useState({
        latitude: -23.5612,
        longitude: -46.6557,
    });

    // funcao para pedir acesso ao usuário a obter sua localização
    async function capturarLocalizacao() {
        const { granted } = await requestForegroundPermissionsAsync()

        // se permissão concedida receber posição atual

        if (granted) {
            const captureLocation = await getCurrentPositionAsync();
            setInitialPosition(captureLocation)

        }

    }



    useEffect(() => {
        capturarLocalizacao()

        // Função para obter a posição do usuário a cada instante
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        }, //função para setar a posição inicial a cada instante que obtiver a posição do usuário
            async (response) => {
                // recebe e guarda a nova função 
                await setInitialPosition(response)


                // função para atualizar a posição do mapa de acordo com a posição do usuário
                mapReference.current?.animateCamera({
                    pitch: 60,
                    center: response.coords
                })
            })
    }, [1000])

    useEffect(() => {
        recarregarVisualizacaoMapa()
    }, [initialPosition])

    // função para mostrar o ponto central entre os dois marcadores que definimos
    async function recarregarVisualizacaoMapa() {

        if (mapReference.current && initialPosition) {
            await mapReference.current.fitToCoordinates(
                [
                    { latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude },
                    { latitude: finalPosition.latitude, longitude: finalPosition.longitude }
                ],
                {
                    edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
                    animated: true
                }
            )
        }

    }


    //  constante para estilizar o mapa de acordo com nosso tema
    const grayMapStyle = [
        {
            elementType: "geometry",
            stylers: [
                {
                    color: "#E1E0E7",
                },
            ],
        },
        {
            elementType: "geometry.fill",
            stylers: [
                {
                    saturation: -5,
                },
                {
                    lightness: -5,
                },
            ],
        },
        {
            elementType: "labels.icon",
            stylers: [
                {
                    visibility: "on",
                },
            ],
        },
        {
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#FBFBFB",
                },
            ],
        },
        {
            elementType: "labels.text.stroke",
            stylers: [
                {
                    color: "#33303E",
                },
            ],
        },
        {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
                {
                    color: "#fbfbfb",
                },
            ],
        },
        {
            featureType: "administrative.country",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#fbfbfb",
                },
            ],
        },
        {
            featureType: "administrative.land_parcel",
            stylers: [
                {
                    visibility: "on",
                },
            ],
        },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#fbfbfb",
                },
            ],
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#fbfbfb",
                },
            ],
        },
        {
            featureType: "poi.business",
            stylers: [
                {
                    visibility: "on",
                },
            ],
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
                {
                    color: "#66DA9F",
                },
            ],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text",
            stylers: [
                {
                    visibility: "on",
                },
            ],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#fbfbfb",
                },
            ],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.stroke",
            stylers: [
                {
                    color: "#1B1B1B",
                },
            ],
        },
        {
            featureType: "road",
            stylers: [
                {
                    visibility: "on",
                },
            ],
        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                {
                    color: "#C6C5CE",
                },
            ],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#FBFBFB",
                },
            ],
        },
        {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
                {
                    color: "#ACABB7",
                },
            ],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
                {
                    color: "#8C8A97",
                },
            ],
        },
        {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
                {
                    color: "#8C8A97",
                },
            ],
        },
        {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#fbfbfb",
                },
            ],
        },
        {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#fbfbfb",
                },
            ],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                {
                    color: "#8EA5D9",
                },
            ],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#fbfbfb",
                },
            ],
        },
    ];

    return (
        <>

            {initialPosition != null ?

                <>
                    <MapView
                    ref={mapReference}
                        style={
                            {
                                width: Dimensions.get('window').width,
                                height: '50%'
                            }
                        }
                        customMapStyle={grayMapStyle}
                        initialRegion={{
                            latitude: initialPosition.coords.latitude,
                            longitude: initialPosition.coords.longitude,
                            latitudeDelta: 0.0050,
                            longitudeDelta: 0.0050,
                        }}
                    >

                        {/* Marcador para o usuário */}
                        <Marker
                            coordinate={initialPosition.coords}
                            title="Localização do Usuário"
                            pinColor="purple"
                        />

                        <MapViewDirections
                            origin={initialPosition.coords}
                            destination={{
                                latitude: finalPosition.latitude,
                                longitude: finalPosition.longitude,
                            }}
                            strokeWidth={3}
                            strokeColor="#5218fa"
                            apikey={mapsKey}
                        />

                        {/* Marcador para o destino */}
                        <Marker
                            coordinate={finalPosition}
                            title="Seu destino"
                        />

                    </MapView>
                    <CalendarContainer>
                        <Title>CLinicaNatureh</Title>
                        <Sand14600>Teste</Sand14600>
                        <InputContainer>
                            <InputLabelBlack title={"Endereço"} text={'Rua Exemplo Nº'} />
                        </InputContainer>
                        <RowContainer>
                            <SmallInputLabel title={'Número'} text={143} />
                            <SmallInputLabel title={'Bairro'} text={'Moema-SP'} />
                        </RowContainer>
                    </CalendarContainer>
                </> : <HeaderContainer>

                    <Text>Carregando localização</Text>
                    <ActivityIndicator />

                </HeaderContainer>}

        </>
    )
}


export default ShowLocation