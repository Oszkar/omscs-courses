// angular init/start

module App {
    // global data as multiple controllers will use them
    var _courses: Course[] = [];
    var _completed: number[] = [];
    var _specializations: Specialization[] = [];

    // start up an angular module and the controllers
    var app = angular.module('omscs-course-app', ['ngTable']);
    app.controller('courselistcontroller', ($scope, NgTableParams) => new App.CourseListController($scope, NgTableParams));
    app.controller('coursematrixcontroller', ($scope, NgTableParams) => new App.CourseMatrixController($scope, NgTableParams));
    app.controller('speclistcontroller', ($scope, NgTableParams) => new App.SpecListController($scope, NgTableParams));

    loadCourses();
    loadSpecializations();

    /**
     * Loads course json, deserializes json data and feeds the course objects into the 3 controllers
     * @function
     */
    function loadCourses() {
        $.getJSON("coursedata.json", (data) => {
            data.forEach((item) => {
                // use the serializationhelper to properly deserialize from JSON
                // without this, we won't have the functions of Course, only the data that is in the JSON (no proper cast in JS)
                var course = toInstance(new Course(), JSON.stringify(item));
                course.completed = _completed.indexOf(parseInt(course.id.toString())) > -1;
                _courses.push(course);
            });
        }).fail((jqxhr, textStatus, error) => {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        }).done((json) => {
            // yes, this is raping the Angular philosophy, we access the controller via the DOM
            // for some reason unbeknownst to me, you cannot initialize the controllers from this callback
            // so we initialize them above at the entry point and query them here once the json load is done and pass the serialized json to them
            var cscope: any = angular.element(document.getElementById("coursectrl")).scope();
            var mscope: any = angular.element(document.getElementById("matrixctrl")).scope();
            var sscope: any = angular.element(document.getElementById("speclistctrl")).scope();            
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
        $.getJSON("specdata.json", (data) => {
            data.forEach((item) => {
                // use the serializationhelper to properly deserialize from JSON
                // without this, we won't have the functions of Specialization, only the data that is in the JSON (no proper cast in JS)
                var s = toInstance(new Specialization(), JSON.stringify(item));
                s.core = toInstance(new masterGroup(), JSON.stringify(s.core));
                s.electives = toInstance(new masterGroup(), JSON.stringify(s.electives));
                _specializations.push(s);
            });
        }).fail((jqxhr, textStatus, error) => {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        }).done((json) => {
            // yes, this is raping the Angular philosophy, we access the controller via the DOM
            // for some reason unbeknownst to me, you cannot initialize the controllers from this callback
            // so we initialize them above at the entry point and query them here once the json load is done and pass the serialized json to them
            var mscope: any = angular.element(document.getElementById("matrixctrl")).scope();
            var sscope: any = angular.element(document.getElementById("speclistctrl")).scope();
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
    function toInstance<T>(obj: T, json: string): T {
        var jsonObj = JSON.parse(json);
        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
    }
}
