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
        function CourseListController($scope, NgTableParams) {
            this._courses = [];
            // these will be the options in the semester selector dropdown that we will be populating with angular from here
            // id will be a number on the JS side
            this.semesterOptions = [{ id: App.Semester.Future, text: "All courses" },
                { id: App.Semester.Fall2016, text: "Current + Spring2016 + Fall2016" },
                { id: App.Semester.Spring2016, text: "Current + Spring2016" },
                { id: App.Semester.Fall2015, text: "Current only" }];
            var that = this;
            // TODO move json loading outside from here if I can figure out how
            $.getJSON("coursedata.json", function (data) {
                data.forEach(function (item) {
                    // use the serializationhelper to properly deserialize from JSON
                    // without this, we won't have the functions of Course, only the data that is in the JSON (no proper cast in JS)
                    that._courses.push(CourseListController.toInstance(new App.Course(), JSON.stringify(item)));
                });
                that.currentSelection = App.Semester.Spring2016;
                that.tableParams = new NgTableParams({
                    count: 70 // initial page size
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
        Object.defineProperty(CourseListController.prototype, "courses", {
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
                case App.Semester.Future:
                    return "Future";
                    break;
                default:
                    return "Uknown availability property";
            }
        };
        /**
         * SerializationHelper
         * helps to properly deserialize JSON data so that the deserialized object will have functions also not only the data in the JSON
         * @function
         * @param {T} obj - The object to deserialize into
         * @param {string} json - The json
         * @returns {T} The object filled with the json data
         */
        CourseListController.toInstance = function (obj, json) {
            var jsonObj = JSON.parse(json);
            if (typeof obj["fromJSON"] === "function") {
                obj["fromJSON"](jsonObj);
            }
            else {
                for (var propName in jsonObj) {
                    obj[propName] = jsonObj[propName];
                }
            }
            return obj;
        };
        return CourseListController;
    })();
    App.CourseListController = CourseListController;
})(App || (App = {}));
//# sourceMappingURL=app.controller.js.map