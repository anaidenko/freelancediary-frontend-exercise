'use strict';

describe('Auth app', function () {

    beforeEach(function () {
        browser.get('/');
    });

    it('should have a button labeled "Send authentication request"', function () {
        expect(element(by.css('button')).getText()).toBe('Send authentication request');
    });

    it('should have no clientToken displayed under the button', function () {
        expect(element(by.css('button + *')).getText()).toBe('');
    });

    it('should send authentication request to the server and display clientToken under the button', function () {
        element(by.css('button')).click();
        expect(element(by.css('button + *')).getText()).not.toBe('');
    });

});
