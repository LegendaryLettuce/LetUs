const chai = require('chai');
const should = chai.should();

// browser is global variable included in the wdio.config file

// Actions for Selenium
// http://webdriver.io/api/mobile/performMultiAction.html#

describe('Main Page', () => {
  it('should have the title "LetUs"', () => {
    browser.url('/');
    browser.getTitle().should.equal('LetUs');
  });
});
