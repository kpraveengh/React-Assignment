
import * as moment from 'moment';
import { Dispatch } from 'redux';
import { IUtility } from './../interfaces/utility';
import _ from './lodash';
declare const InstallTrigger;
class Utility implements IUtility {
    moment = moment;
    Object = {
        IsEmpty(obj): boolean {
            return _.isEmpty(obj);
        }
    };
    Date = {
        Format: 'DD/MM/YYYY',
        ZeroTime: 'T00:00:00.000Z'

    };

    Window = {
        GetViewPort(): { width: number, height: number } {
            return {
                width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
            };
        }
    };
    String = {
        IsNullOrEmpty(value: string): boolean {
            return (!value || value.length === 0);
        },

        IsValidEmail(value: string): boolean {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);
        },

        IsNullOrWhiteSpace(value: string): boolean {
            if (value == null) { return true; }

            for (let i = 0; i < value.length; i++) {
                if (value[i] !== ' ') { return false; }
            }

            return true;
        },
        Format: (format: string, ...args): string => {
            if (this.String.IsNullOrEmpty(format)) {
                throw 'Format is null or empty.';
            }
            return format.replace(/{(\d+)}/g, function (match, num) {
                return typeof args[num] !== 'undefined'
                    ? args[num]
                    : match;
            });
        },

        ReplaceAll: (value: string, oldChar: string, newChar: string): string => {
            if (oldChar.length !== 1) {
                throw 'Old char must be of length 1';
            }

            if (newChar.length !== 1) {
                throw 'New char must be of length 1';
            }
            return value.replace(new RegExp(oldChar, 'g'), newChar);
        },
        Trim: (value: string, char: string): string => {
            if (!char) {
                return value.trim();
            } else {
                if (value[0] === char) {
                    value = value.slice(1, value.length);
                }

                let end = value.length - 1;
                if (value[end] === char) {
                    value = value.slice(0, end);
                }
                return value;
            }
        },
        TrimStart: (value: string, char: string): string => {
            if (!char) {
                return value.trim();
            } else {
                if (value[0] === char) {
                    value = value.slice(1, value.length);
                }
                return value;
            }
        },
        TrimEnd: (value: string, char: string): string => {
            if (!char) {
                return value.trim();
            } else {

                let end = value.length - 1;
                if (value[end] === char) {
                    value = value.slice(0, end);
                }
                return value;
            }
        }
    };

    Number = {
        IsNumeric: (n: string): boolean => {
            return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
        },
        IsInteger: (value: string | number) => {
            return typeof value === 'number' &&
                isFinite(value) &&
                Math.floor(value) === value;
        }
    };

    mapDispatchToProps(dispatch: Dispatch<any>): any {
        return {
            Dispatch: dispatch
        };
    }

    getPlatformString = () => {

        if (navigator.userAgent.match(/Android/i)) {
            return 'android';
        }

        if ((navigator.userAgent.match(/BlackBerry/i)) || (navigator.userAgent.match(/RIM Tablet OS/i)) || (navigator.userAgent.match(/BB10/i))) {
            return 'blackberry';
        }

        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            return 'ios';
        }

        if (navigator.userAgent.match(/Windows Phone|IEMobile|WPDesktop/i)) {
            return 'wp';
        }

        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        let isOpera = !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0;
        if (isOpera) {
            return 'opera';
        }

        let isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
        if (isFirefox) {
            return 'firefox';
        }

        let isSafari = Object.prototype.toString.call(window['HTMLElement']).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
        if (isSafari) {
            return 'safari';
        }

        let isEdge = navigator.userAgent.indexOf(' Edge/') >= 0;
        if (isEdge) {
            return 'edge';
        }

        let isChrome = !!window['chrome'] && !isOpera && !isEdge; // Chrome 1+
        if (isChrome) {
            return 'chrome';
        }

        let isIE = /*@cc_on!@*/false || !!document['documentMode']; // At least IE6
        if (isIE) {
            return 'ie';
        }

        return 'unknown';
    }
}

export const utility = new Utility();
