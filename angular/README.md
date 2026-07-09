# RasaUI Angular

RasaUI Angular library and sandbox.

## Development Setup
1. Make sure to follow the [prerequisites](../../../README.md#development-prerequisites) on the monorepo.
2. Run `npm install` to restore project packages.
3. Run `npm start` to build and watch the library as well as opening the sandbox project.
4. Before sending any commit make sure to run `npm run precommit` and fix all linting errors.

**IMPORTANT**: Do not create any angular elements without using the `package.json` commands. If a command is not present for something discuss with your lead and use one time or create the appropriate reusable command.

```shell
# SAMPLES

#Create a component
npm run rasa:component

#Create a directive
npm run rasa:directive

#Create a pipe
npm run rasa:pipe
```