import { ingester, IngesterBuilder, type } from "@atomist/automation-client/ingesters";

export const DeploymentEventV1: IngesterBuilder = ingester("DeploymentEventV1")
  .withType(type("PrincipalV1")
      .withStringField("login", "login of the principal")
      .withStringField("type", "type of the principal e.g. User"))
  .withType(type("RepositoryV1")
      .withStringField("name", "name of the repository")
      .withStringField("full_name", "full_name of the repository")
      .withObjectField("owner", "PrincipalV1", "owner of the repository", ["login", "type"]))
  .withType(type("PayloadV1")
      .withStringField("cluster", "cluster of the payload")
      .withListScalarField("releases", "String", "releases of the payload")
      .withListScalarField("filters", "String", "filt4ers of the payload"))
  .withType(type("DeploymentV1")
      .withIntField("id", "id of the deployment")
      .withStringField("sha", "sha of the deployment")
      .withStringField("ref", "ref of the deployment")
      .withStringField("task", "task of the deployment")
      .withStringField("environment", "environment of the deployment")
      .withObjectField("payload", "PayloadV1", "payload of the deployment", ["cluster"])
      .withObjectField("creator", "PrincipalV1", "creater of the deployment", ["login", "type"]))
  .withType(type("DeploymentEventV1")
      .withObjectField("deployment", "DeploymentV1", "deployment of the deployment event")
      .withObjectField("repository", "RepositoryV1", "repository of the deployment event",
          ["name", "full_name"/*, "owner"*/])
      .withObjectField("sender", "PrincipalV1", "sender of the deployment event", ["login", "type"]));

// This doesn't work either:
//
// export const DeploymentEvent: IngesterBuilder = ingester("DeploymentEventAlpha1")
//   .withType(type("DeploymentEventAlpha1")
//     .withStringField("foo"));
