import {
  logger,
} from "@atomist/automation-client";

import * as childProcess from "child_process";

export function execufy(cmd: string, errorResult: string): Promise<string> {
    return new Promise((resolve, reject) => {
        childProcess.exec(cmd, (error, stdout: string, stderr: string) => {
            if (error) {
                logger.warn(`stderr from ${cmd}: ${stderr}`);
                resolve(errorResult);
            } else {
                resolve(stdout);
            }
        });
    });
}
