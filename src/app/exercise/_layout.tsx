import { Stack, } from 'expo-router';

const ExerciseLayout = () => {

    return(
        <Stack screenOptions={{headerShown: false}} >
            <Stack.Screen name='addExercise' options={{animation: 'ios'}} />
            <Stack.Screen name='[id]' options={{animation: 'ios'}} />
            <Stack.Screen name="addRepsRest" options={{animation: 'ios'}} />
            
            <Stack.Screen name="modal" options={{presentation: 'modal'}} />
            <Stack.Screen name="modalAddImageExercise" options={{presentation: 'modal'}} />
        </Stack>
    )
}

export default ExerciseLayout;

