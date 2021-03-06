angular.module('JEChat').controller('ChatController', ['$http', '$log', '$scope', '$routeParams', '$location',
function($http, $log, $scope, $routeParams, $location) {

  var thisCtrl = this;

  this.messageList = [];
  this.reactions = {};
  this.user = {};
  this.counter = 0;
  this.replyText = [];
  $scope.text;
  this.likes = [];
  $scope.credentials;

  $scope.loadMessages = function(){

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
    var form = {'content':msg}

    console.log(url);

    $http.post(url, form).then(
      function(response){
        console.log(JSON.stringify(response.data));
        $scope.loadMessages();
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

    this.newText = [];

  };

  $scope.like = function(messageid){
    var groupname = $routeParams.groupname;
    var user = $routeParams.user;
    var mid = messageid;
    var url = "http://jechat-restapi.herokuapp.com/JEChat/"+groupname+"/Messages/"+mid+"/likes";
    console.log(url +'\n  userid: '+user+'   mid: '+mid);
    var form = {'user': user, 'mid': mid}

    $http.post(url, form).then(
      function(response){
        console.log(response.data);
        $scope.loadMessages();
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

  $scope.dislike = function(messageid){
    var groupname = $routeParams.groupname;
    var user = $routeParams.user;
    var mid = messageid;
    var url = "http://jechat-restapi.herokuapp.com/JEChat/"+groupname+"/Messages/"+mid+"/dislikes";
    console.log(url +'\n  userid: '+user+'   mid: '+mid);
    var form = {'user': user, 'mid': mid}

    $http.post(url, form).then(
      function(response){
        console.log(response.data);
        $scope.loadMessages();
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

  $scope.reply = function(messageid){
    var url = "http://jechat-restapi.herokuapp.com/JEChat/"+$routeParams.groupname+"/Messages/"+messageid+"/replies";
    console.log(url);
    var form = {'user': $routeParams.user, 'mid': messageid, 'groupname': $routeParams.groupname, 'content': thisCtrl.replyText[0]}
    console.log(form);

    $http.post(url, form).then(
      function(response){
        console.log(response.data);
        $scope.loadMessages();
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
    thisCtrl.replyText = [];
    $scope.text = [];
  };

  $scope.pushToArray = function(data){
    thisCtrl.replyText.push(data);
    $scope.text = [];
  };

  $scope.goback = function(){
    window.history.back();
  };

  $scope.getList = function(messageid){
    $location.path('JEChat/'+$routeParams.groupname+'/'+messageid+'/reactions')
  }

  $scope.addMember = function(credentials){
    var url = "http://jechat-restapi.herokuapp.com/JEChat/GroupChats/Members";
    var form = {'groupname': $routeParams.groupname, 'credential': credentials};
    console.log(url);
    console.log(form);

    $http.post(url, form).then(
      function(response){
        console.log(response.data);
      }
    )

  }

  $scope.loadMessages();
}]);
