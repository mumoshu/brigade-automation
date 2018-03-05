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

// @see https://github.com/atomist/automation-client-ts/blob/master/test/event/HelloWorld.ts for example

@EventHandler("forward to brigade when there is a deployment",
    /*GraphQL.subscriptionFromFile("../graphql/deployment", __dirname)*/`
subscription DeploymentIngester {
    DeploymentEvent {
        Deployment {
            id
            sha
            ref
            task
            payload {
                foo
            }
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

        const events: any[] = e.data.DeploymentEvent;
        return Promise.all(events.map(e2 => {
            const p = e2.Deployment;
            if (p.sha) {
                return ctx.messageClient.addressChannels(`Got a deployment with sha \`${p.sha}\``,
                    ["#atomist-playground"]);
            } else {
                return Success;
            }
        }))
            .then(success, failure);
    }
}
