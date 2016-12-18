module App {

    /**
     * Enum for semesters, 'Before' is before Fall 2015, 'Future' is after Fall 2016
     * @enum {number}
     */
    export enum Semester { Discontinued = -1, Future, Before, Fall2015, Spring2016, Fall2016, Spring2017, Fall2017 }; // future and before are 0 amd 1 so that we can add stuff at the end later

    // TODO update this every semester :)
    /** @constant {Semester} The currently ongoing semester */
    export const CURRENT_SEMESTER = Semester.Fall2016;

    /**
     * Class that represents a single course
     * @class
     */
    export class Course {
        /** @property {number} id Course id */
        id: number;
        /** @property {string} subject Course subject (CS or CSE, most likely) */
        subject: string;
        /** @property {string} title Title or name of the course */
        title: string;
        /** @property {Semester} available From which semester is the course available */
        available: Semester;
        /** @property {boolean } foundational Is the course foundational? */
        foundational: boolean;
        /** @property {string } url GaTech website url of the course */
        url: string;
        /** @property {string[] } instructors List of the instructors/creators/main personell */
        instructors: string[];
        // TODO: maybe links to reviews / critique

        /** @property {boolean } current Is the course currently offered? */
        get current(): boolean {
            return this.available <= CURRENT_SEMESTER && this.available != Semester.Future;
        }

        /** @property {string } fullCourseNumber Subject+id, e.g. CS4242 */
        get fullCourseNumber(): string {
            return this.subject + this.id.toString();
        }
    }
}