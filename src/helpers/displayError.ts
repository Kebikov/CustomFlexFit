import { Alert, ToastAndroid, Platform } from "react-native"

const displayError = (msg: string) => {
    if(Platform.OS === 'ios') {
        Alert.alert(`Error: ${msg}`);
    } else {
        ToastAndroid.show(`Error: ${msg}`, ToastAndroid.LONG);
    }
}

export default displayError;