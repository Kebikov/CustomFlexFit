import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DayDTO } from '@/SQLite/day/DTO/day.dto';
import { RootState } from '../store/store';
import type { ExerciseDTO } from '@/SQLite/exercise/DTO/exercise.dto';





//* initialState 
const initialState = {

}


//* setsSlice 
const setsSlice = createSlice({
    name: 'sets',
    initialState,
    reducers: {

    }
});


export default setsSlice.reducer;

export const {

} = setsSlice.actions;
