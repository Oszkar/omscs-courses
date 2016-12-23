var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    /**
     * AngularJS contorller for the course vs specialization matrix view. Holds the list of courses and specializations and can
     * update the table via some computed parameters e.g. whether a class should be shown in the table based on the current settings.
     * @class
     */
    var CourseMatrixController = (function (_super) {
        __extends(CourseMatrixController, _super);
        /**
         * @constructor
         * @param {ng.IScope} $scope - AngularJS scope
         * @param {NgTableParams} NgTableParams - ng-table module
         */
        function CourseMatrixController($scope, NgTableParams, courses) {
            _super.call(this, $scope, NgTableParams, courses);
        }
        Object.defineProperty(CourseMatrixController.prototype, "specializations", {
            /** @property {Specialization[]} specializations The specialization data as an array */
            get: function () {
                return this._specializations;
            },
            set: function (s) {
                this._specializations = s;
                // we doesn't need to update the table here because the table actually shows the courses, the specialization data is used for coloring the table
                // see CourseListController, the course update happens there
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Resturns the type of the course (as a text) with respect the passed specialization.
         * The returned string can be directly used as a CSS class.
         * @function
         * @param {number} courseId - Course id (without the subject)
         * @param {string} specTitle - Specialization title (that serves as an id)
         * @returns {string} 'core', 'elective' or empty string as a result of the lookup
         */
        CourseMatrixController.prototype.getCourseType = function (courseId, specTitle) {
            var spec = this.getSpec(specTitle);
            if (spec == null) {
                console.log("ERROR in getCourseType, cannot find spectialization " + specTitle);
                return "";
            }
            if (this.isCoreOf(courseId, spec)) {
                return "core";
            }
            else if (this.isElectiveOf(courseId, spec)) {
                return "elective";
            }
            else {
                return "";
            }
        };
        /**
         * @function
         * @param {string} title - Specialization title (that serves as an id)
         * @returns {Specialization} The found specialization, null if not found
         */
        CourseMatrixController.prototype.getSpec = function (title) {
            if (this._specializations == null) {
                console.log("ERROR in getSpec, spec list is empty/null");
                return null;
            }
            var found;
            this._specializations.forEach(function (item) {
                if (item.title == title) {
                    found = item;
                }
            });
            return found;
        };
        /**
         * @function
         * @param {number} courseId - Course id (without the subject)
         * @param {Specialization} spec - The specialization
         * @returns {boolean} Is the given course an elective in the given specialization
         */
        CourseMatrixController.prototype.isElectiveOf = function (courseId, spec) {
            var found = false;
            spec.electives.groups.forEach(function (group) {
                found = found || $.inArray(parseInt(courseId.toString()), group.courseList) >= 0;
            });
            return found;
        };
        /**
         * @function
         * @param {number} courseId - Course id (without the subject)
         * @param {Specialization} spec - The specialization
         * @returns {boolean} Is the given course an core course in the given specialization
         */
        CourseMatrixController.prototype.isCoreOf = function (courseId, spec) {
            var found = false;
            spec.core.groups.forEach(function (group) {
                found = found || $.inArray(parseInt(courseId.toString()), group.courseList) >= 0;
            });
            return found;
        };
        return CourseMatrixController;
    })(App.CourseListController);
    App.CourseMatrixController = CourseMatrixController;
})(App || (App = {}));
//# sourceMappingURL=app.coursematrixcontroller.js.map