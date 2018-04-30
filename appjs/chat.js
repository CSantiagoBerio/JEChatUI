angular.module('JEChat').controller('ChatController', ['$http', '$log', '$scope', '$routeParams',
    function($http, $log, $scope, $routeParams) {

        var thisCtrl = this;

        this.messageList = {};

        this.loadMessages = function(){

            var user = $routeParams.user;
            var group = $routeParams.groupname;

            console.log('Im inside chat.js');
            //URL for Messages
            var url = "http://localhost:4545/JEChat/"+user+"/GroupChats/"+group;
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


              console.log(thisCtrl.messageList);

            var url_a = "http://127.0.0.1:4545/JEChat/Messages/"+    +"/likes&dislikes";


        };

        this.loadReactions = function(){

          var user = $routeParams.user;
          var group = $routeParams.groupname;
          var url_a = "http://localhost:4545/JEChat/"+user+"/GroupChats/"+group+"/6/likes";
          console.log("url: " + url_a);




        };

        this.postMsg = function(){
            var msg = thisCtrl.newText;
            // Need to figure out who I am
            var author = $routeParams.user;
            var nextId = thisCtrl.counter++;
            thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
            thisCtrl.newText = "";
        };

        this.loadMessages();
        this.loadReactions();
}]);
