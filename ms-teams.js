const fetch = require('isomorphic-fetch')

const webhook = process.env.MS_TEAMS_WEBHOOK

if (!webhook) {
  throw new Error('MS_TEAMS_WEBHOOK must be defined!')
}

/**
 * Send a message to MS Teams using a webhook. This will generate a card
 * according to the following schema:
 * https://docs.microsoft.com/en-us/outlook/actionable-messages/message-card-reference#openuri-action
 *
 */
module.exports.notifyMsTeams = function notifyMSTeams (url, state, details) {
  const up = state ? "UP" : "DOWN"
  const body =  {
    method: 'POST',
    body: JSON.stringify({
      '@context': 'https://schema.org/extensions',
      '@type': 'MessageCard',
      themeColor: state ? '03fc20' : 'fc4e03',
      title: `${url} ${up}`,
      text: details || `${new Date()}`,
      potentialAction: []
    })
  } 
  // console.log(body)
  return fetch(
    webhook,
    body
  )
}
