import FirefoxProfile from 'firefox-profile'

const SPECIAL_PROPERTIES = ['extensions', 'proxy']

class FirefoxProfileLaunchService {
    /**
     * modify config and launch sauce connect
     */
    onPrepare (config, caps) {
        this.config = config
        this.caps = caps

        /**
         * don't do anything if no profile is specified
         */
        if (!config.firefoxProfile) {
            return
        }

        this.profile = new FirefoxProfile()

        for (let preference in config.firefoxProfile) {
            /**
             * extensions are getting set at the end
             */
            if (SPECIAL_PROPERTIES.includes(preference)) {
                continue
            }

            this.profile.setPreference(preference, config.firefoxProfile[preference])
        }

        if (this.config.firefoxProfile.proxy) {
            this.profile.setProxy(this.config.firefoxProfile.proxy)
        }

        this.profile.updatePreferences()

        if (!Array.isArray(config.firefoxProfile.extensions)) {
            return this.buildExtension()
        }

        return new Promise((resolve) => {
            this.profile.addExtensions(config.firefoxProfile.extensions, () => {
                return resolve(this.buildExtension())
            })
        })
    }

    buildExtension () {
        return new Promise((resolve, reject) => {
            this.profile.encoded((err, zippedProfile) => {
                if (err) {
                    console.error(`Failed to encode Firefox profile: ${err}`)
                    return reject(err)
                }

                /**
                 * apply profile for normal WebdriverIO instance
                 */
                if (Array.isArray(this.caps)) {
                    this.caps.filter((cap) => cap.browserName === 'firefox').forEach((cap) => {
                        // for older firefox and geckodriver versions
                        cap.firefox_profile = zippedProfile

                        // for firefox >= 56.0 and geckodriver >= 0.19.0
                        cap['moz:firefoxOptions'] = {
                            profile: zippedProfile
                        }
                    })
                    return resolve()
                }

                /**
                 * apply profile for multiremote instance
                 */
                for (let browser in this.caps) {
                    const cap = this.caps[browser].desiredCapabilities
                    if (!cap || cap.browserName !== 'firefox') {
                        continue
                    }
                    // for older firefox and geckodriver versions
                    cap.firefox_profile = zippedProfile

                    // for firefox >= 56.0 and geckodriver >= 0.19.0
                    cap['moz:firefoxOptions'] = {
                        profile: zippedProfile
                    }
                }

                return resolve()
            })
        })
    }
}

export default FirefoxProfileLaunchService
