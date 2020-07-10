const axios = require("axios");
const express = require("express");
const app = express();

let { log } = console;
// let urlInput = process.argv[2];
let response;
let data;

const psFetcher = async function fetcher(url) {
  try {
    response = await axios.get(`${url}/ps/dev/SystemStatus.action`);
    if (response.status !== 200) {
      log(`Page returned Status Code ${response.status}`);
    }
    data = response.data.split("\n");

    let versionPatternWithHash = /\d{0,1}(\.\d{1,2})+-./gm;
    let versionNumberPattern = /\d(\.\d{1,2})+/gm;
    let versionNumberPattern1WithHash = /\d{0,1}(\.\d{1,2})+\s-\s.{7}/gm;
    let snapshotVersion = /\d{0,1}(\.\d{1,2})+-.+\s-\s.{7}/gm;

    for (let elm of data) {
      if (elm.includes("<td") && elm.match(snapshotVersion)) {
        return elm.match(snapshotVersion).toString();
      } else if (elm.includes("<td") && elm.match(versionPatternWithHash)) {
        log(elm.match(versionNumberPattern).toString());
        return elm.match(versionNumberPattern).toString();
      } else if (
        elm.includes("<td") &&
        elm.match(versionNumberPattern1WithHash)
      ) {
        log(
          `Version for ${url}: ${elm
            .match(versionNumberPattern1WithHash)
            .toString()}`
        );
        return elm.match(versionNumberPattern1WithHash).toString();
      }
    }
  } catch (error) {
    log(error);
    if (error.code == "ECONNREFUSED") {
      return "Connection was refused - check the URL that was entered";
    }
    if (error.response.status !== 200) {
      return `Page returned with status ${error.response.status}`;
    }
  }
};

async function ipsFetcher(url) {
  response = await axios.get(`${url}/ips/pub/api/version`);
  log(response.data);
}

exports.psFetcher = psFetcher;

// Matches 4.10.0 Version
// /\d{0,1}(\.\d{1,2})+-.+\s-\s.+/gm
// Matches 4.9 versions
// /\d{0,1}(\.\d{1,2})+\s-\s.+/gm
