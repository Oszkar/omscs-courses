var App;
(function (App) {
    /**
     * AngularJS contorller for the simple course list view. Holds the list of courses and can
     * update the table via some computed parameters e.g. whether a class should be shown in the table based on the current settings.
     * @class
     */
    var CourseListController = (function () {
        /**
         * @constructor
         * @param {ng.IScope} $scope - AngularJS scope
         * @param {NgTableParams} NgTableParams - ng-table module
         */
        function CourseListController($scope, NgTableParams, courses) {
            this._courses = [];
            this._specializations = [];
            // these will be the options in the semester selector dropdown that we will be populating with angular from here
            // id will be a number on the JS side
            this.semesterOptions = [{ id: App.Semester.Future, text: "All courses" },
                { id: App.Semester.Spring2017, text: "Current only" },
                { id: App.Semester.Fall2017, text: "Current + Fall2017" }];
            this._$scope = $scope;
            this._ngTableClass = NgTableParams;
            if (courses) {
                this._courses = courses;
            }
        }
        Object.defineProperty(CourseListController.prototype, "courses", {
            /** @property {Course[]} Courses The course data as an array */
            get: function () {
                return this._courses;
            },
            set: function (c) {
                this._courses = c;
                this.currentSelection = App.Semester.Spring2017;
                this.tableParams = new this._ngTableClass({
                    count: 80,
                    sorting: { available: "asc" }
                }, {
                    counts: [],
                    dataset: this._courses
                });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @function
         * @param {number} id - Course id (without the subject)
         * @returns {Course} The found course, null if not found
         */
        CourseListController.prototype.getById = function (id) {
            var found;
            this._courses.forEach(function (item) {
                if (item.id == id) {
                    found = item;
                }
            });
            return found;
        };
        /**
         * @function
         * @param {number} id - Course id (without the subject)
         * @returns {boolean} Whether the queried class should be shown in the table based on the current settings
         */
        CourseListController.prototype.canShow = function (id) {
            var course = this.getById(id);
            if (course == null) {
                console.log("Can't find course id# " + id + ", it won't show up in the table");
                return false;
            }
            var avail = course.available;
            if (typeof avail == "string") {
                // can happen that it's in string format convert back to enum/number and compare
                // (toString needed for typescript because it thinks it is an enum but this case it isn't)
                if (this.currentSelection == App.Semester.Future)
                    return true;
                return 0 < App.Semester[avail.toString()] && App.Semester[avail.toString()] <= this.currentSelection;
            }
            else if (typeof avail == "number") {
                // happy path
                if (this.currentSelection == App.Semester.Future)
                    return true;
                return 0 < avail && avail <= this.currentSelection;
            }
            else {
                console.log("Cannot read availability property of id# " + id + ", it won't show up in the table");
                return false;
            }
        };
        /**
         * Convert the semester enum into user-friendly text
         * @function
         * @param {number} num - Semester enum, which is esentially a number on the JS side
         * @returns {string} Enum converted to display-friendly text
         */
        CourseListController.prototype.availabilityText = function (num) {
            switch (num) {
                case App.Semester.Before:
                    return "Before Fall 2015";
                    break;
                case App.Semester.Fall2015:
                    return "Fall 2015";
                    break;
                case App.Semester.Spring2016:
                    return "Spring 2016";
                    break;
                case App.Semester.Fall2016:
                    return "Fall 2016";
                    break;
                case App.Semester.Spring2017:
                    return "Spring 2017";
                    break;
                case App.Semester.Fall2017:
                    return "Fall 2017";
                    break;
                case App.Semester.Future:
                    return "Future";
                    break;
                case App.Semester.Discontinued:
                    return "Discountinued";
                    break;
                default:
                    return "Uknown availability property";
            }
        };
        return CourseListController;
    })();
    App.CourseListController = CourseListController;
})(App || (App = {}));
//# sourceMappingURL=app.courselistcontroller.js.map