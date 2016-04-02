import FirefoxProfile from 'firefox-profile'

const SPECIAL_PROPERTIES = ['extensions', 'proxy']

class FirefoxProfileLaunchService {
    /**
     * modify config and launch sauce connect
     */
    onPrepare (config) {
        this.config = config

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
            this.profile.addExtentsions(this.firefoxProfile.extensions, function () {
                return resolve(this.buildExtension)
            })
        })
    }

    buildExtension () {
        return new Promise((resolve) => {
            this.profile.encoded((zippedProfile) => {
                if (Array.isArray(this.config.capabilities)) {
                    return this.config.capabilities.filter((cap) => cap.browserName === 'firefox').forEach((cap) => {
                        cap.firefox_profile = zippedProfile
                    })
                }

                for (let browser in this.config.capabilities) {
                    if (this.config.capabilities[browser].browserName !== 'firefox') {
                        continue
                    }

                    this.config.capabilities[browser]
                }
            })
        })
    }
}

export default FirefoxProfileLaunchService
