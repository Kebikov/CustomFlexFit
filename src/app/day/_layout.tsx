import { Stack, } from 'expo-router';

const DayLayout = () => {

    return(
        <Stack screenOptions={{headerShown: false}} >
            <Stack.Screen name='addDay' options={{animation: 'ios_from_left'}}/>
            <Stack.Screen name='guide' options={{animation: 'ios_from_left'}}/>
            <Stack.Screen name='listDay' options={{animation: 'ios_from_left'}}/>

            <Stack.Screen name="modalAddDay" options={{presentation: 'modal'}} />
        </Stack>
    )
}

export default DayLayout;

