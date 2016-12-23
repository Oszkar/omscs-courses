var App;
(function (App) {
    var Serialization = (function () {
        function Serialization() {
            this._courses = [];
            this._specializations = [];
        }
        /**
         * Loads course json, deserializes json data and feeds the course objects into the 3 controllers
         * @function
         */
        Serialization.prototype.loadCourses = function (doneCallback) {
            var _this = this;
            $.getJSON("coursedata.json", function (data) {
                data.forEach(function (item) {
                    // use the serializationhelper to properly deserialize from JSON
                    // without this, we won't have the functions of Course, only the data that is in the JSON (no proper cast in JS)
                    _this._courses.push(Serialization.toInstance(new App.Course(), JSON.stringify(item)));
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
                cscope.ctrl.courses = _this._courses;
                mscope.ctrl.courses = _this._courses;
                sscope.ctrl.courses = _this._courses;
                _this.updateCompletedList();
            });
        };
        /**
         * Loads specialization json, deserializes json data and feeds the course objects into the 2 controllers
         * @function
         */
        Serialization.prototype.loadSpecializations = function (doneCallback) {
            var _this = this;
            $.getJSON("specdata.json", function (data) {
                data.forEach(function (item) {
                    // use the serializationhelper to properly deserialize from JSON
                    // without this, we won't have the functions of Specialization, only the data that is in the JSON (no proper cast in JS)
                    var s = Serialization.toInstance(new App.Specialization(), JSON.stringify(item));
                    s.core = Serialization.toInstance(new App.masterGroup(), JSON.stringify(s.core));
                    s.electives = Serialization.toInstance(new App.masterGroup(), JSON.stringify(s.electives));
                    _this._specializations.push(s);
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
                mscope.ctrl.specializations = _this._specializations;
                sscope.ctrl.specializations = _this._specializations;
                _this.updateCompletedList();
            });
        };
        /**
         * Updates the completed property of the individual object. Call this to update the internal JS objects if something changes in the frontend or in the cookie
         * @function
         */
        Serialization.prototype.updateCompletedList = function (completed) {
            var _this = this;
            if (!completed)
                var completed = App.Cookies.parseCompletedCookies();
            // update course completed properties
            completed.forEach(function (item) {
                _this._courses.forEach(function (c) {
                    if (c.id == item) {
                        c.completed = true;
                    }
                });
            });
            // update specialization completed properties
            this._specializations.forEach(function (item) {
                item.core.groups.forEach(function (cg) {
                    // get the common set (i.e. the IDs that are both completed and required for this course group
                    var common = completed.filter(function (n) {
                        return cg.courseList.indexOf(n) != -1;
                    });
                    cg.completed = common.length >= cg.minCourses;
                });
                item.electives.groups.forEach(function (cg) {
                    // get the common set (i.e. the IDs that are both completed and required for this course group
                    var common = completed.filter(function (n) {
                        return cg.courseList.indexOf(n) != -1;
                    });
                    cg.completed = common.length >= cg.minCourses;
                });
            });
        };
        /**
         * SerializationHelper
         * helps to properly deserialize JSON data so that the deserialized object will have functions also not only the data in the JSON
         * @function
         * @param {T} obj - The object to deserialize into
         * @param {string} json - The json
         * @returns {T} The object filled with the json data
         */
        Serialization.toInstance = function (obj, json) {
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
        };
        return Serialization;
    })();
    App.Serialization = Serialization;
})(App || (App = {}));
//# sourceMappingURL=serialization.js.map