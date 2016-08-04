angular.module("Strom").controller("AuthController", ['$scope', '$http', '$location', function($scope, $http, $location) {
  /**
   * @param  {[type]}
   * @return {[type]}
   */
  $scope.login = function(user) {
    $http.post('/login/', user)

    .success(function() {
      window.location = '/#/posting';
      window.location.reload();
    })

    .error(function(error) {
      Message.error("Acesso Negado", error);
    });
  };

}]);