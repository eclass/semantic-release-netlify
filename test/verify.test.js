'use strict'

const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const tempy = require('tempy')
const verify = require('../src/verify')

describe('Verify', () => {
  let cwd

  before(() => {
    cwd = tempy.directory()
  })

  it('Return SemanticReleaseError if NETLIFY_AUTH_TOKEN environment variable is not defined', async () => {
    try {
      await verify({}, { cwd })
    } catch (err) {
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENONETLIFYTOKEN')
    }
  })

  it('Return SemanticReleaseError if NETLIFY_SITE_ID environment variable is not defined', async () => {
    try {
      process.env.NETLIFY_AUTH_TOKEN = 'my-token'
      await verify({}, { cwd })
    } catch (err) {
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENONETLIFYSITEID')
    }
  })

  it('Verify alias from NETLIFY_AUTH_TOKEN environmen variable', async () => {
    process.env.NETLIFY_SITE_ID = 'my-site-id'
    expect(await verify({}, { cwd })).to.be.a('undefined')
  })
})
