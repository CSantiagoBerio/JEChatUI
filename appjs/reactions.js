angular.module('JEChat').controller('ReactionsController', ['$http', '$log', '$scope', '$routeParams', '$location',
function($http, $log, $scope, $routeParams, $location, ChatController) {

  thisCtrl = this;
  this.like = [];
  this.dislike = [];
  this.reply = [];

  $scope.likelist = function(){
    var groupname = $routeParams.groupname;
    var mid = $routeParams.mid;
    var url = "http://jechat-restapi.herokuapp.com/JEChat/"+groupname+"/Messages/"+mid+"/likes";
    var form = {'groupname': groupname, 'mid': mid}

    $http.get(url).then(
      function(response){
        console.log(response.data);
        thisCtrl.like = response.data.Message;
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
  };

  $scope.dislikelist = function(){
    var groupname = $routeParams.groupname;
    var mid = $routeParams.mid;
    var url = "http://jechat-restapi.herokuapp.com/JEChat/"+groupname+"/Messages/"+mid+"/dislikes";
    var form = {'groupname': groupname, 'mid': mid}

    $http.get(url).then(
      function(response){
        console.log(response.data);
        thisCtrl.dislike = response.data.Message;
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
  };

  $scope.replylist = function(){
    var groupname = $routeParams.groupname;
    var mid = $routeParams.mid;
    var url = "http://jechat-restapi.herokuapp.com/JEChat/"+groupname+"/Messages/"+mid+"/replies";
    var form = {'groupname': groupname, 'mid': mid}

    $http.get(url).then(
      function(response){
        console.log(response.data);
        thisCtrl.reply = response.data.Replies;
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
  };

  $scope.goback = function(){
    window.history.back();
  }

  $scope.likelist();
  $scope.dislikelist();
  $scope.replylist();
}]);
