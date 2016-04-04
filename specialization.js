var App;
(function (App) {
    /**
     * Holds a group of courses.
     * @class
     */
    var courseGroup = (function () {
        function courseGroup() {
        }
        return courseGroup;
    })();
    App.courseGroup = courseGroup;
    /**
     * Holds groups of courses. Serves as a master group for core and elective courses that can hold additional sub-groups
     * @class
     */
    var masterGroup = (function () {
        function masterGroup() {
        }
        Object.defineProperty(masterGroup.prototype, "numCourses", {
            get: function () {
                var num = 0;
                this.groups.forEach(function (item) {
                    num += item.courseList.length;
                });
                return num;
            },
            enumerable: true,
            configurable: true
        });
        return masterGroup;
    })();
    App.masterGroup = masterGroup;
    /**
     * Class that represents a single specialization
     * @class
     */
    var Specialization = (function () {
        function Specialization() {
        }
        Object.defineProperty(Specialization.prototype, "numCourses", {
            get: function () {
                return this.core.numCourses + this.electives.numCourses;
            },
            enumerable: true,
            configurable: true
        });
        return Specialization;
    })();
    App.Specialization = Specialization;
})(App || (App = {}));
//# sourceMappingURL=specialization.js.map