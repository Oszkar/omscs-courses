//import {NgTableParams} from 'libs/ng-table/ng-table';

module App {
    export class SpecListController extends App.CourseMatrixController {
        private _ngParam: any;

        constructor($scope: ng.IScope, NgTableParams, courses?: Course[]) {
            super($scope, NgTableParams, courses);
            this._ngParam = NgTableParams;
        }

        /** 
         * @property {Specialization[]} specializations The specialization data as an array
         * The one thing this controller is different compared to its parent, CourseMatrixController, is that its table contains the specializations
         * The parent lists the courses (just as the courselistcontroller) and colors them based on specializations, this lists the specializations themselves
         * The rest of the difference is on the HTML side
         */
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