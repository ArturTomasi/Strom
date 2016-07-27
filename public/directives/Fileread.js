angular.module( 'Strom' ).directive( "fileread", [ function () 
{
    var Filereader = {};
    
    Filereader.scope = 
    {
        fileread: "="
    };
    
    Filereader.link = function ( scope, element, attributes )
    {
        element.bind( "change", function (changeEvent )
        {
            var file = changeEvent.target.files[ 0 ];

            if ( file && file.name )
            {
                scope.name = file.name;
                scope.type = file.type;
                 
                var reader = new FileReader();
              
                reader.onload = function ( loadEvent ) 
                {
                    scope.$apply(function () 
                    {
                        if ( ! scope.fileread )
                        {
                            scope.fileread = [];    
                        }

                        scope.fileread.push(
                        {
                            name : scope.name,
                            type : scope.type,
                            base64: loadEvent.target.result
                        } );

                    } );
                }

                reader.readAsDataURL( changeEvent.target.files[ 0 ] );
            }

        } );
    };

    return Filereader;
} ] );