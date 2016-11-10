angular.module("Strom").controller("AuthController", ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService ) {

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

        setTimeout( function()
        {
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
      $location.path( '/home' );

      window.location.reload();

      $http.post( '/logout/', {} )

      .success( function()
      {
          Session.clear();
      } )

      .error( function( error )
      {
          Message.error( "Ocorreu um erro inesperado!", error );
      } );
  };

  $scope.showAnnotation = function()
  {
      var _annotation = $( '#annotationDiv' );

      UserService.getAnnotation( function( annotation )
      {
          _annotation.children( 'textarea' ).val( annotation );

          _annotation.show();
      } );
  };

  $scope.showCalculator = function()
  {
      $( '.calculator' ).show();
  };

  $scope.isOperator = function()
  {
      if ( ! Session.get( 'ActiveUser' ) ) return true;

      if ( Session.get( 'ActiveUser').role === 'Operador' ) return true;

      return false;
  }

  function init()
  {
      var _annotation = $( '#annotationDiv' );

      _annotation.draggable();

      _annotation.resizable();

      _annotation.children( 'button' ).on( 'click', function()
      {
          _annotation.hide( function()
          {
              UserService.saveAnnotation(  _annotation.children( 'textarea' ).val(), function(){} );
          });
      } );
  }

  init();

} ] );
