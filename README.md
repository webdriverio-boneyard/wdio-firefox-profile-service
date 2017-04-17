WDIO Firefox Profile Service
============================

[![Code Climate](https://codeclimate.com/github/webdriverio/wdio-firefox-profile-service/badges/gpa.svg)](https://codeclimate.com/github/webdriverio/wdio-firefox-profile-service) [![Build Status](https://travis-ci.org/webdriverio/wdio-firefox-profile-service.svg?branch=master)](https://travis-ci.org/webdriverio/wdio-firefox-profile-service) [![dependencies Status](https://david-dm.org/webdriverio/wdio-firefox-profile-service/status.svg)](https://david-dm.org/webdriverio/wdio-firefox-profile-service)

***

You want to run your Firefox browser with a specific extension or need to set couple preferences? Selenium allows you to use a profile for the Firefox browser by passing this profile as `base64` string to the `firefox_profile` property in your desired capabilities. This requires to build that profile and convert it into `base64`. This service for the [wdio testrunner](http://webdriver.io/guide/testrunner/gettingstarted.html) takes the work of compiling the profile out of your hand and let's you define your desired options comfortable from the `wdio.conf.js` file.

To find all possible options just open [about:config](about:config) in your Firefox browser or go to [mozillaZine](http://kb.mozillazine.org/About:config_entries) website to find the whole documentation about each setting. In Addition to that you can define compiled (as `*.xpi`) Firefox extensions that should get installed before the test starts.

## Installation

The easiest way is to keep `wdio-firefox-profile-service` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "wdio-firefox-profile-service": "~0.0.2"
  }
}
```

You can simple do it by:

```bash
npm install wdio-firefox-profile-service --save-dev
```

Instructions on how to install `WebdriverIO` can be found [here.](http://webdriver.io/guide/getstarted/install.html)

## Configuration

Setup your profile by adding the `firefox-profile` service to your service list. Then define your settings in the `firefoxProfile` property like this:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['firefox-profile'],
  firefoxProfile: {
    extensions: [
      '/path/to/extensionA.xpi', // path to .xpi file
      '/path/to/extensionB' // or path to unpacked Firefox extension
    ],
    'browser.startup.homepage': 'http://webdriver.io'
  },
  // ...
};
```

## Options

### firefoxProfile
Contains all settings as key value pair. If you want to add an extension, use the `extensions` key with an array of string paths to the extensions you want to use.

Type: `Object`

## Development

All commands can be found in the package.json. The most important are:

Watch changes:

```sh
$ npm run watch
```

Run tests:

```sh
$ npm test

# run test with coverage report:
$ npm run test:cover
```

Build package:

```sh
$ npm build
```

----

For more information on WebdriverIO see the [homepage](http://webdriver.io).
