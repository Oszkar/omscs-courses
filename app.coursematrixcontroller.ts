module App {
    /**
     * AngularJS contorller for the simple course list view. Holds the list of courses and can 
     * update the table via some computed parameters e.g. whether a class should be shown in the table based on the current settings.
     * @class
     */
    export class CourseMatrixController extends App.CourseListController {
        private _specializations: Specialization[] = [];
        constructor($scope: ng.IScope, NgTableParams) {
            super($scope, NgTableParams);

            // super loads course data, load spec data here
            var that = this;
            // TODO move json loading outside from here if I can figure out how
            $.getJSON("specdata.json", (data) => {
                data.forEach((item) => {
                    // use the serializationhelper to properly deserialize from JSON
                    // without this, we won't have the functions of Course, only the data that is in the JSON (no proper cast in JS)
                    that._specializations.push(CourseMatrixController.toInstance(new Specialization(), JSON.stringify(item)));
                });
                that.currentSelection = Semester.Spring2016;
                that.tableParams = new NgTableParams(
                    {
                        count: 70 // initial page size
                    },
                    {
                        counts: [],
                        dataset: that._courses
                    });

                // call apply as we updated the model from jquery which is not the prettiest solution around
                $scope.$apply();
            }).fail((jqxhr, textStatus, error) => {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
        }
    }
}