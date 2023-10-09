# Monitoring System

This is a very customized monitoring system for checking uptime, sometimes doing things with puppeteer, and reporting the outcome of said uptime to a microsoft teams webhook.

## Example config:

```
functions:
  dt-prod:
    # One of the functions (described below)
    handler: serverless.checkForContent
    timeout: 20
    events:
      - schedule:
          rate: rate(1 minute)

    environment:
      # This table needs to be set in advance!
      DYNAMODB_TABLE_NAME: uptime-monitoring
      MS_TEAMS_WEBHOOK: https://somuchgibberish.webhook.office.com/webhookb2/MOREGIBBERISH
      URL: https://google.com
      CONTENT: some string you expect to see on the loaded page
```

## Functions

### CheckForUptime

Takes URL argument. Checks that page loads without error

### CheckForContent

Takes `URL`, `CONTENT` arguments. Will only pass if `CONTENT` is present on page

### CheckForOTPRR

Takes `URL`, `CONTENT` arguments. Will only pass if `CONTENT` is present on page. Identical to `CheckForContent`, except also does plans an OTP-RR trip from "100" to "200". Will fail if any part of this process fails. Used to test the geocoder + OTP server the OTP-RR instance is connected to.

## TODO

- [ ] TSDX integration
- [ ] Feature enhancements (see code)
