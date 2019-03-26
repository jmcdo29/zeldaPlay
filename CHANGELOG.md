# ZeldaPlay Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.1] -- 2019-03-26

### Added

- Health check indicator for Characters (@nestjs/terminus module)
- Started to add recovery questions to user registration
  - Should probably add better error handling for the recovery question

## [2.3.0] -- 2019-03-18

### Added

- Metric gatherer

### Changed

- async/await to Observables
- moved Changelog, CODE_OF_CONDUCT, CONTRIBUTING and LICENSE
- Upgraded to Nest 6.0.1

### Removed

- A lot of the angular theming was slowing down the app. Has been removed

## [2.0.2] -- 2018-11-27

### Added

- Angular Table theming for Character Create tables
- Capitalize pipe for easier string capitalization
- TSLint using SonarTS

### Changed

- Utils file from multiple exports to single expoerted static class

## [2.0.1] -- 2018-11-01

### Added

- Angular Material theming

## [2.0.0] -- 2018-10-18

### Changed

- Using NestJS instead of Express for the server framework

- Using TypeORM instead of Knex and Objection for the ORM and QueryBuilder

- "Fixed" module system on client code to look like the server code and better use modules in Angular

- Implemented immediate saves on Note, Spell, and Weapon creation.

### Removed

- Original Express Code

- References to Objection and Knex along with the migration and model files

- Lots of test coverage due to new frameworks

## [1.0.0] -- 2018-10-08

### Added

- Project Released!

- Express backend server

- Knex and Objection ORM and Query Builder

- Angular 6 as final front end framework

- Ability to create, edit, and save personal characters

- Can log in and save multiple characters

- Full test coverage
