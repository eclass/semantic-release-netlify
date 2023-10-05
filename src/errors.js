'use strict'

const pkg = require('../package.json')

const [homepage] = pkg.homepage.split('#')
// eslint-disable-next-line require-jsdoc
const linkify = file => `${homepage}/blob/master/${file}`

module.exports = {
  ENONETLIFYTOKEN: () => ({
    message: 'No netlify token specified.',
    details: `An [netlify token](${linkify(
      'README.md#netlify-authentication'
    )}) must be created and set in the \`NETLIFY_AUTH_TOKEN\` environment variable on your CI environment.

Please make sure to create an [netlify token](https://app.netlify.com/account/applications/personal) and to set it in the \`NETLIFY_AUTH_TOKEN\` environment variable on your CI environment. The token must allow to deploy to netlify.`
  }),
  ENONETLIFYSITEID: () => ({
    message: 'No netlify site ID specified.',
    details: `An [netlify site ID](${linkify(
      'README.md#netlify-authentication'
    )}) must be created and set in the \`NETLIFY_SITE_ID\` environment variable on your CI environment.

Please make sure to create an [netlify site ID](https://www.netlify.com/docs/cli/#getting-help) and to set it in the \`NETLIFY_SITE_ID\` environment variable on your CI environment. The site ID must allow to link deploy to netlify app.`
  }),
  ENETLIFYDEPLOY: () => ({
    message: 'Error in `netlify deploy` command.',
    details:
      'Check the [netlify documentation](https://www.netlify.com/docs/cli/#manual-deploys).'
  })
}
