// Importar o recurso do bottom tab
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
const BottomTab = createBottomTabNavigator();

// Importando as telas
import Home from "../home/home";
import Profile from "../profile/profile";


import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ContentIcon, TextIcon } from "./style";


export const Main = () => {

    return (
        <BottomTab.Navigator
            // Definir a rota inicial
            // Ela é a que define QUANDO essa bottom tab aparecerá
            initialRouteName="Home"

            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: '#fff', height: '7%', paddingTop: 10 },
                tabBarActiveBackgroundColor: 'transparent',
                tabBarShowLabel: false,
                headerShown: false,

                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Home') {

                        return (
                            <ContentIcon
                                tabBarActiveBackgroundColor={focused ? '#ecf2ff' : 'transparent'}
                            >
                                <FontAwesome name="calendar" size={18} color={'#607ec5'} />
                                {focused && <TextIcon>Agenda</TextIcon>}

                            </ContentIcon>
                        )

                    } else {
                        return (

                            <ContentIcon
                                tabBarActiveBackgroundColor={focused ? '#ecf2ff' : 'transparent'}
                            >
                                <FontAwesome5 name="user-circle" size={22} color={'#607ec5'} />
                                {focused && <TextIcon>Perfil</TextIcon>}

                            </ContentIcon>
                        )
                    }
                }
            })}


        >


            {/* Crando a rota do perfil */}
            <BottomTab.Screen
                name="Home"
                component={Home}
            />



            {/* creaindo  rota do Perfil */}
            <BottomTab.Screen
                name="Profile"
                component={Profile}
            />


        </BottomTab.Navigator>
    )
}