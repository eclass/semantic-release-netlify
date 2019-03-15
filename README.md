# @eclass/semantic-release-netlify

[![npm](https://img.shields.io/npm/v/@eclass/semantic-release-netlify.svg)](https://www.npmjs.com/package/@eclass/semantic-release-netlify)
[![build](https://img.shields.io/travis/eclass/semantic-release-netlify.svg)](https://travis-ci.org/eclass/semantic-release-netlify)
[![downloads](https://img.shields.io/npm/dt/@eclass/semantic-release-netlify.svg)](https://www.npmjs.com/package/@eclass/semantic-release-netlify)
[![dependencies](https://img.shields.io/david/eclass/semantic-release-netlify.svg)](https://david-dm.org/eclass/semantic-release-netlify)
[![devDependency Status](https://img.shields.io/david/dev/eclass/semantic-release-netlify.svg)](https://david-dm.org/eclass/semantic-release-netlify#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/eclass/semantic-release-netlify/badge.svg?branch=master)](https://coveralls.io/github/eclass/semantic-release-netlify?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/f84f0bcb39c9a5c5fb99/maintainability)](https://codeclimate.com/github/eclass/semantic-release-netlify/maintainability)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> [semantic-release](https://github.com/semantic-release/semantic-release) plugin to deploy app with [netlify](https://netlify.com)

| Step               | Description                                                                                 |
|--------------------|---------------------------------------------------------------------------------------------|
| `verifyConditions` | Verify the presence of the `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` environment variable. |
| `publish`          | Upload assets to netlify.                                                                   |

## Install

```bash
npm i -D @eclass/semantic-release-netlify
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    "@eclass/semantic-release-netlify"
  ]
}
```

## Configuration

### Netlify authentication

The netlify authentication configuration is **required** and can be set via [environment variables](#environment-variables).

### Environment variables

| Variable             | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| `NETLIFY_AUTH_TOKEN` | Netlify token created via [personal access tokens](https://app.netlify.com/account/applications/personal) |
| `NETLIFY_SITE_ID`    | Netlify site ID created via [netlify sites:create](https://www.netlify.com/docs/cli/#getting-help) |

### Examples

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    "@eclass/semantic-release-netlify"
  ]
}
```

```yml
# .gitlab-ci.yml
release:
  image: node:11-alpine
  stage: release
  before_script:
    - npm i -g netlify-cli
  script:
    - npx semantic-release
  only:
    - master
```

```yml
# .travis.yml
language: node_js
cache:
  directories:
    - ~/.npm
node_js:
  - "11"
stages:
  - test
  - name: deploy
    if: branch = master
jobs:
  include:
    - stage: test
      script: npm t
    - stage: deploy
      before_script:
        - npm i -g netlify-cli
      script: npx semantic-release

```

## License

[MIT](https://tldrlegal.com/license/mit-license)
