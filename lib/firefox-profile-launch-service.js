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
        return new Promise((resolve) => {
            this.profile.encoded((zippedProfile) => {
                if (Array.isArray(this.caps)) {
                    this.caps.filter((cap) => cap.browserName === 'firefox').forEach((cap) => {
                        cap.firefox_profile = zippedProfile
                    })
                    return resolve()
                }

                for (let browser in this.caps) {
                    if (this.caps[browser].browserName !== 'firefox') {
                        continue
                    }

                    this.caps[browser]
                }

                return resolve()
            })
        })
    }
}

export default FirefoxProfileLaunchService
