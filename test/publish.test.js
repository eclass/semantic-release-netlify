"use strict";

const path = require("path");
const tempy = require("tempy");
const { stub } = require("sinon");
const { describe, it, before, beforeEach } = require("mocha");
const { expect } = require("chai");
const { WritableStreamBuffer, ReadableStreamBuffer } = require("stream-buffers");
const { mkdir, writeFile } = require("fs-extra");
const mock = require("mock-require");

// eslint-disable-next-line require-jsdoc
const execaMock = () => {
  // eslint-disable-next-line require-jsdoc
  const handlePromise = () => Promise.resolve();
  return {
    stdout: new ReadableStreamBuffer(),
    stderr: new ReadableStreamBuffer(),
    then: (onFulfilled, onRejected) =>
      handlePromise().then(onFulfilled, onRejected),
    catch: onRejected => handlePromise().catch(onRejected)
  };
};

describe("Publish", () => {
  let stdout;
  let stderr;
  let cwd = "";
  let logger;
  let publish;

  before(async () => {
    logger = { log: stub() };
    cwd = tempy.directory();
    await mkdir(path.resolve(cwd, "build"));
    await writeFile(
      path.resolve(cwd, "index.html"),
      "<h1>@eclass/semantic-release-netlify</h1>"
    );
    mock("execa", execaMock);
    publish = require("../src/publish");
  });

  beforeEach(() => {
    stdout = new WritableStreamBuffer();
    stderr = new WritableStreamBuffer();
  });

  it("Deploy app", async () => {
    expect(await publish({}, { cwd, stdout, stderr, logger })).to.be.a(
      "undefined"
    );
  });
});
