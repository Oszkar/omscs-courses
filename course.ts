module App {

    export const CURRENT_SEMESTER = Semester.Fall2015;

    export enum Semester { Before, Fall2015, Spring2016, Fall2016, Future };

    export class Course {
        id: number;
        subject: string;
        title: string;
        available: Semester;
        foundational: boolean;
        url: string;
        instructors: string[];
        // TODO: maybe links to reviews / critique

        get current(): boolean {
            return this.available <= CURRENT_SEMESTER;
        }

        get fullCourseNumber(): string {
            return this.subject + this.id.toString();
        }
    }
}