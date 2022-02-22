import { Logger } from "tslog";

export const Log : Logger = new Logger({
    displayInstanceName: false,
    displayFilePath: "hidden",
    displayFunctionName: false
});