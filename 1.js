// class WorkoutTracker {
//     activities = [];

//     addActivity(activityName) {
//         if (activityName === 'running') {
//             this.activities.push({
//                 name: 'running',
//                 coefficient: 0.8,
//                 calculateStrain(time, heartbeat) {
//                     return heartbeat * this.coefficient / time;
//                 }
//             });
//         } else if (activityName === 'swimming') {
//             this.activities.push({
//                 name: 'swimming',
//                 coefficient: 0.5,
//                 calculateStrain(time, heartbeat) {
//                     return heartbeat * this.coefficient / time;
//                 }
//             });
//         }
//     }
// }

// class Workout {
    

//     addActivity(activityName) {
//         this.activities.push({
//             name: activityName,
//             coefficient: 1,
//             calculateStrain(time, heartbeat) {
//                 return heartbeat * this.coefficient / time;
//             }
//         });
//     }
// }

class Activity {

    constructor(name, coefficient) {
        this.name = name;
        this.coefficient = coefficient;
    }

    add() {
        return {
            name: this.name,
            coefficient: this.coefficient,
            calculateStrain(time, heartbeat) {
                return heartbeat * this.coefficient / time;
            }
        }
    }
}

class WorkoutRunning extends Activity {
    constructor() {
        super('running', 0.8)
    }
}

class WorkoutSwimming extends Activity {
    constructor() {
        super('swimming', 0.5)
    }
}

class Workout {
    activities = [];

    pushActivities(classWorkout) {
        this.activities.push(classWorkout.add());
    }
}


const workout = new Workout();
const workoutRunning = new WorkoutRunning();
const workoutSwimming = new WorkoutSwimming();

workout.pushActivities(workoutRunning);
workout.pushActivities(workoutSwimming);

console.log(workout.activities);






// class Workout extends Workout {
//     activities = [];

//     push(classWorkout) {
//         classWorkout.addActivity();
//     }
// }

// const workout = new Workout();
// const workoutSwimming = new WorkoutSwimming();
// const workoutRunning = new WorkoutRunning();
// const workoutCalculator = new WorkoutCalculator();

// workoutCalculator.calculator(workoutSwimming);
// workoutCalculator.calculator(workoutRunning);

// console.log(workoutSwimming.activities);
// console.log(workoutRunning.activities);
// console.log(workout.activities);




