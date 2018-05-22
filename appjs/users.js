angular.module('JEChat').controller('ProfileController', ['$http', '$log', '$scope', '$routeParams',
    function ($http, $log, $scope, $routeParams) {

        var thisCTRL = this;

        this.profile = {};
        this.groupchats = {};
        this.population = {};


        this.loadProfile = function () {
            //Target user identifier
            var usrid = $routeParams.userid;
            console.log('Im inside users.js');
            //Url for target user information
            var url = "https://jechat-restapi.herokuapp.com/JEChat/" + usrid;
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

        this.loadUsers = function(){
          var url = "https://jechat-restapi.herokuapp.com/JEChat/Users"
          $http.get(url).then(
            function(response){
              console.log("info: " + JSON.stringify(response.data));
              thisCTRL.population = response.data.Users;
            },
            function(response){
              var status = response.status;
              if (status) {
                  alert("Something went wrong");
              }
            }
          );

        };

        this.loadProfile();
        this.loadUsers();
    }]);
