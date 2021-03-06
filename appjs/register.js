angular.module('JEChat').controller('RegisterController', ['$scope', '$http', '$routeParams', '$location',
function($scope, $http, $routeParams, $location) {

  thisCtrl = this;
  $scope.registerForm = {};
  $scope.repassword;
  $scope.listOfUsers = [];

  console.log('Inside register.js');

  $scope.register = function(){
      var form = $scope.registerForm;
      console.log(form);
      var url = "https://jechat-restapi.herokuapp.com/JEChat/register"
      var reqUrl = "https://jechat-restapi.herokuapp.com/JEChat/Users/"+$scope.registerForm.username;
      console.log(reqUrl);

      $http.get(reqUrl).then(
        function(response){
          console.log(response.data);
          if (response.data.Users.username == $scope.registerForm.username) {
            window.confirm('Username already exists')
            $scope.registerForm.username = [];
          }
        }
      );

      if(form.password == $scope.repassword){
        console.log("True")
        $http.post(url, form).then(
          //success
          function(response){
            console.log(response.data.User);
            $location.path('JEChat/login');
          },
          //console.error();
          function(response){
            var status = response.status;

          }
        )
      }else{
        alert('Passwords don\'t match')
      }
      $http.post(url, form).then(
        //success
        function(response){
          console.log(response.data.User);
        }
      )

      $scope.registerForm = {}

  };

  $scope.signin = function(){
    $location.path('/JEChat/login')
  }




}]);
