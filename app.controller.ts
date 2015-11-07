module App {
    export class CourseController {
        private _courses: Course[];

        tableParams: any;
        currentSelection: Semester;
        semesterOptions = [{ id: Semester.Future, text: "All courses" },
            { id: Semester.Fall2016, text: "Current + Spring2016 + Fall2016" },
            { id: Semester.Spring2016, text: "Current + Spring2016" },
            { id: Semester.Fall2015, text: "Current only" }]

        constructor($scope: ng.IScope, NgTableParams) {
            var that = this;
            $.getJSON("coursedata.json", (data) => {
                that._courses = <Course[]>data;
                this.currentSelection = Semester.Future;
                this.tableParams = new NgTableParams({
                    count: 50 // initial page size
                }, { counts: [], dataset: this._courses });
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
                // can happen if it's still string, won't deserialize to enum from JSON for some reason
                // convert back to enum/number and compare
                // (toString needed for typescript because it thinks it is an enum but it isn't)
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
    }
}