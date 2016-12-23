module App {
    export class Serialization {
        public _courses: Course[] = [];
        public _specializations: Specialization[] = [];

        /**
         * Loads course json, deserializes json data and feeds the course objects into the 3 controllers
         * @function
         */
        public loadCourses(doneCallback?: Function) {
            $.getJSON("coursedata.json", (data) => {
                data.forEach((item) => {
                    // use the serializationhelper to properly deserialize from JSON
                    // without this, we won't have the functions of Course, only the data that is in the JSON (no proper cast in JS)
                    this._courses.push(Serialization.toInstance(new Course(), JSON.stringify(item)));
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
                cscope.ctrl.courses = this._courses;
                mscope.ctrl.courses = this._courses;
                sscope.ctrl.courses = this._courses;
                this.updateCompletedList();
            });
        }

        /**
         * Loads specialization json, deserializes json data and feeds the course objects into the 2 controllers
         * @function
         */
        public loadSpecializations(doneCallback?: Function) {
            $.getJSON("specdata.json", (data) => {
                data.forEach((item) => {
                    // use the serializationhelper to properly deserialize from JSON
                    // without this, we won't have the functions of Specialization, only the data that is in the JSON (no proper cast in JS)
                    var s = Serialization.toInstance(new Specialization(), JSON.stringify(item));
                    s.core = Serialization.toInstance(new masterGroup(), JSON.stringify(s.core));
                    s.electives = Serialization.toInstance(new masterGroup(), JSON.stringify(s.electives));
                    this._specializations.push(s);
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
                mscope.ctrl.specializations = this._specializations;
                sscope.ctrl.specializations = this._specializations;
                this.updateCompletedList();
            });
        }

        /**
         * Updates the completed property of the individual object. Call this to update the internal JS objects if something changes in the frontend or in the cookie
         * @function
         */
        public updateCompletedList(completed?: number[]) {
            if (!completed) var completed = App.Cookies.parseCompletedCookies();
        
            // update course completed properties
            completed.forEach((item) => {
                this._courses.forEach((c) => {
                    if (c.id == item) {
                        c.completed = true;
                    }
                });
            });

            // update specialization completed properties
            this._specializations.forEach((item: Specialization) => {
                item.core.groups.forEach((cg: courseGroup) => {
                    // get the common set (i.e. the IDs that are both completed and required for this course group
                    var common = completed.filter(function (n) {
                        return cg.courseList.indexOf(n) != -1;
                    });
                    cg.completed = common.length >= cg.minCourses;
                });
                item.electives.groups.forEach((cg: courseGroup) => {
                    // get the common set (i.e. the IDs that are both completed and required for this course group
                    var common = completed.filter(function (n) {
                        return cg.courseList.indexOf(n) != -1;
                    });
                    cg.completed = common.length >= cg.minCourses;
                });
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
        private static toInstance<T>(obj: T, json: string): T {
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
}