var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    /**
     * AngularJS contorller for the simple course list view. Holds the list of courses and can
     * update the table via some computed parameters e.g. whether a class should be shown in the table based on the current settings.
     * @class
     */
    var CourseMatrixController = (function (_super) {
        __extends(CourseMatrixController, _super);
        function CourseMatrixController($scope, NgTableParams) {
            _super.call(this, $scope, NgTableParams);
            this._specializations = [];
            // super loads course data, load spec data here
            var that = this;
            // TODO move json loading outside from here if I can figure out how
            $.getJSON("specdata.json", function (data) {
                data.forEach(function (item) {
                    // use the serializationhelper to properly deserialize from JSON
                    // without this, we won't have the functions of Course, only the data that is in the JSON (no proper cast in JS)
                    that._specializations.push(CourseMatrixController.toInstance(new App.Specialization(), JSON.stringify(item)));
                });
                that.currentSelection = App.Semester.Spring2016;
                that.tableParams = new NgTableParams({
                    count: 70 // initial page size
                }, {
                    counts: [],
                    dataset: that._courses
                });
                // call apply as we updated the model from jquery which is not the prettiest solution around
                $scope.$apply();
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
        }
        return CourseMatrixController;
    })(App.CourseListController);
    App.CourseMatrixController = CourseMatrixController;
})(App || (App = {}));
//# sourceMappingURL=app.coursematrixcontroller.js.map