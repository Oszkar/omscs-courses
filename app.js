// angular init/start
var App;
(function (App) {
    // start up an angular module and the controllers
    var app = angular.module('omscs-course-app', ['ngTable']);
    var ser = new App.Serialization();
    app.factory('updateService', function () {
        return {
            completedSelection: function (id) {
                var completed = App.Cookies.parseCompletedCookies();
                // force it to be number
                id = parseInt(id.toString());
                var idx = completed.indexOf(id);
                if (idx > -1) {
                    completed.splice(idx, 1); // then remove
                }
                else {
                    completed.push(id); // then add
                }
                App.Cookies.updateCompletedCookies(completed);
                ser.updateCompletedList(completed);
            }
        };
    });
    app.run(function ($rootScope, updateService) {
        $rootScope.omsapp = updateService;
    });
    app.controller('courselistcontroller', function ($scope, NgTableParams) { return new App.CourseListController($scope, NgTableParams); });
    app.controller('coursematrixcontroller', function ($scope, NgTableParams) { return new App.CourseMatrixController($scope, NgTableParams); });
    app.controller('speclistcontroller', function ($scope, NgTableParams) { return new App.SpecListController($scope, NgTableParams); });
    ser.loadCourses();
    ser.loadSpecializations();
})(App || (App = {}));
//# sourceMappingURL=app.js.map