angular.module('JEChat').controller('GroupController', ['$http', '$log', '$scope', '$routeParams', '$location', '$timeout',
    function ($http, $log, $scope, $routeParams, $location, $timeout) {

        var thisCtrl = this;

        this.groupchats = {};
        $scope.namegroup;


        $scope.loadUserGroups = function () {
            var user = $routeParams.uid;
            var reqUrl = "https://jechat-restapi.herokuapp.com/JEChat/" + user + "/GroupChats";
            console.log('Im inside groupchat.js');
            console.log("url: " + reqUrl);

            $http.get(reqUrl).then(
                //Success function
                function (response) {
                    console.log("info: " + JSON.stringify(response.data));
                    thisCtrl.groupchats = response.data.Groupchats;
                },
                //Error Function
                function (response) {
                    var status = response.status;
                    if (status == 0) {
                        alert("No hay conexion a Internet");
                    }
                    else if (status == 401) {
                        alert("Su sesion expiro. Conectese de nuevo.");
                    }
                    else if (status == 403) {
                        alert("No esta autorizado a usar el sistema.");
                    }
                    else if (status == 404) {
                        alert("No se encontro la informacion solicitada.");
                    }
                    else {
                        alert("Error interno del sistema.");
                    }
                });
        };

        this.entergroup = function(groupname){
          var user = $routeParams.uid;

          $location.url('/JEChat/'+user+'/Groupchats/'+groupname);

        }

        $scope.newgroup = function(){
          var user = $routeParams.uid;
          var url = "https://jechat-restapi.herokuapp.com/JEChat/" + user + "/GroupChats"
          var form = {'groupname': $scope.namegroup};
          console.log(form);

          $http.post(url, form).then(
            function(response){
              console.log(JSON.stringify(response.data));
              $scope.loadUserGroups();
            },
            function(response){
              var status = response.status;
              if (status == 0) {
                  alert("No hay conexion a Internet");
              }
              else if (status == 401) {
                  alert("Su sesion expiro. Conectese de nuevo.");
              }
              else if (status == 403) {
                  alert("No esta autorizado a usar el sistema.");
              }
              else if (status == 404) {
                  alert("No se encontro la informacion solicitada.");
              }
              else {
                  alert("Error interno del sistema.");
              }
            }
          );
          $scope.namegroup = null;

        };


        // $scope.intervalFunction = function(){
        //   $timeout(function(){
        //     $scope.loadUserGroups();
        //     $scope.intervalFunction();
        //   }, 3000)
        // };

        // $scope.intervalFunction();

        $scope.loadUserGroups();
    }]);
