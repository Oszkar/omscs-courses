//import {NgTableParams} from 'libs/ng-table/ng-table';

module App {
    export class SpecListController extends App.CourseMatrixController {
        private _ngParam: any;

        constructor($scope: ng.IScope, NgTableParams) {
            super($scope, NgTableParams, this.done.bind(this));
            this._ngParam = NgTableParams;
        }

        done(): void {
            this.tableParams = new this._ngParam(
                {
                    count: 70 // initial page size
                },
                {
                    counts: [],
                    dataset: this._specializations
                });
            this._$scope.$apply();
        }
    }
}