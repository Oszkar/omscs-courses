module App {
    /**
     * AngularJS contorller for the course vs specialization matrix view. Holds the list of courses and specializations and can 
     * update the table via some computed parameters e.g. whether a class should be shown in the table based on the current settings.
     * @class
     */
    export class CourseMatrixController extends App.CourseListController {
        protected _specializations: Specialization[] = [];

        /**
         * @constructor
         * @param {ng.IScope} $scope - AngularJS scope
         * @param {NgTableParams} NgTableParams - ng-table module
         */
        constructor($scope: ng.IScope, NgTableParams) {
            super($scope, NgTableParams);

            // super loads course data, load spec data here
            var that = this;
            // TODO move json loading outside from here if I can figure out how
            $.getJSON("specdata.json", (data) => {
                data.forEach((item) => {
                    // use the serializationhelper to properly deserialize from JSON
                    // without this, we won't have the functions of Course, only the data that is in the JSON (no proper cast in JS)
                    that._specializations.push(CourseMatrixController.toInstance(new Specialization(), JSON.stringify(item)));
                });
                // call apply as we updated the model from jquery which is not the prettiest solution around
                $scope.$apply();
            }).fail((jqxhr, textStatus, error) => {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
        }

        /** @property {Specialization[]} specializations The specialization data as an array */
        get specializations(): Specialization[] {
            return this._specializations;
        }

        /**
         * Resturns the type of the course (as a text) with respect the passed specialization.
         * The returned string can be directly used as a CSS class.
         * @function
         * @param {number} courseId - Course id (without the subject)
         * @param {string} specTitle - Specialization title (that serves as an id)
         * @returns {string} "core', 'elective" or empty string as a result of the lookup
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