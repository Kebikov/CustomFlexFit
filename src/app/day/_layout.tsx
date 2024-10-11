import { Stack, } from 'expo-router';

const DayLayout = () => {

    return(
        <Stack screenOptions={{headerShown: false}} >
            <Stack.Screen name='addDay' options={{animation: 'ios'}}/>
            <Stack.Screen name='guide' options={{animation: 'ios'}}/>
            <Stack.Screen name='listDay' options={{animation: 'ios'}}/>
        </Stack>
    )
}

export default DayLayout;

