interface IColors {
    BACKGROUND: string;
    BACKGROUND_CUSTOM: (opasity: number) => string;
    BACKGROUND_LIGHT: string;
    LIME: string;
    LIME_DARK: string;
    LIME_70: string;
    LIME_CUSTOM: (opasity: number) => string;
    WHITE_CUSTOM: (opasity: number) => string;
    WHITE_40: string;
    WHITE_70: string;
    GREY: string;
    GREY_CUSTOM: (opasity: number) => string;
    DARK_GREY: string;
    LIGHT_GREY: string;
    MEDIUM_GREY: string;
    MEDIUM_GREY_50: string;
    ARCTIC: string;
    YELLOW: string;
    BUTTON_COLOR_GREEN: string;
    BUTTON_COLOR_YELLOW: string;
    BUTTON_COLOR_RED: string;
    FON_GREY: string;
    /**
     * Для DragLIst
     */
    metal_black: string;
    night_shadow: string;
    crystal_white: string;
    silver_storm: string;
}

const LIME_CUSTOM = (opasity: number) => `rgba(217, 245, 17, ${opasity})`;
const WHITE_CUSTOM = (opasity: number) => `rgba(255, 255, 255, ${opasity})`;
const GREY_CUSTOM = (opasity: number) => `rgba(111, 113, 115, ${opasity})`;
const BACKGROUND_CUSTOM = (opasity: number) => `rgba(19, 19, 19, ${opasity})`;



export const COLOR_ROOT: IColors = {
    BACKGROUND: '#131313',
    BACKGROUND_CUSTOM,
    BACKGROUND_LIGHT: '#777777',
    LIME: '#D9F511',
    LIME_DARK: '#545f06',
    LIME_70: 'rgba(217, 245, 17, 0.7)',
    LIME_CUSTOM,
    WHITE_CUSTOM,
    WHITE_40: 'rgba(255, 255, 255, .4)',
    WHITE_70: 'rgba(255, 255, 255, .7)',
    GREY: '#444B53',
    GREY_CUSTOM,
    DARK_GREY: '#28292c',
    LIGHT_GREY: '#ececec',
    FON_GREY: '#404040',
    MEDIUM_GREY: '#6f7173',
    MEDIUM_GREY_50: 'rgba(111, 113, 115, .7)',
    ARCTIC: '#5be1ea',
    YELLOW: '#F0D82A',

    BUTTON_COLOR_GREEN: 'rgba( 47, 168, 138, .6)',
    BUTTON_COLOR_YELLOW: 'rgba( 243, 205, 68, .6)',
    BUTTON_COLOR_RED: 'rgba( 241, 50, 43, .5)',

    metal_black: '#0E0C0A',
    night_shadow: '#1C1C1C',
    crystal_white: '#FFFFFF',
    silver_storm: '#808080'
};

