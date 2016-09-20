angular.module("Strom").controller("AuthController", ['$scope', '$http', '$location', function($scope, $http, $location) {
  
  /**
   * [login description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  $scope.login = function( user ) 
  {
      if ( user && user.username && user.password )
      {
          $http.post( '/login/', user )

          .success( function( user ) 
          {
              Session.put( 'ActiveUser', user );

              $location.path( '/posting' );
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

  /**
   * [logout description]
   * @return {[type]} [description]
   */
  $scope.logout = function()
  {
      $http.post( '/logout/', {} )

      .success( function() 
      {
          Session.clear();

          $location.path( '/' );
          window.location.reload();
      } )

      .error( function( error ) 
      {
          Message.error( "Ocorreu um erro inesperado!", error );
      } );
  };

} ] );