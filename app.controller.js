var App;
(function (App) {
    /**
     * AngularJS contorller for the simple course list view. Holds the list of courses and can
     * update the table via some computed parameters e.g. whether a class should be shown in the table based on the current settings.
     * @class
     */
    var CourseController = (function () {
        /**
         * @constructor
         * @param {ng.IScope} $scope - AngularJS scope
         * @param {NgTableParams} NgTableParams - ng-table module
         */
        function CourseController($scope, NgTableParams) {
            // these will be the options in the semester selector dropdown that we will be populating with angular from here
            // id will be a number on the JS side
            this.semesterOptions = [{ id: App.Semester.Future, text: "All courses" },
                { id: App.Semester.Fall2016, text: "Current + Spring2016 + Fall2016" },
                { id: App.Semester.Spring2016, text: "Current + Spring2016" },
                { id: App.Semester.Fall2015, text: "Current only" }];
            var that = this;
            // TODO move json loading outside from here if I can figure out how
            $.getJSON("coursedata.json", function (data) {
                that._courses = data;
                that.currentSelection = App.Semester.Spring2016;
                that.tableParams = new NgTableParams({
                    count: 50 // initial page size
                }, {
                    counts: [],
                    dataset: that._courses
                });
                // call apply as we updated the model from jquery which is not the prettiest solution around
                $scope.$apply();
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
        }
        Object.defineProperty(CourseController.prototype, "courses", {
            /** @property {Course[]} Courses The course data as an array */
            get: function () {
                return this._courses;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @function
         * @param {number} id - Course id (without the subject)
         * @returns {Course} The found course, null if not found
         */
        CourseController.prototype.getById = function (id) {
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
        CourseController.prototype.canShow = function (id) {
            var course = this.getById(id);
            if (course == null) {
                console.log("Can't find course id# " + id + ", it won't show up in the table");
                return false;
            }
            var avail = course.available;
            if (typeof avail == "string") {
                // can happen that it's in string format convert back to enum/number and compare
                // (toString needed for typescript because it thinks it is an enum but this case it isn't)
                return App.Semester[avail.toString()] <= this.currentSelection;
            }
            else if (typeof avail == "number") {
                // happy path
                return avail <= this.currentSelection;
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
        CourseController.prototype.availabilityText = function (num) {
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
                case App.Semester.Future:
                    return "Future";
                    break;
                default:
                    return "Uknown availability property";
            }
        };
        return CourseController;
    })();
    App.CourseController = CourseController;
})(App || (App = {}));
//# sourceMappingURL=app.controller.js.map