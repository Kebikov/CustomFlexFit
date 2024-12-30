import { useMemo } from 'react';
import type { 
    IArraysForClock, 
    TTypeClock 
} from "../types";


export const useGetOptionsClock = (
    typeClock: TTypeClock | IArraysForClock
) => {

    let optionsClock: IArraysForClock;
    
    if(typeof typeClock === 'object') {
        optionsClock = typeClock;
        optionsClock.one.total = useMemo(() => optionsClock.one.total + optionsClock.one.step, [optionsClock.one.step]); 
        optionsClock.two.total = useMemo(() => optionsClock.two.total + optionsClock.two.step, [optionsClock.two.step]); 
    } else {
        switch(typeClock) {
            case 'hours/minutes':
                optionsClock = {one: {total: 24, step: 1}, two: {total: 60, step: 5}};
                break;
            case 'minutes_30/seconds':
                optionsClock = {one: {total: 30, step: 1}, two: {total: 60, step: 5}};
                break;
            default:
                optionsClock = {one: {total: 24, step: 1}, two: {total: 60, step: 5}};
                break;
        }
        optionsClock.one.total = useMemo(() => optionsClock.one.total + optionsClock.one.total, [optionsClock.one.step]);
        optionsClock.two.total = useMemo(() => optionsClock.two.total + optionsClock.two.step, [optionsClock.two.step]); 
    }

    return {
        optionsClock
    }
}