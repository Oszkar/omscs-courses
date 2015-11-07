module App {

    export enum Semester { Before, Fall2015, Spring2016, Fall2016, Future };

    export class Course {
        id: number;
        subject: string;
        title: string;
        available: Semester;
        foundational: boolean;
        url: string;
        instructors: string[];

        get current(): boolean {
            return this.available <= Semester.Fall2015;
        }
    }
}