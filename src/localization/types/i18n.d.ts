import i18next from "i18next";
import type { ILng_alert_and_toast } from "../translations/alert_and_toast/types/alert_and_toast.type";
import type { ILng_Button } from "../translations/button/types/button.type";
import type { ILng_Day } from "../translations/[day]/types/day.type";
import type { ILng_Exercise } from "../translations/[exercise]/types/exercise.type";
import type { ILng_Equipment } from "../translations/[equipment]/types";


declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            'button': ILng_Button,
            'alert_and_toast': ILng_alert_and_toast,
            '[day]': ILng_Day,
            '[exercise]': ILng_Exercise,
            '[equipment]': ILng_Equipment,
            'common': {
                title: string;
                description: string;
                placeholderTitle: string;
                placeholderDescription: string;
            }
        }
    }
}