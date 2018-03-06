/*
 * Copyright © 2017 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    EventFired,
    EventHandler,
    failure,
    GraphQL,
    HandleEvent,
    HandlerContext,
    HandlerResult,
    logger,
    Success,
    success,
    Tags,
} from "@atomist/automation-client";

import * as graphql from "../typings/types";

import { execufy } from "../util/execufy";

// @see https://github.com/atomist/automation-client-ts/blob/master/test/event/HelloWorld.ts for example

@EventHandler("forward to brigade when there is a deployment",
    /*GraphQL.subscriptionFromFile("../graphql/deployment", __dirname)*/`
subscription DeploymentIngester {
    DeploymentEventV1 {
        deployment {
            id
            sha
            ref
            task
            environment
            creator {
                login
                type
            }
        }
        repository {
            name
            full_name
            owner {
                login
                type
            }
        }
        sender {
            login
            type
        }
    }
}
`)
@Tags("deployment", "brigade")
export class ForwardToBrigadeOnDeploymentIngester implements HandleEvent<any> {

    public handle(e: EventFired<any>, ctx: HandlerContext): Promise<HandlerResult> {
        logger.debug(`incoming event is ${JSON.stringify(e.data)}`);

        const events: graphql.DeploymentIngester.DeploymentEventV1[] = e.data.DeploymentEventV1;
        const notification: graphql.DeploymentIngester.DeploymentEventV1 = events[0];
        const deployment: graphql.DeploymentIngester.Deployment = notification.deployment;
        const msg = `Got a deployment to env \`${deployment.environment}\` with sha \`${deployment.sha}\``;
        const notifySlack = ctx.messageClient.addressChannels(msg, ["#atomist-playground"]);

        return notifySlack
            .then(brigRun.bind(null, "deis/empty-testbed", "push"))
            .then(m => {
                return ctx.messageClient.addressChannels(m, ["#atomist-playground"]);
            })
            .then(success, failure);
    }
}

function brigRun(project: string, event: string): Promise<string> {
    return Promise.all(
        [execufy(`brig run ${project} -e ${event}`, "failed.")]).then(values => {
        const [result] = values;
        return Promise.resolve(
            `brig run: ${result}`);
    });
}
