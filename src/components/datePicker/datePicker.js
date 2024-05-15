import DateTimePicker from "react-native-modal-datetime-picker";

const DatePicker = ({ isDatePickerVisible, setDatePickerVisibility, userData, setUserData}) => {

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default',{month:'2-digit'});
        const year = date.getFullYear();
        setUserData({
            ...userData,
            dataNascimento: year + '-' + month + '-' + day
        })
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <>
            <DateTimePicker
                maximumDate={new Date()}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    )
}


export default DatePicker