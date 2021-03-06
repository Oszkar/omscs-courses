﻿module App {
    /**
     * AngularJS contorller for the simple course list view. Holds the list of courses and can 
     * update the table via some computed parameters e.g. whether a class should be shown in the table based on the current settings.
     * @class
     */
    export class CourseListController {
        protected _courses: Course[] = [];
        protected _specializations: Specialization[] = [];
        protected _$scope: ng.IScope;
        protected _ngTableClass: any;

        /** @property {NgTableParams} tableParams The ng-table settings */
        public tableParams: any;
        /** @property {Semester} currentSelection The currently selected semester (via HTML) as an enum */
        public currentSelection: Semester;

        // these will be the options in the semester selector dropdown that we will be populating with angular from here
        // id will be a number on the JS side
        public semesterOptions = [{ id: Semester.Future, text: "All courses" },
                                  { id: Semester.Spring2017, text: "Current only" },
                                  { id: Semester.Fall2017, text: "Current + Fall2017" }]

        /**
         * @constructor
         * @param {ng.IScope} $scope - AngularJS scope
         * @param {NgTableParams} NgTableParams - ng-table module
         */
        constructor($scope: ng.IScope, NgTableParams, courses?: Course[]) {
            this._$scope = $scope;
            this._ngTableClass = NgTableParams;
            if (courses) {
                this._courses = courses;
            }
        }

        /** @property {Course[]} Courses The course data as an array */
        get courses(): Course[] {
            return this._courses;
        }
        set courses(c: Course[]) {
            this._courses = c;
            this.currentSelection = Semester.Spring2017;
            this.tableParams = new this._ngTableClass(
                {
                    count: 80, // initial page size
                    sorting: { available: "asc" }
                },
                {
                    counts: [],
                    dataset: this._courses
                });
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
                case Semester.Discontinued:
                    return "Discountinued"
                    break;
                default:
                    return "Uknown availability property"
            }
        }
    }
}