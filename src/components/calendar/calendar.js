
import { Mont20600Gray, Sand12600, Sand16500Date, Sand16500DateSelected } from "../title/title";
import { CalendarRowContainer, CalendarRowNumberContainer, DateBox, DateSelectedBox, NumberDateContainer, NumberDateContainerPosition, TextDate, TextDateSelected, TextNumberDate, TextNumberDateSelected } from "./style";
import { CalendarContainer } from "../container/style";

const today = new Date();

export const ProduceDate = ({ i, selected = false, onPress = null }) => {
    
    var data = new Date()
    data.setDate(today.getDate() + i)

    var dataNumber = data.toLocaleDateString('default', { day: '2-digit' });

    var dataWeek = data.toLocaleDateString('default', { weekday: 'short' });
    dataWeek = dataWeek.slice(0, -1)


    if (selected === true) {
        return (
            <DateSelectedBox >
                <TextDateSelected>{dataWeek}</TextDateSelected>
                <TextNumberDateSelected>{dataNumber}</TextNumberDateSelected>
            </DateSelectedBox>
        )

    }
    else {
        return (
            <DateBox onPress={onPress}>
                <TextDate>{dataWeek}</TextDate>
                <TextNumberDate>{dataNumber}</TextNumberDate>
            </DateBox>
        )
    }
}


export const AllCalendar = ({ selected, onPress }) => {


    // Obtendo o mês e colocando em uppercase
    let dateMonth = today.toLocaleDateString('default', { month: 'long' })
    dateMonth = dateMonth[0].toLocaleUpperCase() + dateMonth.slice(1, 10)

    // Obtendo o ano
    const dateYear = today.toLocaleDateString('default', { year: 'numeric' })

    const getWeekDay = (day) => {
        let dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + day)
        // Obtendo o dia da semana e colocando em uppercase
        let dateWeek = dateNow.toLocaleDateString('default', { weekday: 'short' })
        dateWeek = dateWeek[0].toLocaleUpperCase() + dateWeek.slice(1, 3)
        return dateWeek
    }

    const getNumberDay = (day) => {
        let today = new Date();
        let varDay = new Date();

        varDay.setDate(today.getDate() + day)
        
        let numeric = varDay.toLocaleDateString('default', { day: '2-digit' })
        return numeric
    }

    let days = [];
    let daysIndex = [];

    const getAllDays = () => {
        

        for (let i = 0; i < 35; i++) {

            days.push(
                <Sand16500Date onPress={() => {onPress(i)}}>{getNumberDay(i)}</Sand16500Date>
            )
            daysIndex.push(getNumberDay(i));
        }
    }

    const replace = () => {

        days[selected] =
            <NumberDateContainer>
                <NumberDateContainerPosition>
                    <Sand16500DateSelected>
                        {getNumberDay(selected)}
                    </Sand16500DateSelected>
                </NumberDateContainerPosition>
            </NumberDateContainer>
    }


    return (
        <CalendarContainer>
            <Mont20600Gray>{dateMonth}  {dateYear}</Mont20600Gray>
            <CalendarRowContainer>
                <Sand12600>{getWeekDay(0)}</Sand12600>
                <Sand12600>{getWeekDay(1)}</Sand12600>
                <Sand12600>{getWeekDay(2)}</Sand12600>
                <Sand12600>{getWeekDay(3)}</Sand12600>
                <Sand12600>{getWeekDay(4)}</Sand12600>
                <Sand12600>{getWeekDay(5)}</Sand12600>
                <Sand12600>{getWeekDay(6)}</Sand12600>
            </CalendarRowContainer>
            <CalendarRowNumberContainer>
                {getAllDays()}
                {replace()}
                {days}
            </CalendarRowNumberContainer>
        </CalendarContainer>
    )
}