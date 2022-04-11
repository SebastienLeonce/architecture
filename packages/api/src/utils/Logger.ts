import { Logger } from "tslog";

export const Log : Logger = new Logger({
    displayInstanceName: false,
    displayFilePath: "hidden",
    displayFunctionName: false
});

/** Class singleton Logger who permits to log everywhere in a ts file */
// export class Logger {
//     private static instance : Logger;
//     private constructor() {}
//     public static getInstance() : Logger {
//         if (!Logger.instance) {
//             Logger.instance = new Logger();
//         }
//         return Logger.instance;
//     }

//     // Methods to log in console output 
//     public log(...args : any[]) : void {
//         console.log(...args);
//     }
// }