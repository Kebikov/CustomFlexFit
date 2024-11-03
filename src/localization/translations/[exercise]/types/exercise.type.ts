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
    modalAddRepsRest: {
        titleModalAddRepsRest: string;
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
    }
}