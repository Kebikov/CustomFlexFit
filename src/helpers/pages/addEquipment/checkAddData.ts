import { EquipmentDTO } from "@/SQL/Equipment/DTO/EquipmentDTO";
import showMessage from "@/helpers/showMessage";
import i18next from 'i18next';


 /** `Проверка данных перед добавлением в BD` */
export const checkAddDataEquipment = (data: Partial<EquipmentDTO>) => {

    if(!data.title) {
        showMessage(i18next.t('alert_and_toast:notTitle'));
        return false;
    }

    if(!data.weight) {
        showMessage(i18next.t('alert_and_toast:notWeight'));
        return false;
    }

    return true;
}