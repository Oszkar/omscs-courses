var App;
(function (App) {
    (function (Semester) {
        Semester[Semester["Currently"] = 0] = "Currently";
        Semester[Semester["Fall2015"] = 1] = "Fall2015";
        Semester[Semester["Spring2016"] = 2] = "Spring2016";
        Semester[Semester["Falll2016"] = 3] = "Falll2016";
        Semester[Semester["Future"] = 4] = "Future";
    })(App.Semester || (App.Semester = {}));
    var Semester = App.Semester;
    ;
    var Course = (function () {
        function Course() {
        }
        Object.defineProperty(Course.prototype, "current", {
            get: function () {
                return this.available == Semester.Currently || this.available == Semester.Fall2015;
            },
            enumerable: true,
            configurable: true
        });
        return Course;
    })();
    App.Course = Course;
})(App || (App = {}));
//# sourceMappingURL=course.js.map