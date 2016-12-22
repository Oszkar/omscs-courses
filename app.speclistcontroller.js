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
        function SpecListController($scope, NgTableParams, courses) {
            _super.call(this, $scope, NgTableParams, null, courses);
            this._ngParam = NgTableParams;
        }
        Object.defineProperty(SpecListController.prototype, "specializations", {
            /** @property {Specialization[]} specializations The specialization data as an array */
            get: function () {
                return this._specializations;
            },
            set: function (s) {
                this._specializations = s;
                this.tableParams = new this._ngParam({
                    count: 80 // initial page size
                }, {
                    counts: [],
                    dataset: this._specializations
                });
            },
            enumerable: true,
            configurable: true
        });
        return SpecListController;
    })(App.CourseMatrixController);
    App.SpecListController = SpecListController;
})(App || (App = {}));
//# sourceMappingURL=app.speclistcontroller.js.map