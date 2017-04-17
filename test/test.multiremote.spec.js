describe('firefox profile service', function () {
    it('should have a firefox profile in the capabilties', function () {
        firefox.desiredCapabilities.should.have.property('firefox_profile')
    })

    it('should have set preferences properly', function () {
        firefox.getUrl().should.be.equal('http://webdriver.io/')
    })

    it('should have installed the extension', function () {
        firefox.getText('.header').should.be.equal('WebdriverIOTestExtension successfully installed!'.toUpperCase())
    })
})
