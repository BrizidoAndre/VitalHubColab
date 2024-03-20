// Funções de data

export const getToday = () => {

    const date = new Date();

    let dateTitle = date.toLocaleString('default', { month: 'long', year: 'numeric' })

    dateTitle = dateTitle[0].toUpperCase() + dateTitle.slice(1,100)

    return dateTitle;
}

export const mapsKey = "AIzaSyAqIF5MN4yo8ZHwg9WsKP14I-fAK6hpKWY";