import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DayDTO } from '@/SQLite/Day/DTO/DayDTO';
import { RootState } from '../store/store';
import type { ExerciseDTO } from '@/SQLite/Exercise/DTO/Day.DTO';





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
