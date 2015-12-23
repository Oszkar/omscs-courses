module App {
    export class SpecListController extends App.CourseMatrixController {
        constructor($scope: ng.IScope, NgTableParams) {
            super($scope, NgTableParams);
            this.tableParams = new NgTableParams(
                {
                    count: 70 // initial page size
                },
                {
                    counts: [],
                    dataset: this._specializations
                });
        }
    }
}