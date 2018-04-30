angular.module('JEChat').controller('ProfileController', ['$http', '$log', '$scope', '$routeParams',
    function ($http, $log, $scope, $routeParams) {

        var thisCTRL = this;

        this.profile = {};
        this.groupchats = {};


        this.loadProfile = function () {
            //Target user identifier
            var usrid = $routeParams.userid;
            console.log('Im inside users.js');
            //Url for target user information
            var url = "http://localhost:4545/JEChat/" + usrid;
            console.log("url: " + url);

            $http.get(url).then(
                //Success function
                function (response) {
                    console.log("info: " + JSON.stringify(response.data));
                    thisCTRL.profile = response.data.User;
                },
                //Error function
                function (response) {
                    var status = response.status;
                    if (status) {
                        alert("Something went wrong");
                    }
                }
            );
        };

        this.loadProfile();
    }]);
