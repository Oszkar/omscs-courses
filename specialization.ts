module App {

    export class courseGroup {
        groupName: string;
        minCourses: number;
        courseList: number[];
    }

    export class masterGroup {
        minCourses: number;
        groups: courseGroup[];
    }

    /**
     * Class that represents a single specialization
     * @class
     */
    export class Specialization {
        /** @property {string} title Title or name of the specialization */
        title: string;
        /** @property */
        core: masterGroup;
        /** @property */
        electives: masterGroup;
        /** @property {string } url GaTech website url of the specialization */
        url: string;
    }
}