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

              $location.path( '/home' );
              window.location.reload();

          } )

          .error( function( error ) 
          {
            effectError();
          } );
      }

      else
      {
        effectError();
      }
  };

  /**
   * [effectError description]
   * @return {[type]} [description]
   */
  function effectError()
  {
    delete $scope.user;
              
    $( '#inputLogin' ).focus();
    
    $( '#login' ).effect( "bounce", "swith", function()
    {
        $( '#error-login' ).show( 'fade' );

        setTimeout( function() {
            $( '#error-login' ).hide( 'fade' );            
        }, 3000 );
    } );
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
          
          $location.path( '/home' );
          window.location.reload();
      } )

      .error( function( error ) 
      {
          Message.error( "Ocorreu um erro inesperado!", error );
      } );
  };

} ] );