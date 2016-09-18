angular.module("Strom").controller("AuthController", ['$scope', '$http', '$location', function($scope, $http, $location) {
  /**
   * @param  {[type]}
   * @return {[type]}
   */
  $scope.login = function( user ) 
  {
      if ( user && user.username && user.password )
      {
          $http.post( '/login/', user )

          .success( function() 
          {
              $location.path( '/#/posting' );
              window.location.reload();
          } )

          .error( function( error ) 
          {
              Message.error( "Acesso Negado", error );
          } );
      }

      else
      {
        Message.alert( "Preencha todos os campos!" );
      }
  };

} ] );