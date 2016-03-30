// angular init/start
// TODO json data should be loaded here beforehand but for some reason angular won't start/initialize from callback
var app = angular.module('omscs-course-app', ['ngTable']);
app.controller('courselistcontroller', function ($scope, NgTableParams) { return new App.CourseListController($scope, NgTableParams); });
app.controller('coursematrixcontroller', function ($scope, NgTableParams) { return new App.CourseMatrixController($scope, NgTableParams); });
app.controller('speclistcontroller', function ($scope, NgTableParams) { return new App.CourseMatrixController($scope, NgTableParams); });
//# sourceMappingURL=app.js.map