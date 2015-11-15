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
        return Specialization;
    })();
    App.Specialization = Specialization;
})(App || (App = {}));
//# sourceMappingURL=specialization.js.map