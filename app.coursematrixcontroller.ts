module App {
    /**
     * AngularJS contorller for the simple course list view. Holds the list of courses and can 
     * update the table via some computed parameters e.g. whether a class should be shown in the table based on the current settings.
     * @class
     */
    export class CourseMatrixController extends App.CourseListController {
        private _specializations: Course[] = [];
        constructor($scope: ng.IScope, NgTableParams) {
            super($scope, NgTableParams);


        }
    }
}