angular.module('JEChat').controller('GroupController', ['$http', '$log', '$scope', '$routeParams',
    function ($http, $log, $scope, $routeParams) {

        var thisCtrl = this;

        this.groupchats = {};


        this.loadUserGroups = function () {
            var user = $routeParams.uid;
            var reqUrl = "http://localhost:4545/JEChat/" + user + "/GroupChats";
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

        this.loadUserGroups();
    }]);
