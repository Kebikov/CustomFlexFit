import { StyleSheet } from 'react-native';
import { COLOR_ROOT } from '@/constants/colors';


export const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 8,
        backgroundColor: COLOR_ROOT.FON_GREY,
        borderRadius: 18
    },
    contaiber_body: {
        width: '100%',
        flexDirection: 'row'
    },
    box_img: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        borderRadius: 12
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 12
    },
    box_text: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        textTransform: 'uppercase',
        color: COLOR_ROOT.LIME_70,
        fontSize: 13,
        fontWeight: '500'
    },
    text_weight: {
        color: 'white',
        fontSize: 13
    },
    box_switcher: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});