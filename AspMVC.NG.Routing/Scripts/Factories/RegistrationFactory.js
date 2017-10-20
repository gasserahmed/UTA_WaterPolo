// provide a service for registration
var RegistrationFactory = function ($http, $q) {
    return function (utaID, emailAddress, password, confirmPassword, firstName, lastName, role, status, lastActivity) {

        var deferredObject = $q.defer();

        // post user's register infomation to server
        $http.post(
            '/Account/Register', {
                UtaID: utaID,
                Email: emailAddress,
                Password: password,
                ConfirmPassword: confirmPassword

            }
        ).
        // if register successfully, return True valuse. Otherwise, False.
        success(function (data) {
            if (data == "True") {
                deferredObject.resolve({ success: true });
            } else {
                deferredObject.resolve({ success: false });
            }
        }).
        error(function () {
            deferredObject.resolve({ success: false });
        });

        return deferredObject.promise;
    }
}

RegistrationFactory.$inject = ['$http', '$q'];