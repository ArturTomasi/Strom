angular.module( 'Strom' ).directive('inspector', [ function () 
{
	var Inspector = {};

	Inspector.restrict = 'E';

	Inspector.replace = true;

	Inspector.templateUrl = 'directives/html/Inspect.html';

	return Inspector;
} ] );