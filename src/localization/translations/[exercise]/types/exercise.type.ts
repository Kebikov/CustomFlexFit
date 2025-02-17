export interface ILng_Exercise {
    addExercise: {
        headerText: string;

        title: string;
        titleInput: string;
        placeholderTitle: string;

        description: string;
        titleInputDescription: string;
        placeholderDescription: string;

        infoAddImage: string;
        infoCreateExercise: string;
    },
    addSet: {
        titleAddSet: string;
        nameAndNote: string;

        titleReps: string;
        titleRest: string;
        titleExerciseTime: string;
        titleWeight: string;

        unitsReps: string;
        unitsMimutes: string;
        unitsSeconds: string;

        helpTextNameNote: string;
        helpTextReps: string;
        helpTextRest: string;
        helpTextExerciseTime: string;
        helpTextWeight: string;

        set: string;
        weightPlaseholder: string;
        totalWeight: string;
        barbellAndPlateWeight: string;
    },
    common: {
        barbell: string;
        dumbbell: string;
        plate: string;
    },
    equipment: {
        yourEquipment: string;
        yourEquipmentInfo: string;
        kilograms: string;
    }
}