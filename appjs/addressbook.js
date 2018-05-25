angular.module('JEChat').controller('ContactController', ['$scope', '$http', '$location', '$routeParams',
function($scope, $http, $location, $routeParams){

  thisCtrl = this;
  this.addressbook = [];

  this.contactbook = function(){
    var user = $routeParams.userid;
    var url = 'http://jechat-restapi.herokuapp.com/JEChat/'+user+'/ContactList';

    console.log(url);

    $http.get(url).then(
      function(response){
        console.log(JSON.stringify(response.data));
        thisCtrl.addressbook = response.data.Contacts;
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


  this.contactbook();
}]);
