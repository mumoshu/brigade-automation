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

import { Configuration } from "@atomist/automation-client";
import { ingester, type } from "@atomist/automation-client/ingesters";
import * as config from "config";
// ingester and type are not exported directly from automation-client package
// as seen in:
// - https://github.com/atomist/automation-client-ts/blob/master/src/index.ts
// - https://github.com/atomist/automation-client-ts/blob/master/src/ingesters.ts
import { DeploymentEvent } from "./events/deploymentIngester";

import * as appRoot from "app-root-path";

// tslint:disable-next-line:no-var-requires
const pj = require(`${appRoot}/package.json`);

const token = process.env.GITHUB_TOKEN;
const team = process.env.ATOMIST_TEAM;
const teamIds = (team) ? [team] : [];

export const configuration: Configuration = {
    name: pj.name,
    version: pj.version,
    keywords: pj.keywords,
    policy: config.get("policy"),
    teamIds,
    token,
    ingesters: [
        DeploymentEvent,
        // See ingesters.ts for available types and functions
        // - https://github.com/atomist/automation-client-ts/blob/master/src/ingesters.ts#L139
        // See automation-client-ts sources for examples of custom ingester
        // - https://github.com/atomist/automation-client-ts/blob/master/test/atomist.config.ts#L36
        /*ingester("Deployment")
            .withType(type("Principal")
                .withStringField("login", "login of the principal")
                .withStringField("type", "type of the principal e.g. User"))
            .withType(type("Repository")
                .withStringField("name", "name of the repository")
                .withStringField("full_name", "full_name of the repository")
                .withObjectField("owner", "Principal", "owner of the repository", ["login", "type"]))
            .withType(type("Payload")
                .withStringField("foo", "foo of the payload"))
            .withType(type("Deployment")
                .withIntField("id", "id of the deployment")
                .withStringField("sha", "sha of the deployment")
                .withStringField("ref", "ref of the deployment")
                .withStringField("task", "task of the deployment")
                .withObjectField("payload", "Payload", "payload of the deployment", ["foo"])
                .withObjectField("creator", "Principal", "creater of the deployment", ["login", "type"])
                .withObjectField("repository", "Repository", "repository of the deployment",
                    ["name", "full_name", "owner"])
                .withObjectField("sender", "Principal", "sender of the deployment", ["login", "type"])),*/
    ],
    http: {
        enabled: true,
        auth: {
            basic: {
                enabled: false,
            },
            bearer: {
                enabled: false,
            },
        },
    },
};
