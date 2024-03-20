import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './src/screens/navigation/navigation';
import Login from './src/screens/login/login';
import ForgotPassword from './src/screens/forgotPassword/forgotPassword';

// import da fonts
import {
  useFonts,
  MontserratAlternates_700Bold,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_500Medium
} from '@expo-google-fonts/montserrat-alternates';
import {
  Quicksand_600SemiBold,
  Quicksand_700Bold,
  Quicksand_500Medium,
  Quicksand_400Regular,
} from '@expo-google-fonts/quicksand'


import CheckEmail from './src/screens/checkEmail/checkEmail';
import RedefinePassword from './src/screens/redefinePassword/redefinePassword';
import CreateAccount from './src/screens/createAccount/createAccount';
import Profile from './src/screens/profile/profile';
import EditProfile from './src/screens/editProfile/editProfile';
import Appointment from './src/screens/appointment/appointment';
import EditAppointment from './src/screens/editAppointment/editAppointment';
import Home from './src/screens/home/home';
import SelectClinic from './src/screens/selectClinic/selectClinic';
import SelectMedic from './src/screens/selectMedic/selectMedic';
import SelectData from './src/screens/selectData/selectData';
import ShowLocation from './src/screens/showLocation/showLocation';
import { Main } from './src/screens/main/main';

// instância do Stack Navigator
const Stack = createNativeStackNavigator();



export default function App() {

  const [fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_700Bold,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Quicksand_400Regular,
    Quicksand_500Medium
  })

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    // Criando nossa navegação personalizada

    // Container
    // stacknavigator
    // stack screen

    // envolve a estrutura de navegação

    <NavigationContainer>
      {/* componente para navegação */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>



      <Stack.Screen
          name='Appointment'
          component={Appointment}
          options={{ title: "Appointment" }}
        />

        {/* tela Login */}
        <Stack.Screen
          // navegação
          name='Login'
          // componente que será chamado
          component={Login}
          // título da tela
          options={{ title: "Login" }} />


        {/* Tela main */}
        <Stack.Screen
          name='Main'
          component={Main} />

        {/* recuperar senha */}
        <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}
          options={{ title: "Forgot Password" }}
        />

        <Stack.Screen

          name="CheckEmail"

          component={CheckEmail}

          options={{ title: "CheckEmail" }}
        />

        <Stack.Screen

          name='RedefinePassword'

          component={RedefinePassword}

          options={{ title: "Redefine Passord" }}

        />

        <Stack.Screen

          name='CreateAccount'

          component={CreateAccount}

          options={{ title: "Create Account" }}
        />

        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{ title: "Profile" }}
        />



        <Stack.Screen
          name='EditAppointment'
          component={EditAppointment}
          options={{ title: "EditAppointment" }}
        />

        <Stack.Screen
          name='EditProfile'
          component={EditProfile}
          options={{ title: "Edit Profile" }}
        />

        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home' }}
        />

        <Stack.Screen
          name='SelectClinic'
          component={SelectClinic}
          options={{ title: 'SelectClinic' }} />

        <Stack.Screen
          name='SelectMedic'
          component={SelectMedic}
          options={{ title: 'SelectMedic' }} />

        <Stack.Screen
          name='SelectData'
          component={SelectData}
          options={{ title: 'SelectData' }} />

        <Stack.Screen
          name='ShowLocation'
          component={ShowLocation}
          options={{ title: 'ShowLocation' }} />

      </Stack.Navigator>

    </NavigationContainer>

  );
}