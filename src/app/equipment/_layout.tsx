import { Stack } from 'expo-router';

const EquipmentLayout = () => {

    return(
        <Stack screenOptions={{headerShown: false}} >
            <Stack.Screen name="addEquipment" options={{animation: 'ios_from_left'}} />
            <Stack.Screen name="index" options={{animation: 'ios_from_left'}} />
            <Stack.Screen name="selectImgEquipment" options={{animation: 'ios_from_left'}} />
        </Stack>
    )
}

export default EquipmentLayout;

