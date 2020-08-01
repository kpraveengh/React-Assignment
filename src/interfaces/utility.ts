

// Refs To get more utils

// 1 - https://github.com/deadmann/JsUtility/blob/master/js/TypedExtensions.js
// 2 - https://github.com/deadmann/JsUtility/blob/master/js/TypedUtility.js

export interface IUtility {
    // String Utilities

    String: IString;
    Number: INumber;
    Object: IObject;
    Date: IDate;
    Window: IWindow;

}

interface IString {
    IsNullOrEmpty: (str: string) => boolean;
    IsNullOrWhiteSpace: (str: string) => boolean;
    Format: (format: string, ...args) => string;
    ReplaceAll: (value: string, oldChar: string, newChar: string) => string;
    Trim: (value: string, char: string) => string;
    TrimStart: (value: string, char: string) => string;
    TrimEnd: (value: string, char: string) => string;

    /// Below things are to be implemented
    Pad?: (value: string, char: string) => string;
    PadLeft?: (value: string, char: string) => string;
    PadRight?: (value: string, char: string) => string;

}
export interface IProgressBarData {
    class: string,
    icon: string,
    label: string
}
interface INumber {
    // Number Utilities
    IsNumeric: (n: string) => boolean;
    IsInteger: (value: string) => boolean;
}

interface IObject {
    // Object utilites
    IsEmpty?: (value: any) => boolean;
}

interface IDate {

}

interface IWindow {
    GetViewPort?: () => { width: number, height: number };
}
export default IUtility;
