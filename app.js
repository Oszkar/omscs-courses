// angular init/start
var App;
(function (App) {
    // global data as multiple controllers will use them
    var _courses = [];
    var _completed = [];
    var _specializations = [];
    // start up an angular module and the controllers
    var app = angular.module('omscs-course-app', ['ngTable']);
    app.controller('courselistcontroller', function ($scope, NgTableParams) { return new App.CourseListController($scope, NgTableParams); });
    app.controller('coursematrixcontroller', function ($scope, NgTableParams) { return new App.CourseMatrixController($scope, NgTableParams, function () { $scope.$apply(); }); });
    app.controller('speclistcontroller', function ($scope, NgTableParams) { return new App.SpecListController($scope, NgTableParams); });
    loadCourses();
    loadSpecializations();
    function loadCourses() {
        $.getJSON("coursedata.json", function (data) {
            data.forEach(function (item) {
                // use the serializationhelper to properly deserialize from JSON
                // without this, we won't have the functions of Course, only the data that is in the JSON (no proper cast in JS)
                var course = toInstance(new App.Course(), JSON.stringify(item));
                course.completed = _completed.indexOf(parseInt(course.id.toString())) > -1;
                _courses.push(course);
            });
            // call apply as we updated the model from jquery which is not the prettiest solution around
            //$scope.$apply(); // this will be called in matrixcontroller instead
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        }).done(function (jqxhr, textStatus, error) {
            var cscope = angular.element(document.getElementById("coursectrl")).scope();
            var mscope = angular.element(document.getElementById("matrixctrl")).scope();
            var sscope = angular.element(document.getElementById("speclistctrl")).scope();
            cscope.ctrl.courses = _courses;
            mscope.ctrl.courses = _courses;
            sscope.ctrl.courses = _courses;
        });
    }
    function loadSpecializations() {
        $.getJSON("specdata.json", function (data) {
            data.forEach(function (item) {
                // use the serializationhelper to properly deserialize from JSON
                // without this, we won't have the functions of Specialization, only the data that is in the JSON (no proper cast in JS)
                var s = toInstance(new App.Specialization(), JSON.stringify(item));
                s.core = toInstance(new App.masterGroup(), JSON.stringify(s.core));
                s.electives = toInstance(new App.masterGroup(), JSON.stringify(s.electives));
                _specializations.push(s);
            });
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        }).done(function (jqxhr, textStatus, error) {
            var mscope = angular.element(document.getElementById("matrixctrl")).scope();
            var sscope = angular.element(document.getElementById("speclistctrl")).scope();
            mscope.ctrl.specializations = _specializations;
            sscope.ctrl.specializations = _specializations;
        });
    }
    /**
     * SerializationHelper
     * helps to properly deserialize JSON data so that the deserialized object will have functions also not only the data in the JSON
     * @function
     * @param {T} obj - The object to deserialize into
     * @param {string} json - The json
     * @returns {T} The object filled with the json data
     */
    function toInstance(obj, json) {
        var jsonObj = JSON.parse(json);
        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName];
            }
        }
        return obj;
    }
})(App || (App = {}));
//# sourceMappingURL=app.js.map