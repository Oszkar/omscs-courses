// angular init/start

module App {
    // start up an angular module and the controllers
    var app = angular.module('omscs-course-app', ['ngTable']);
    var ser: Serialization = new Serialization();

    app.factory('updateService', function () {
        return {
            completedSelection: function (id: number) {
                var completed = App.Cookies.parseCompletedCookies();
                // force it to be number
                id = parseInt(id.toString());
                var idx = completed.indexOf(id);
                if (idx > -1) {
                    completed.splice(idx, 1); // then remove
                } else {
                    completed.push(id);  // then add
                }

                App.Cookies.updateCompletedCookies(completed);
                ser.updateCompletedList(completed);
            }
        };
    });

    app.run(function ($rootScope, updateService) {
        $rootScope.omsapp = updateService;
    });

    app.controller('courselistcontroller', ($scope, NgTableParams) => new App.CourseListController($scope, NgTableParams));
    app.controller('coursematrixcontroller', ($scope, NgTableParams) => new App.CourseMatrixController($scope, NgTableParams));
    app.controller('speclistcontroller', ($scope, NgTableParams) => new App.SpecListController($scope, NgTableParams));

    ser.loadCourses();
    ser.loadSpecializations();
}
