var EventController = function ($scope, $rootScope, $location, WaterPoloService) {

    //$scope.duplicated = false;
    $scope.myDate = new Date();
    $scope.isOpen = false;
    $scope.showAddNewButton = true;
    $scope.showAddNewIcon = true;
    $scope.showUpdateButton = true;

    //$scope.example = {
    //    value: new Date(1970, 0, 1, 14, 57, 0)
    //};
    $scope.GetEvents = function () {
        var getData = WaterPoloService.GetEvents($rootScope.uta_id);
        getData.then(function (event) {
            $scope.events = event.data;
        }, function () {
            alert('Error in getting records');
        });
    };

    $scope.FormatJsonDate = function (dateValue) {
        return new Date(dateValue.match(/\d+/)[0] * 1);
    }

    // edit row event
    $scope.EditRowEvent = function (event) {
        $('.formData').slideDown();
        $scope.description = event.description;
        $scope.location = event.location;
        $scope.startDate = $scope.FormatJsonDate(event.start_date);
        $scope.endDate = $scope.FormatJsonDate(event.end_date);
        $scope.startTime = $scope.FormatJsonDate(event.start_time);
        $scope.endTime = $scope.FormatJsonDate(event.end_time);
        $scope.fee = event.fee;
        $scope.event_id = event.event_id;
    };

    // update row event
    $scope.UpdateEvent = function () {
        var eventTable = {
            description: $scope.description,
            location: $scope.location,
            startDate: $scope.startDate,
            endDate: $scope.endDate,
            startTime: $scope.startTime,
            endTime: $scope.endTime,
            fee: $scope.fee,
            event_id : $scope.event_id
        };

        var getData = WaterPoloService.UpdateEvent(eventTable);
        getData.then(function (msg) {
            if (msg.data != "") {
                $('.formData').slideUp();
                $scope.GetEvents();
            }
        }, function () {
            alert('Error in adding event!');
        });
    }

    // delete row event
    $scope.DeleteRowEvent = function (event) {
        var result = confirm("Want this event to delete?");
        if (!result) {
            return;
        }
        var eventTable = {
            event_id: event.event_id
        };

        var getData = WaterPoloService.DeleteRowEvent(eventTable);
        getData.then(function (msg) {
            if (msg.data === "success") {
                $scope.GetEvents();
                alert("Successully deleted!");
            }
            else {
                alert("Failed to delete.");
            }
        }, function () {
            alert('Error in deleting record');
        });
    };

    // when click plus sign on the top right event page
    $scope.AddNewIcon = function () {
        $('.formData').slideToggle();
        $scope.description = "";
        $scope.location = "";
        $scope.startDate = "";
        $scope.endDate = "";
        $scope.startTime = "";
        $scope.endTime = "";
        $scope.fee = "";
        $scope.event_id = "";
    }
    $scope.DeleteEvent = function (event) {

    };

    // Add Event
    $scope.AddEvent = function () {
        var eventTable = {
            description: $scope.description,
            location: $scope.location,
            startDate: $scope.startDate,
            endDate: $scope.endDate,
            startTime: $scope.startTime,
            endTime: $scope.endTime,
            fee: $scope.fee
        };

        var getData = WaterPoloService.AddEvent(eventTable);
        getData.then(function (msg) {
            if (msg.data === "Success") {
                $('.formData').slideUp();
                $scope.GetEvents();
            }
        }, function () {
            alert('Error in adding event!');
        });
    }

    $scope.checkDateTime = function (startDateTime, endDateTime) {
        $scope.errMessage = '';

        if (date.compare(new Date(startDateTime), new Date(endDateTime)) === -1) {
            $scope.errMessage = 'End Date should be greate than Start Date';
            return true;
        }
        else {
            return false;
        }
    }

    // sign up event
    $scope.SignUpEvent = function (event) {
        var ticketTable = {
            uta_id: $rootScope.uta_id,
            event_id: event.event_id
        };

        var getData = WaterPoloService.SignUpEvent(ticketTable);
        getData.then(function (msg) {
            if (msg.data === "Success") {
                //alert("success");
                $scope.GetEvents();
            }
            else {
            }
        }, function () {
            alert('Error in singup event');
        });
    }

    // sign out event
    $scope.SignOutEvent = function (event) {
        var ticketTable = {
            ticket_id: event.ticket_id
        };

        var getData = WaterPoloService.SignOutEvent(ticketTable);
        getData.then(function (msg) {
            if (msg.data === "success") {
                $scope.GetEvents();
            }
            else {
            }
        }, function () {
            alert('Error in sing out event');
        });
    }
}

EventController.$inject = ['$scope', '$rootScope', '$location', 'WaterPoloService'];