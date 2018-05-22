angular.module('JEChat').controller('ChatController', ['$http', '$log', '$scope', '$routeParams',
    function($http, $log, $scope, $routeParams) {

        var thisCtrl = this;

        this.messageList = [];
        this.reactions = {};
        this.user = {};
        this.counter = 0;

        this.loadMessages = function(){

            var user = $routeParams.user;
            var group = $routeParams.groupname;

            console.log('Im inside chat.js');
            //URL for Messages
            var url = "https://jechat-restapi.herokuapp.com/JEChat/"+user+"/GroupChats/"+group;
            console.log("url: " + url)

            $http.get(url).then(
              //Success Function
              function(response){

                console.log("info: " + JSON.stringify(response.data));
                thisCtrl.messageList = response.data.Groupchats;

              },
              //Error function
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

        };



        this.postMsg = function(){
            var msg = thisCtrl.newText;
            var user = $routeParams.user;
            var nextId = thisCtrl.counter++;
            var url = "https://jechat-restapi.herokuapp.com/JEChat/"+user+"/GroupChats/"+$routeParams.groupname;
            var author;

            console.log(url);

            // $http.get(url).then(
            //   //Success Function
            //   function(response){
            //
            //     console.log("info: " + JSON.stringify(response.data));
            //     thisCtrl.user = response.data.User;
            //     author = thisCtrl.user.firstname + " " + thisCtrl.user.lastname;
            //
            //     if(thisCtrl.messageList.length == 0) {nextId=0;};
            //     console.log(nextId);
            //     thisCtrl.messageList.unshift({"id": nextId, "content" : msg, "name" : author, "like" : 0, "nolike" : 0});
            //     thisCtrl.newText = "";
            //
            //   },
            //   //Error function
            //   function(response){
            //     var status = response.status;
            //     if (status == 0) {
            //         alert("No hay conexion a Internet");
            //     }
            //     else if (status == 401) {
            //         alert("Su sesion expiro. Conectese de nuevo.");
            //     }
            //     else if (status == 403) {
            //         alert("No esta autorizado a usar el sistema.");
            //     }
            //     else if (status == 404) {
            //         alert("No se encontro la informacion solicitada.");
            //     }
            //     else {
            //         alert("Error interno del sistema.");
            //     }
            //   }
            // );

            // thisCtrl.messageList.unshift({"id": nextId, "content" : msg, "name" : author, "like" : 0, "nolike" : 0});
            // thisCtrl.newText = "";
        };

        this.loadMessages();
}]);
