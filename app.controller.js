var App;
(function (App) {
    var CourseController = (function () {
        function CourseController($scope, NgTableParams) {
            var _this = this;
            this.selections = ["a", "b"];
            var that = this;
            $.getJSON("coursedata.json", function (data) {
                that._courses = data;
                _this.tableParams = new NgTableParams({}, { counts: [], dataset: _this._courses });
                // call apply as we updated the model from jquery which is not the prettiest solution around
                $scope.$apply();
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
            this.currentselection = App.Semester.Future;
        }
        Object.defineProperty(CourseController.prototype, "Courses", {
            get: function () {
                return this._courses;
            },
            enumerable: true,
            configurable: true
        });
        CourseController.prototype.getById = function (id) {
            var found;
            this._courses.forEach(function (item) {
                if (item.id == id) {
                    found = item;
                }
            });
            return found;
        };
        CourseController.prototype.canShow = function (id) {
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
                return App.Semester[avail.toString()] <= this.currentselection;
            }
            else if (typeof avail == "number") {
                // happy path
                return avail <= this.currentselection;
            }
            else {
                console.log("Cannot read availability property of id# " + id + ", it won't show up in the table");
                return false;
            }
        };
        return CourseController;
    })();
    App.CourseController = CourseController;
})(App || (App = {}));
//# sourceMappingURL=app.controller.js.map