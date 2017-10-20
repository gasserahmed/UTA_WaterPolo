var UserService = function ($http) {
    // login process
    this.Login = function (userTable) {
        var response = $http({
            method: "post",
            url: "Account/Login",
            params: {
                email: JSON.stringify(userTable.email),
                password: JSON.stringify(userTable.password)

            }
        });
        return response;
    }

    // register User
    this.RegisterUser = function (userTable) {
        var response = $http({
            method: "post",
            url: "Account/RegisterUser",
            dataType: "json",
            params: {
                uta_id: JSON.stringify(userTable.uta_id),
                email: JSON.stringify(userTable.email),
                password: JSON.stringify(userTable.password),
                first_name: JSON.stringify(userTable.first_name),
                last_name: JSON.stringify(userTable.last_name)
            }
        });
        return response;
    }
}
UserService.$inject = ['$http'];