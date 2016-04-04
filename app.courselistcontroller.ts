﻿module App {
    /**
     * AngularJS contorller for the simple course list view. Holds the list of courses and can 
     * update the table via some computed parameters e.g. whether a class should be shown in the table based on the current settings.
     * @class
     */
    export class CourseListController {
        protected _courses: Course[] = [];
        protected _$scope: ng.IScope

        /** @property {NgTableParams } tableParams The ng-table settings */
        public tableParams: any;
        /** @property {Semester } currentSelection The currently selected semester (via HTML) as an enum */
        public currentSelection: Semester;

        // these will be the options in the semester selector dropdown that we will be populating with angular from here
        // id will be a number on the JS side
        public semesterOptions = [{ id: Semester.Future, text: "All courses" },
            { id: Semester.Spring2016, text: "Current only" },
            { id: Semester.Fall2016, text: "Current + Fall2016" },
            { id: Semester.Spring2017, text: "Current + Fall2016 + Spring2017" }]

        /**
         * @constructor
         * @param {ng.IScope} $scope - AngularJS scope
         * @param {NgTableParams} NgTableParams - ng-table module
         */
        constructor($scope: ng.IScope, NgTableParams) {
            this._$scope = $scope;
            var that = this;
            // TODO move json loading outside from here if I can figure out how
            $.getJSON("coursedata.json", (data) => {
                data.forEach((item) => {
                    // use the serializationhelper to properly deserialize from JSON
                    // without this, we won't have the functions of Course, only the data that is in the JSON (no proper cast in JS)
                    that._courses.push(CourseListController.toInstance(new Course(), JSON.stringify(item)));
                });
                that.currentSelection = Semester.Spring2016;
                that.tableParams = new NgTableParams(
                    {
                        count: 80 // initial page size
                    },
                    {
                        counts: [],
                        dataset: that._courses
                    });

                // call apply as we updated the model from jquery which is not the prettiest solution around
                //$scope.$apply(); // this will be called in matrixcontroller instead
            }).fail((jqxhr, textStatus, error) => {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
        }

        /** @property {Course[]} Courses The course data as an array */
        get courses(): Course[] {
            return this._courses;
        }

        /**
         * @function
         * @param {number} id - Course id (without the subject)
         * @returns {Course} The found course, null if not found
         */
        public getById(id: number): Course {
            var found: Course;
            this._courses.forEach((item) => {
                if (item.id == id) {
                    found = item;
                }
            });

            return found;
        }

        /**
         * @function
         * @param {number} id - Course id (without the subject)
         * @returns {boolean} Whether the queried class should be shown in the table based on the current settings
         */
        public canShow(id: number) {
            var course = this.getById(id);
            if (course == null) {
                console.log("Can't find course id# " + id + ", it won't show up in the table");
                return false;
            }

            var avail = course.available;
            if (typeof avail == "string") {
                // can happen that it's in string format convert back to enum/number and compare
                // (toString needed for typescript because it thinks it is an enum but this case it isn't)
                if (this.currentSelection == Semester.Future) return true;
                return 0 < Semester[avail.toString()] && Semester[avail.toString()] <= this.currentSelection;
            }
            else if (typeof avail == "number") {
                // happy path
                if (this.currentSelection == Semester.Future) return true;
                return 0 < avail && avail <= this.currentSelection;
            }
            else {
                console.log("Cannot read availability property of id# " + id + ", it won't show up in the table");
                return false;
            }
        }

        /**
         * Convert the semester enum into user-friendly text
         * @function
         * @param {number} num - Semester enum, which is esentially a number on the JS side
         * @returns {string} Enum converted to display-friendly text
         */
        public availabilityText(num: Semester): string {
            switch (num)
            {
                case Semester.Before:
                    return "Before Fall 2015";
                    break;
                case Semester.Fall2015:
                    return "Fall 2015";
                    break;
                case Semester.Spring2016:
                    return "Spring 2016"
                    break;
                case Semester.Fall2016:
                    return "Fall 2016"
                    break;
                case Semester.Spring2017:
                    return "Spring 2017"
                    break;
                case Semester.Fall2017:
                    return "Fall 2017"
                    break;
                case Semester.Future:
                    return "Future"
                    break;
                default:
                    return "Uknown availability property"
            }
        }

        /**
         * SerializationHelper
         * helps to properly deserialize JSON data so that the deserialized object will have functions also not only the data in the JSON
         * @function
         * @param {T} obj - The object to deserialize into
         * @param {string} json - The json
         * @returns {T} The object filled with the json data
         */
        static toInstance<T>(obj: T, json: string): T {
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