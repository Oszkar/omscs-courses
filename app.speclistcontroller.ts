//import {NgTableParams} from 'libs/ng-table/ng-table';

module App {
    export class SpecListController extends App.CourseMatrixController {
        private _ngParam: any;

        constructor($scope: ng.IScope, NgTableParams, courses?: Course[]) {
            super($scope, NgTableParams, null, courses);
            this._ngParam = NgTableParams;
        }

        /** @property {Specialization[]} specializations The specialization data as an array */
        get specializations(): Specialization[] {
            return this._specializations;
        }
        set specializations(s: Specialization[]) {
            this._specializations = s;
            this.tableParams = new this._ngParam(
                {
                    count: 80 // initial page size
                },
                {
                    counts: [],
                    dataset: this._specializations
                });
        }
    }
}