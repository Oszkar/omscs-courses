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
        }
        return CourseMatrixController;
    })(App.CourseListController);
    App.CourseMatrixController = CourseMatrixController;
})(App || (App = {}));
//# sourceMappingURL=app.coursematrixcontroller.js.map