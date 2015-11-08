module App {
    export class CourseController {
        private _courses: Course[];

        tableParams: any;
        currentSelection: Semester;

        // these will be the options in the semester selector dropdown that we will be populating with angular from here
        // id will be a number on the JS side
        semesterOptions = [{ id: Semester.Future, text: "All courses" },
            { id: Semester.Fall2016, text: "Current + Spring2016 + Fall2016" },
            { id: Semester.Spring2016, text: "Current + Spring2016" },
            { id: Semester.Fall2015, text: "Current only" }]

        constructor($scope: ng.IScope, NgTableParams) {
            var that = this;
            $.getJSON("coursedata.json", (data) => {
                that._courses = <Course[]>data;
                that.currentSelection = Semester.Spring2016;
                that.tableParams = new NgTableParams({
                    count: 50 // initial page size
                }, { counts: [], dataset: that._courses });
                // call apply as we updated the model from jquery which is not the prettiest solution around
                $scope.$apply();
            }).fail((jqxhr, textStatus, error) => {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
                });
        }

        get Courses() {
            return this._courses;
        }

        public getById(id: number): Course {
            var found: Course;
            this._courses.forEach((item) => {
                if (item.id == id) {
                    found = item;
                }
            });

            return found;
        }

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
                return Semester[avail.toString()] <= this.currentSelection;
            }
            else if (typeof avail == "number") {
                // happy path
                return avail <= this.currentSelection;
            }
            else {
                console.log("Cannot read availability property of id# " + id + ", it won't show up in the table");
                return false;
            }
        }

        // convert the enum into user-friendly text
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
                case Semester.Future:
                    return "Future"
                    break;
                default:
                    return "Uknown availability property"
            }
        }
    }
}