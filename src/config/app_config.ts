class AppConfig {
    ENV: string;
    apiDomain: string;
    pageAnimation: string;
    logLevel: string;
    appVersion: string;

    constructor() {
        this.ENV = process.env.NODE_ENV;
        this.apiDomain = process.env.API_DOMAIN;
        this.pageAnimation = 'slide';
        this.logLevel = 'info';
        this.appVersion = process.env.APP_VERSION;
    }
}

export const app_config = new AppConfig();
