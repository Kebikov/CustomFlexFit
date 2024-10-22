import { Alert, ToastAndroid, Platform } from "react-native";


const showMessage = (msg: string) => {
    if(Platform.OS === 'ios') {
        Alert.alert(msg);
    } else {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    }
}

export default showMessage;