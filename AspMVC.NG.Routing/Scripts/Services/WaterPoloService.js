var WaterPoloService = function ($http) {
    //Get About Data
    this.GetAbout = function () {
        var response = $http({
            method: "GET",
            url: "Routes/GetAbout"
        });
        return response;
    };

    // Update About Page Info
    this.UpdateAbout = function (aboutTable) {
        var response = $http({
            method: "post",
            url: "Routes/UpdateAbout",
            dataType: "json",
            params: {
                mission: JSON.stringify(aboutTable.mission),
                exec_board: JSON.stringify(aboutTable.exec_board),
                practices: JSON.stringify(aboutTable.practices),
                address: JSON.stringify(aboutTable.address)
            }
        });
        return response;
    }

    //Get Users Data
    this.GetUsers = function () {
        var response = $http({
            method: "GET",
            url: "Routes/GetUsers"
        });
        return response;
    };

    //Get Events Data
    this.GetEvents = function (uta_id) {
        var response = $http({
            method: "GET",
            url: "Routes/GetEvents",
            dataType: "json",
            params: {
                uta_id: JSON.stringify(uta_id)
            }
        });
        return response;
    };

    // Update User Event
    this.UpdateUser = function (userTable) {
        var response = $http({
            method: "post",
            url: "Routes/UpdateUser",
            dataType: "json",
            params: {
                first_name: JSON.stringify(userTable.first_name),
                last_name: JSON.stringify(userTable.last_name),
                email: JSON.stringify(userTable.email),
                role: JSON.stringify(userTable.role),
                status: JSON.stringify(userTable.status),
                last_activity: JSON.stringify(userTable.last_activity),
                uta_id: JSON.stringify(userTable.uta_id)
            }
        });
        return response;
    }

    // delete user Event
    this.DeleteUser = function (userTable) {
        var response = $http({
            method: "post",
            url: "Routes/DeleteUser",
            dataType: "json",
            params: {
                uta_id: JSON.stringify(userTable.uta_id)
            }
        });
        return response;
    }

    // Add Event
    this.AddEvent = function (eventTable) {
        var response = $http({
            method: "post",
            url: "Routes/AddEvent",
            dataType: "json",
            params: {
                description: JSON.stringify(eventTable.description),
                location: JSON.stringify(eventTable.location),
                startDate: JSON.stringify(eventTable.startDate),
                endDate: JSON.stringify(eventTable.endDate),
                startTime: JSON.stringify(eventTable.startTime),
                endTime: JSON.stringify(eventTable.endTime),
                fee: JSON.stringify(eventTable.fee)
            }
        });
        return response;
    }

    // Update Event
    this.UpdateEvent = function (eventTable) {
        var response = $http({
            method: "post",
            url: "Routes/UpdateEvent",
            dataType: "json",
            params: {
                description: JSON.stringify(eventTable.description),
                location: JSON.stringify(eventTable.location),
                startDate: JSON.stringify(eventTable.startDate),
                endDate: JSON.stringify(eventTable.endDate),
                startTime: JSON.stringify(eventTable.startTime),
                endTime: JSON.stringify(eventTable.endTime),
                fee: JSON.stringify(eventTable.fee),
                event_id: JSON.stringify(eventTable.event_id)
            }
        });
        return response;
    }

    // delete Event
    this.DeleteEvent = function (eventTable) {
        var response = $http({
            method: "post",
            url: "Routes/DeleteEvent",
            dataType: "json",
            params: {
                event_id: JSON.stringify(eventTable.event_id)
            }
        });
        return response;
    }

    // delete Event
    this.DeleteRowEvent = function (eventTable) {
        var response = $http({
            method: "post",
            url: "Routes/DeleteRowEvent",
            dataType: "json",
            params: {
                event_id: JSON.stringify(eventTable.event_id)
            }
        });
        return response;
    }
    // Sign Up Event
    this.SignUpEvent = function (ticketTable) {
        var response = $http({
            method: "post",
            url: "Routes/SignUpEvent",
            dataType: "json",
            params: {
                uta_id: JSON.stringify(ticketTable.uta_id),
                event_id: JSON.stringify(ticketTable.event_id)
            }
        });
        return response;
    }

    // Sign Out Event
    this.SignOutEvent = function (ticketTable) {
        var response = $http({
            method: "post",
            url: "Routes/SignOutEvent",
            dataType: "json",
            params: {
                ticket_id: JSON.stringify(ticketTable.ticket_id)
            }
        });
        return response;
    }

    // Show Sign Up Button
    this.ShowSignUpButton = function (ticketTable) {
        var response = $http({
            method: "get",
            url: "Routes/ShowSignUpButton",
            dataType: "json",
            params: {
                ticket_id: JSON.stringify(ticketTable.ticket_id),
                uta_id: JSON.stringify(ticketTable.uta_id)
            }
        });
        return response;
    }
}
WaterPoloService.$inject = ['$http'];