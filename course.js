var App;
(function (App) {
    App.CURRENT_SEMESTER = Semester.Fall2015;
    (function (Semester) {
        Semester[Semester["Before"] = 0] = "Before";
        Semester[Semester["Fall2015"] = 1] = "Fall2015";
        Semester[Semester["Spring2016"] = 2] = "Spring2016";
        Semester[Semester["Fall2016"] = 3] = "Fall2016";
        Semester[Semester["Future"] = 4] = "Future";
    })(App.Semester || (App.Semester = {}));
    var Semester = App.Semester;
    ;
    var Course = (function () {
        function Course() {
        }
        Object.defineProperty(Course.prototype, "current", {
            // TODO: maybe links to reviews / critique
            get: function () {
                return this.available <= App.CURRENT_SEMESTER;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Course.prototype, "fullCourseNumber", {
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