import { NavButtonTitle, WhiteNavButtonTitle } from "../button/buttonTitle"
import {BlueNavButton, NavButton} from '../button/button'
import { SmallInput, SmallInputGreen } from "../input/input"
import { Mont14600Green, Mont14600White } from "../title/title"

export const NavButtonComponent = ({selected = false, buttonTitle, onPress=null}) => {
    return(
        <>
            {selected ? 
            <BlueNavButton onPress={onPress}><WhiteNavButtonTitle>{buttonTitle}</WhiteNavButtonTitle></BlueNavButton>
            :
            <NavButton onPress={onPress}><NavButtonTitle>{buttonTitle}</NavButtonTitle></NavButton>
            }
        </>
    )
}


export const AppointmentButton = ({ selected = false, buttonTitle, onPress=null}) =>{


    return(
        <>
         {selected ? 
         <SmallInputGreen><Mont14600White>{buttonTitle}</Mont14600White></SmallInputGreen>
         :
         <SmallInput onPress={onPress}><Mont14600Green>{buttonTitle}</Mont14600Green></SmallInput> 
         }
        
        </>
    )

}