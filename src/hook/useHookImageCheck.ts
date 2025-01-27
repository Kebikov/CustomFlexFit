import { useAppSelector } from "@/redux/store/hooks";


const useHookImageCheck = () => {

    const pathToImageFolder = useAppSelector(state => state.setupSlice.pathToImageFolder);

    const imgCheck = (value: number | string): number | {uri: string} | undefined => {

        if(typeof value === 'string' && isNaN(Number(value))) {

            /**
             * Начинается ли строка со слова file
             * @example 'file:///data/user/0/host.exp.exp...'
             */
            const startString = value.startsWith('file');

            if(startString) {
                return {uri: value}
            } else {
                return {uri: pathToImageFolder + '/' + value}
            }
        }

        /** 
         * @check is Number
         * @example value = 3
         */
        if(typeof value === 'number' ) return value

        /** 
         * @check is Number
         * @example value = '3'
         */
        if( !isNaN(Number(value)) ) {
            return Number(value);
        }
        
    }

    return {
        imgCheck
    }
}

export default useHookImageCheck;