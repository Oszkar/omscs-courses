// angular init/start
// TODO json data should be loaded here beforehand but for some reason angular won't start/initialize from callback

var app = angular.module('omscs-course-app', ['ngTable']);

app.controller('courselistcontroller', ($scope, NgTableParams) => new App.CourseListController($scope, NgTableParams));
app.controller('coursematrixcontroller', ($scope, NgTableParams) => new App.CourseMatrixController($scope, NgTableParams));