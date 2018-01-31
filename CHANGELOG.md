# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

[Unreleased]: https://github.com/atomist/automation-seed-ts/compare/0.5.0...HEAD

## [0.5.0][] - 2018-01-17

[0.5.0]: https://github.com/atomist/automation-seed-ts/compare/0.4.0...0.5.0

Autostart Release

### Changed

-   Travis CI build script sets local git config
-   Change autostart package script to avoid zombie processes
-   Travis CI build script does not npm publish by default, set
    NPM_PUBLISH environment variable to enable it

### Added

-   Travis CI build script can link Docker images to commits in
    Atomist
-   Travis CI build script can publish to S3 buckets

## [0.4.0][] - 2018-01-17

[0.4.0]: https://github.com/atomist/automation-seed-ts/compare/0.3.0...0.4.0

Build Release

### Changed

-   Improve Docker handling in Travis CI build script
-   Update package scripts to use `atomist gql-gen` to generate
    TypeScript from GraphQL

## [0.3.0][] - 2018-01-08

[0.3.0]: https://github.com/atomist/automation-seed-ts/compare/0.2.0...0.3.0

Portable Release

### Changed

-   Add no-install and no-compile options to `atomist start`
-   Use handler discovery rather than listing in atomist.config.ts
-   Updated TypeDoc generation
-   Make package scripts more standardized and portable

## [0.2.0][] - 2017-11-22

[0.2.0]: https://github.com/atomist/automation-seed-ts/compare/0.1.0...0.2.0

Update Release

### Changed

-   Updated to @atomist/automation-client@0.2.0
-   Improve package scripts
-   Update test script to avoid mocha deprecated --compilers option
-   Cleaned up tests to use `.then(done, done)`
-   Updated to @atomist/automation-client 0.3.4

## [0.1.0][] - 2017-10-12

Initial Release

[0.1.0]: https://github.com/atomist/automation-seed-ts/tree/0.1.0

### Added

-   HelloWorld command handler
-   NotifyOnPush event handler
