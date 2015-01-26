/// <reference path="../_reference.js" /> 
/// <reference path="/FreelanceDiaryTask/Scripts/app/index.js" /> 

describe('AuthHandler', function () {
    var AuthHandler;
    var $httpBackend;
    var localStorageService;
    var APP_TOKEN;
    var AUTH_ENDPOINT;

    beforeEach(module('authApp'));
    beforeEach(inject(function ($injector) {
        AuthHandler = $injector.get('AuthHandler');
        $httpBackend = $injector.get('$httpBackend');
        localStorageService = $injector.get('localStorageService');
        APP_TOKEN = $injector.get('APP_TOKEN');
        AUTH_ENDPOINT = $injector.get('AUTH_ENDPOINT');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send HTTP request to authentication server', function () {
        $httpBackend.expectPOST(AUTH_ENDPOINT).respond({ clientToken: 'new client token' });
        AuthHandler.authenticate();
        $httpBackend.flush();
    });

    it('should send applicationToken as request body payload', function () {
        $httpBackend.expectPOST(AUTH_ENDPOINT, { applicationToken: APP_TOKEN })
            .respond({ clientToken: 'new client token' });

        AuthHandler.authenticate();
        $httpBackend.flush();
    });

    it('should send Authorization header', function () {
        $httpBackend.expectPOST(AUTH_ENDPOINT, undefined, function (headers) { return headers['Authorization'] != null; })
            .respond({ clientToken: 'new client token' });

        AuthHandler.authenticate();
        $httpBackend.flush();
    });

    it('should hash applicationToken in header using SHA-1 algorithm', function () {
        $httpBackend.expectPOST(AUTH_ENDPOINT, undefined, function (headers) {
            return headers['Authorization'] == SHA1(APP_TOKEN);
        }).respond({ clientToken: 'new client token' });

        AuthHandler.authenticate();
        $httpBackend.flush();
    });

    it('should persist clientToken in local storage', function () {
        $httpBackend.whenPOST(AUTH_ENDPOINT).respond({ clientToken: 'new client token' });

        AuthHandler.authenticate();
        $httpBackend.flush();

        expect(localStorageService.get('clientToken')).toBe('new client token');
    });

    it('should provide clientToken', function () {
        $httpBackend.whenPOST(AUTH_ENDPOINT).respond({ clientToken: 'new client token' });

        AuthHandler.authenticate();
        $httpBackend.flush();

        expect(AuthHandler.getClientToken()).toBe('new client token');
    });

    it('should fail authentication', function () {
        var error = jasmine.createSpy();
        $httpBackend.whenPOST(AUTH_ENDPOINT).respond(403, 'Application token is not valid');

        AuthHandler.authenticate().error(error);
        $httpBackend.flush();

        expect(error).toHaveBeenCalled();
        expect(error.calls.mostRecent().args[0]).toBe('Application token is not valid');
    });
});

describe('LoginController', function () {
    var $scope;
    var AUTH_ENDPOINT;
    var $httpBackend;
    var $window;
    var createController;

    beforeEach(module('authApp'));
    beforeEach(inject(function ($injector) {
        AUTH_ENDPOINT = $injector.get('AUTH_ENDPOINT');
        $scope = $injector.get('$rootScope').$new();
        $httpBackend = $injector.get('$httpBackend');
        $window = $injector.get('$window');

        var $controller = $injector.get('$controller');
        createController = function () {
            return $controller('LoginController', { $scope: $scope });
        };
    }));

    it('should have no client token predefined', function () {
        createController();
        expect($scope.clientToken).toBeNull();
    });

    it('should request for client token', function () {
        $httpBackend.whenPOST(AUTH_ENDPOINT).respond(200, { clientToken: 'bf4acf1b6a87f82698e50182a29cd708a41e8830' });

        createController();
        $scope.authenticate();
        $httpBackend.flush();
        $scope.$digest();

        expect($scope.clientToken).toBe('bf4acf1b6a87f82698e50182a29cd708a41e8830');
    });

    describe('should alert authentication error message', function () {
        beforeEach(function () {
            spyOn($window, 'alert');
            createController();
            $scope.authenticate();
        });

        it('JSON not valid (404)', function () {
            $httpBackend.whenPOST(AUTH_ENDPOINT).respond(404, 'JSON not valid');
            $httpBackend.flush();
            expect($window.alert).toHaveBeenCalledWith('JSON not valid');
        });

        it('Authorization header is not valid (403)', function () {
            $httpBackend.whenPOST(AUTH_ENDPOINT).respond(403, 'Authorization header is not valid');
            $httpBackend.flush();
            expect($window.alert).toHaveBeenCalledWith('Authorization header is not valid');
        });

        it('Application token is not valid (403)', function () {
            $httpBackend.whenPOST(AUTH_ENDPOINT).respond(404, 'Application token is not valid');
            $httpBackend.flush();
            expect($window.alert).toHaveBeenCalledWith('Application token is not valid');
        });
    });
});
