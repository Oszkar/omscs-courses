//import {NgTableParams} from 'libs/ng-table/ng-table';
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
            _super.call(this, $scope, NgTableParams, this.done.bind(this));
            this._ngParam = NgTableParams;
        }
        SpecListController.prototype.done = function () {
            this.tableParams = new this._ngParam({
                count: 80 // initial page size
            }, {
                counts: [],
                dataset: this._specializations
            });
            this._$scope.$apply();
        };
        return SpecListController;
    })(App.CourseMatrixController);
    App.SpecListController = SpecListController;
})(App || (App = {}));
//# sourceMappingURL=app.speclistcontroller.js.map