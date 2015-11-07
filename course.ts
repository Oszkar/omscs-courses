module App {

    export enum Semester { Currently, Fall2015, Spring2016, Falll2016, Future };

    export class Course {
        id: number;
        dept: string;
        title: string;
        available: Semester;
        foundational: boolean;
        url: string;
        instructors: string[];

        get current() {
            return this.available == Semester.Currently || this.available == Semester.Fall2015;
        }
    }
}