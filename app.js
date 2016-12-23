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
    app.controller('coursematrixcontroller', function ($scope, NgTableParams) { return new App.CourseMatrixController($scope, NgTableParams); });
    app.controller('speclistcontroller', function ($scope, NgTableParams) { return new App.SpecListController($scope, NgTableParams); });
    loadCourses();
    loadSpecializations();
    /**
     * Loads course json, deserializes json data and feeds the course objects into the 3 controllers
     * @function
     */
    function loadCourses() {
        $.getJSON("coursedata.json", function (data) {
            data.forEach(function (item) {
                // use the serializationhelper to properly deserialize from JSON
                // without this, we won't have the functions of Course, only the data that is in the JSON (no proper cast in JS)
                var course = toInstance(new App.Course(), JSON.stringify(item));
                course.completed = _completed.indexOf(parseInt(course.id.toString())) > -1;
                _courses.push(course);
            });
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        }).done(function (json) {
            // yes, this is raping the Angular philosophy, we access the controller via the DOM
            // for some reason unbeknownst to me, you cannot initialize the controllers from this callback
            // so we initialize them above at the entry point and query them here once the json load is done and pass the serialized json to them
            var cscope = angular.element(document.getElementById("coursectrl")).scope();
            var mscope = angular.element(document.getElementById("matrixctrl")).scope();
            var sscope = angular.element(document.getElementById("speclistctrl")).scope();
            cscope.ctrl.courses = _courses;
            mscope.ctrl.courses = _courses;
            sscope.ctrl.courses = _courses;
        });
    }
    /**
     * Loads specialization json, deserializes json data and feeds the course objects into the 2 controllers
     * @function
     */
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
        }).done(function (json) {
            // yes, this is raping the Angular philosophy, we access the controller via the DOM
            // for some reason unbeknownst to me, you cannot initialize the controllers from this callback
            // so we initialize them above at the entry point and query them here once the json load is done and pass the serialized json to them
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