module App {
    /**
     * AngularJS contorller for the course vs specialization matrix view. Holds the list of courses and specializations and can 
     * update the table via some computed parameters e.g. whether a class should be shown in the table based on the current settings.
     * @class
     */
    export class CourseMatrixController extends App.CourseListController {
        protected _specializations: Specialization[] = [];
        protected d: any;

        /**
         * @constructor
         * @param {ng.IScope} $scope - AngularJS scope
         * @param {NgTableParams} NgTableParams - ng-table module
         */
        constructor($scope: ng.IScope, NgTableParams, courses?: Course[]) {
            super($scope, NgTableParams, courses);
        }

        /** @property {Specialization[]} specializations The specialization data as an array */
        get specializations(): Specialization[] {
            return this._specializations;
        }
        set specializations(s: Specialization[])  {
            this._specializations = s;
            // we doesn't need to update the table here because the table actually shows the courses, the specialization data is used for coloring the table
            // see CourseListController, the course update happens there
        }

        /**
         * Resturns the type of the course (as a text) with respect the passed specialization.
         * The returned string can be directly used as a CSS class.
         * @function
         * @param {number} courseId - Course id (without the subject)
         * @param {string} specTitle - Specialization title (that serves as an id)
         * @returns {string} 'core', 'elective' or empty string as a result of the lookup
         */
        public getCourseType(courseId: number, specTitle: string): string {
            var spec = this.getSpec(specTitle);
            if (spec == null) {
                console.log("ERROR in getCourseType, cannot find spectialization " + specTitle);
                return "";
            }

            if (this.isCoreOf(courseId, spec)) {
                return "core";
            } else if (this.isElectiveOf(courseId, spec)) {
                return "elective";
            } else {
                return "";
            }
        }

        /**
         * @function
         * @param {string} title - Specialization title (that serves as an id)
         * @returns {Specialization} The found specialization, null if not found
         */
        public getSpec(title: string): Specialization {
            if (this._specializations == null) {
                console.log("ERROR in getSpec, spec list is empty/null");
                return null;
            }

            var found: Specialization;
            this._specializations.forEach((item) => {
                if (item.title == title) {
                    found = item;
                }
            });

            return found;
        }

        /**
         * @function
         * @param {number} courseId - Course id (without the subject)
         * @param {Specialization} spec - The specialization
         * @returns {boolean} Is the given course an elective in the given specialization
         */
        public isElectiveOf(courseId: number, spec: Specialization): boolean {
            var found: boolean = false;

            spec.electives.groups.forEach((group: courseGroup) => {
                found = found || $.inArray(parseInt(courseId.toString()), group.courseList) >= 0;
            });

            return found;
        }

        /**
         * @function
         * @param {number} courseId - Course id (without the subject)
         * @param {Specialization} spec - The specialization
         * @returns {boolean} Is the given course an core course in the given specialization
         */
        public isCoreOf(courseId: number, spec: Specialization): boolean {
            var found: boolean = false;

            spec.core.groups.forEach((group: courseGroup) => {
                found = found || $.inArray(parseInt(courseId.toString()), group.courseList) >= 0;
            });

            return found;
        }
    }
}