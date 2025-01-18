import { Stack } from 'expo-router';

const EquipmentLayout = () => {

    return(
        <Stack screenOptions={{headerShown: false}} >
            <Stack.Screen name="AddEquipment" options={{animation: 'ios_from_left'}} />
            <Stack.Screen name="SelectEquipment" options={{animation: 'ios_from_left'}} />
            <Stack.Screen name="SelectImgEquipment" options={{animation: 'ios_from_left'}} />
        </Stack>
    )
}

export default EquipmentLayout;

