#!/usr/bin/env bash

set -e

GRAPHQL_ENDPOINT="https://automation.atomist.com/graphql/team/${ATOMIST_TEAM}"

apollo-codegen introspect-schema $GRAPHQL_ENDPOINT --output schema.json --header "Authorization: token $GITHUB_TOKEN"
