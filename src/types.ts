import { HttpHeaders, HttpContext, HttpParams } from "@angular/common/http";

export interface Options {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface Stocks {
    items: Stock[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

export interface Stock {
    price: string;
    name: string;
}

export interface Position {
    stock_nam: string,
    average_price: number,
    quantity: number
}