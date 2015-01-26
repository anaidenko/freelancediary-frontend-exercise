/// <reference path="../_reference.js" /> 
/// <reference path="/FreelanceDiaryTask/Scripts/app/sha1.js" /> 

describe('SHA1', function () {
    it('should hash empty string', function () {
        expect(SHA1('')).toBe(SHA1(''));
    });

    it('should be unique', function () {
        expect(SHA1('A')).not.toBe(SHA1('B'));
        expect(SHA1('B')).not.toBe(SHA1('C'));
    });

    it('should be repeatable', function () {
        expect(SHA1('A')).toBe(SHA1('A'));
        expect(SHA1('B')).toBe(SHA1('B'));
    });

    it('should implement SHA-1 hashing algorithm', function () {
        expect(SHA1('test')).toBe('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
        expect(SHA1('e4d909c290d0fb1ca068ffaddf22cbd0')).toBe('24cacd2b74fd8557af7adfeee243ea8ee4c2487f');
    });
});
