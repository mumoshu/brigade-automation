import { ingester, IngesterBuilder, type } from "@atomist/automation-client/ingesters";

export const DeploymentEvent: IngesterBuilder = ingester("DeploymentEvent")
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
      .withStringField("environment", "environment of the deployment")
      .withObjectField("payload", "Payload", "payload of the deployment", ["foo"])
      .withObjectField("creator", "Principal", "creater of the deployment", ["login", "type"]))
  .withType(type("DeploymentEvent")
      .withObjectField("deployment", "Deployment", "deployment of the deployment event")
      .withObjectField("repository", "Repository", "repository of the deployment event",
          ["name", "full_name", "owner"])
      .withObjectField("sender", "Principal", "sender of the deployment event", ["login", "type"]));

// This doesn't work either:
//
// export const DeploymentEvent: IngesterBuilder = ingester("DeploymentEventAlpha1")
//   .withType(type("DeploymentEventAlpha1")
//     .withStringField("foo"));
