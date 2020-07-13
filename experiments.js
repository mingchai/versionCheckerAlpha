const axios = require("axios");
const { log } = console;
let response;
let data;
const psApp = "PS";
const ipsApp = "IPS";
const tronApp = "Tron";
const txsApp = "TXS";
const cmsApp = "CMS";
const icsApp = "ICS";
// Matches to just the version number
// let versionNumberPattern = /\d(\.\d{1,2})+/gm;

let versionNumberPatternWithHash = /\d{0,1}(\.\d{1,2})+\s-\s.{7}/gm;
let snapshotVersion = /\d{0,1}(\.\d{1,2})+-.+\s-\s.{7}/gm;

module.exports = {
  psFetcher: async function psFetcher(url) {
    try {
      response = await axios.get(`${url}/ps/dev/SystemStatus.action`);
      if (response.status !== 200) {
        log(`Page returned Status Code ${response.status}`);
      }

      data = response.data.split("\n");

      for (let elm of data) {
        if (elm.includes("<td") && elm.match(snapshotVersion)) {
          log(elm.match(snapshotVersion).toString());
          return [elm.match(snapshotVersion).toString(), psApp];
        } else if (
          elm.includes("<td") &&
          elm.match(versionNumberPatternWithHash)
        ) {
          log(
            `Version for ${url}: ${elm
              .match(versionNumberPatternWithHash)
              .toString()}`
          );
          return [elm.match(versionNumberPatternWithHash).toString(), psApp];
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
  },

  ipsFetcher: async function ipsFetcher(url) {
    response = await axios.get(`${url}/ips/pub/api/version`);
    log(response.data);
    let version = response.data;
    return [version, ipsApp];
  },

  tronFetcher: async function tronFetcher(url) {
    try {
      response = await axios.get(`${url}/omegatron/spr/SystemStatus`);
      if (response.status !== 200) {
        log(`Page returned Status Code ${response.status}`);
      }
      log(response)
      data = response.data.split("\n");

      for (let elm of data) {
        if (elm.includes("<td") && elm.match(snapshotVersion)) {
          log(elm.match(snapshotVersion).toString());
          return [elm.match(snapshotVersion).toString(), tronApp];
        } else if (
          elm.includes("<td") &&
          elm.match(versionNumberPatternWithHash)
        ) {
          log(
            `Version for ${url}: ${elm
              .match(versionNumberPatternWithHash)
              .toString()}`
          );
          return [elm.match(versionNumberPatternWithHash).toString(), tronApp];
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
  },

  txsFetcher: async function txsFetcher(url) {
    response = await axios.get(`${url}/omegatxs/pub/api/version`);
    log(response.data);
    let version = response.data;
    return [version, txsApp];
  },

  icsFetcher: async function icsFetcher(url) {
    response = await axios.get(`${url}/ics/pub/api/version`);
    log(response.data);
    let version = response.data;
    return [version, icsApp];
  }
};

// Matches 4.10.0 Version
// /\d{0,1}(\.\d{1,2})+-.+\s-\s.+/gm
// Matches 4.9 versions
// /\d{0,1}(\.\d{1,2})+\s-\s.+/gm
