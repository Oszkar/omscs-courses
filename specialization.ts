module App {

    /**
     * Holds a group of courses.
     * @class
     */
    export class courseGroup {
        /** @property {string} groupName The name/title of this group */
        groupName: string;
        /** @property {number} minCourses Minimum number ouf courses that have to be completed from this group */
        minCourses: number;
        /** @property {number[]} courseList Array of course ids that are within this group */
        courseList: number[];
    }

    /**
     * Holds groups of courses. Serves as a master group for core and elective courses that can hold additional sub-groups
     * @class
     */
    export class masterGroup {
        /** @property {number} minCourses Minimum number ouf courses that have to be completed */
        minCourses: number;
        /** @property {courseGroup} groups The course groups */
        groups: courseGroup[];
    }

    /**
     * Class that represents a single specialization
     * @class
     */
    export class Specialization {
        /** @property {string} title Title or name of the specialization */
        title: string;
        /** @property {masterGroup} core The core courses of this specialization */
        core: masterGroup;
        /** @property {masterGroup} electives The elective courses of this specialization */
        electives: masterGroup;
        /** @property {string } url GaTech website url of the specialization */
        url: string;
    }
}