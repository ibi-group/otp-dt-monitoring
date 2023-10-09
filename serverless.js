const { notifyMsTeams } = require("./ms-teams");
const { monitor } = require("./index");
const { getUrlState, setUrlState } = require("./dynamodb");

const url = process.env.URL;

const postIfChanged = async (status) => {
  const prevUp = await getUrlState(url);
  const newUp = status !== false;
  await setUrlState(url, newUp);
  if (prevUp !== newUp) await notifyMsTeams(url, newUp, status);
}

module.exports.checkForContent = async () => {
  const content = process.env.CONTENT;
  const status = await monitor(url, content);
  postIfChanged(status)
};

module.exports.checkForOTPRR = async () => {
  const content = process.env.CONTENT;
  const status = await monitor(url, content, true);
  postIfChanged(status)
};

module.exports.checkForUptime = async () => {
  const status = await monitor(url);
  postIfChanged(status)
};
