const chai = require('chai');
const should = chai.should();

// browser is global variable included in the wdio.config file

describe('First Spec', () => {
  it('should navigate to the WebdriverIO homepage', () => {
    browser.url('http://webdriver.io/');
    browser.getTitle().should.not. equal('djss');
  });
});
