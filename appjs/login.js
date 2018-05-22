angular.module('JEChat').controller('LogController', ['$scope', '$location', '$http', '$routeParams',
  function ($scope, $location, $http, $routeParams) {

    thisCtrl = this;
    $scope.loginForm = {}

    console.log('Inside login.js');

    $scope.login = function(){

      var form =  $scope.loginForm

      console.log('Im inside login.js');
      console.log(form);

      var url = 'https://jechat-restapi.herokuapp.com/JEChat/login';
      $http.post(url, form).then(
        //success function
        function(response) {
          if (!angular.isUndefined(response.data.User)){
            console.log(JSON.stringify(response.data));
            $location.path('/JEChat/' + response.data.User.usrid);
          }else {
            console.log(response.data.ERROR);
            alert(response.data.ERROR);
          }
          $scope.loginForm = {}

        },
        //error function
        function(response) {
          var status  = response.status;
          if (status) {
            console.log(status);
          }
        }
      )

    }

    $scope.signup = function(){
      $location.path('/JEChat/register');
    }

}]);
