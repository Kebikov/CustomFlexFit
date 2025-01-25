import { Stack } from 'expo-router';

const ExerciseLayout = () => {

    return(
        <Stack screenOptions={{headerShown: false}} >
            <Stack.Screen name='addExercise' options={{animation: 'ios_from_left'}} />
            <Stack.Screen name='[id]' options={{animation: 'ios_from_left'}} />
            <Stack.Screen name="addRepsRest" options={{animation: 'ios_from_left'}} />
            
            <Stack.Screen name="modal" options={{presentation: 'modal'}} />
            <Stack.Screen name="modalAddImageExercise" options={{presentation: 'modal'}} />
        </Stack>
    )
}

export default ExerciseLayout;

