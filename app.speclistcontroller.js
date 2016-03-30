var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var SpecListController = (function (_super) {
        __extends(SpecListController, _super);
        function SpecListController($scope, NgTableParams) {
            _super.call(this, $scope, NgTableParams);
            this.tableParams = new NgTableParams({
                count: 70 // initial page size
            }, {
                counts: [],
                dataset: this._specializations
            });
        }
        return SpecListController;
    })(App.CourseMatrixController);
    App.SpecListController = SpecListController;
})(App || (App = {}));
//# sourceMappingURL=app.speclistcontroller.js.map