var App;
(function (App) {
    /**
     * Enum for semesters, 'Before' is before Fall 2015, 'Future' is after Fall 2016
     * @enum {number}
     */
    (function (Semester) {
        Semester[Semester["Before"] = 0] = "Before";
        Semester[Semester["Fall2015"] = 1] = "Fall2015";
        Semester[Semester["Spring2016"] = 2] = "Spring2016";
        Semester[Semester["Fall2016"] = 3] = "Fall2016";
        Semester[Semester["Future"] = 4] = "Future";
    })(App.Semester || (App.Semester = {}));
    var Semester = App.Semester;
    ;
    // TODO update this every semester :)
    /** @constant {Semester} The currently ongoing semester */
    App.CURRENT_SEMESTER = Semester.Fall2015;
    /**
     * Class that represents a single course
     * @class
     */
    var Course = (function () {
        function Course() {
        }
        Object.defineProperty(Course.prototype, "current", {
            // TODO: maybe links to reviews / critique
            /** @property {boolean } current Is the course currently offered? */
            get: function () {
                return this.available <= App.CURRENT_SEMESTER;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Course.prototype, "fullCourseNumber", {
            /** @property {string } fullCourseNumber Subject+id, e.g. CS4242 */
            get: function () {
                return this.subject + this.id.toString();
            },
            enumerable: true,
            configurable: true
        });
        return Course;
    })();
    App.Course = Course;
})(App || (App = {}));
//# sourceMappingURL=course.js.map