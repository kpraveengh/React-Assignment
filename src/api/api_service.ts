import axios, { AxiosRequestConfig } from 'axios';
// import { logger } from '../utils/logger';

import { app_actions } from '../actions/app_actions';
import { store } from '../store/index';
import { app_config } from './../config/app_config';
import _ from './../utils/lodash';
import * as api_urls from './api_urls';
// import {history} from './../core/browserHistory'
import { createBrowserHistory } from 'history';
import { INavigationConfig, NavigationConfig } from '../utils/navigation_config';


class Server {
    api_urls = api_urls;
    axiosOptions: AxiosRequestConfig = {
        timeout: 1800000,
        transformRequest: [this.transformRequest],
        withCredentials: true
    };
    ContentHeaders = {
        Json: 'application/json',
        FormData: 'multipart/form-data',
        Plain: 'text/plain'
    };

    BaseDomain = {
        Api: app_config.apiDomain

    };
    router = createBrowserHistory();
    navConfig: INavigationConfig = NavigationConfig;

    constructor() {
        axios.interceptors.response.use((response) => {

            store.dispatch(app_actions.hideLoader());
            if (response.data && response.data.status > 300) {
                // utility.alert({ message: response.data.message });
            }

            return response;
        }, (error) => {

            // if (error.response) {
            //     // The request was made and the server responded with a status code
            //     // that falls out of the range of 2xx

            // } else if (error.request) {
            //     // The request was made but no response was received
            //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //     // http.ClientRequest in node.js
            // } else {
            //     // Something happened in setting up the request that triggered an Error
            // }
            if (error.response) {
                if (error.response.status === 403 || error.response.status === 401) {
                    store.dispatch(app_actions.resetStore());
                    this.router.push(this.navConfig.Store);
                    location.reload()
                }
            }

            if (error.message === 'timeout of 10000ms exceeded') {
                error.message = 'Request has been timed out. Please try again';
            }
            if (error.message === 'Network Error') {

                if (navigator.onLine) {
                    error.message = 'We are unable to reach the server. Please try later.';
                } else {
                    error.message = 'Please check your internet connection.';

                }
            }

            store.dispatch(app_actions.hideLoader());

            return new Promise((resolve, reject) => {
                if (error.response) {
                    // logger.error(error.response);

                    reject(error.response.data);
                } else {
                    // logger.error(error);
                    reject(error);
                }
            });
        });
    }

    transformRequest(data: any) {
        if (data.headerType === api_service.ContentHeaders.Json) {
            try {
                data = JSON.parse(data);
                let temp = _.clone(data);
                _.map(data, (value, key) => {
                    if (key && key.indexOf('__') > -1) {
                        delete temp[key];
                    }
                });
                return JSON.stringify(temp);
            } catch (e) {
                return data;
            }
        } else {
            return data;
        }
    }

    getHeadersByType(headerType, domain: string, customHeaders?: any, omitToken: boolean = false): any {
        let data = {};
        switch (headerType) {
            case api_service.ContentHeaders.Json: {
                data['Content-Type'] = 'application/json';
                break;
            }
            case api_service.ContentHeaders.Plain: {
                data['Content-Type'] = 'text/plain';
                break;
            }
            case api_service.ContentHeaders.FormData: {
                data['Content-Type'] = 'multipart/form-data';
                break;
            }
            default:
                data['Content-Type'] = 'application/json';
                break;
        }

         data['api-key'] = ''

        data = _.extend({}, data, customHeaders);
        return data;
    }

    post = (data: {
        endPoint: string;
        payLoad?: any;
        domain?: string;
        headerType?: string;
        customHeaders?: any;
        showLoader?: boolean;
        onUploadProgress?: any

    }) => {

        if (!data.domain) {
            data.domain = api_service.BaseDomain.Api;
        }
        if (!data.headerType) {
            data.headerType = api_service.ContentHeaders.Json;
        }

        if (data.showLoader !== false) {
            data.showLoader = true;
        }
        if (data.showLoader) {
            store.dispatch(app_actions.showLoader());
        }

        if (data.headerType === api_service.ContentHeaders.Json) {
            data.payLoad = JSON.stringify(data.payLoad);
        }
        if (!navigator.onLine) {

        }
        return axios.post(data.endPoint,
            data.payLoad, {
            timeout: this.axiosOptions.timeout,
            transformRequest: this.axiosOptions.transformRequest,
            baseURL: data.domain,
            headers: this.getHeadersByType(data.headerType, data.domain, data.customHeaders),
            onUploadProgress: data.onUploadProgress
        },
        );
    }

    isNetworkError = (error) => {
        return !error.response && error.code !== 'ECONNABORTED';
    }

    retry = (config: AxiosRequestConfig) => {
        return axios(config);
    }
    put = (data: {
        endPoint: string;
        payLoad?: any;
        domain?: string;
        id?: string;
        headerType?: string;
        customHeaders?: any;
        showLoader?: boolean;
    }) => {
        if (!data.domain) {
            data.domain = api_service.BaseDomain.Api;
        }
        if (!data.headerType) {
            data.headerType = api_service.ContentHeaders.Json;
        }
        if (data.headerType === api_service.ContentHeaders.Json) {
            data.payLoad = JSON.stringify(data.payLoad);
        }
        if (data.showLoader !== false) {
            data.showLoader = true;
        }
        if (data.showLoader) {
            store.dispatch(app_actions.showLoader());
        }

        return axios.put(data.endPoint,
            data.payLoad, {
            timeout: this.axiosOptions.timeout,
            transformRequest: this.axiosOptions.transformRequest,
            baseURL: data.domain,
            headers: this.getHeadersByType(data.headerType, data.domain, data.customHeaders)
        });
    }

    delete = (data: {
        endPoint: string;
        payLoad?: any;
        domain?: string;
        id?: string;
        headerType?: string;
        customHeaders?: any;
        showLoader?: boolean
    }) => {
        if (!data.domain) {
            data.domain = api_service.BaseDomain.Api;
        }
        if (!data.headerType) {
            data.headerType = api_service.ContentHeaders.Json;
        }

        if (data.showLoader !== false) {
            data.showLoader = true;
        }
        if (data.showLoader) {
            store.dispatch(app_actions.showLoader());
        }
        return axios.delete(data.endPoint, {
            baseURL: data.domain,
            headers: this.getHeadersByType(data.headerType, data.domain, data.customHeaders)
        });
    }

    get = (data: {
        endPoint: string;
        payLoad?: any;
        domain?: string;
        id?: string;
        headerType?: string;
        customHeaders?: any;
        showLoader?: boolean;
        withHeaders?: boolean;
    }, omitToken = false) => {
        if (!data.domain) {
            data.domain = api_service.BaseDomain.Api;
        }
        if (!data.headerType) {
            data.headerType = api_service.ContentHeaders.Json;
        }
        if (data.showLoader !== false) {
            data.showLoader = true;
        }
        if (data.showLoader) {
            store.dispatch(app_actions.showLoader());
        }
        return axios.get(data.endPoint, {
            baseURL: data.domain,
            timeout: this.axiosOptions.timeout,
            params: data.payLoad,
            headers: this.getHeadersByType(data.headerType, data.domain, data.customHeaders, omitToken)
        });
    }

}
export const api_service = new Server();
