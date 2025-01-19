import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
    body: {
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    circle: {
        position: 'absolute',
        top: '50%',
        borderRadius: 100,
        backgroundColor: 'white'
    }
});


export default styles;