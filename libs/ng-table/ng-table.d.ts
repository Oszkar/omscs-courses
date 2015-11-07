declare module "ngTable" {
    var _: string;
    export = _;
}

declare var NgTableParams: any; 

declare module angular.ngtable {

    interface ITableParams {
        new (baseParameters: IParams, baseSettings: ISettings): ITableParams;
        data: any;
        parameters(newParameters?: string, parseParamsFromUrl?: string): IParams;
        settings(newSettings?: string): ISettings;
        page(page: number): IParams;
        page(): number;
        total(total: number): ISettings;
        total(): number;
        count(count: number): IParams;
        count(): number;
        filter(filter: { [key: string]: string }): IParams;
        filter(): any;
        sorting(sorting?: string | Array<string>): IParams;
        isSortBy(field: string, direction: string): boolean;
        orderBy(): Array<string>;
        getData(params: ITableParams): ng.IPromise<any>;
        getGroups(column: number | Function): ng.IPromise<any>
        generatePagesArray(currentPage: boolean, totalItems: boolean, pageSize: boolean): Array<IPage>;
        url(asString?: boolean): Array<string> | any;
        reload(): ng.IPromise<any>;
        reloadPages(): void;
    }

    interface IPage {
        type: string;
        number: number;
        active: boolean;
        current: boolean;
    }

    interface IParams {
        page?: number;
        count?: number;
        filter?: { [key: string]: string };
        sorting?: { [key: string]: string };
        group?: { [key: string]: string };
        groupBy?: { [key: string]: string };
    }

    interface ISettings {
        $scope?: ng.IScope;
        $loading?: boolean;
        data?: any;
        total?: number;
        defaultSort?: string;
        filterDelay?: number;
        counts?: Array<number>;
        sortingIndicator?: string;
        getGroups?(column: number | Function): ng.IPromise<any>;
        getData?(params: ITableParams): ng.IPromise<any>;
        debugMode?: boolean;
    }

    interface IFilterConfigProvider {
        setConfig?(customConfig: IFilterConfig): void;
        resetConfig?(): void;
    }

    interface IFilterConfig {
        defaultBaseUrl?: string;
        defaultExt?: string;
        aliasUrls?: { [key: string]: string }
    }

    interface IDefaults {
        params: IParams;
        settings: ISettings;
    }
}