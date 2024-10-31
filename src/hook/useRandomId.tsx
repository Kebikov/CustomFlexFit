import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


const useRandomId = () => {
    return uuidv4();
}


export default useRandomId;