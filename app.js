// angular init/start
// TODO json data should be loaded here beforehand but for some reason angular won't start/initialize from callback
angular.module('omscs-course-app', ['ngTable'])
    .controller('coursecontroller', function ($scope, NgTableParams) { return new App.CourseController($scope, NgTableParams); });
//# sourceMappingURL=app.js.map