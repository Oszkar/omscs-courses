angular.module('controllerAsExample', ['ngTable'])
    .controller('coursecontroller', ($scope, NgTableParams) => new App.CourseController($scope, NgTableParams));