(function () {

	'use strict';

 	angular.module('Strom').directive( 'myfile', [function () {
	
		return {
			restrict: 'E',
			require: '^form',
			replace: true,
			templateUrl: '/directives/html/myfile.html' ,
			scope : {
				label: '@',
				name: '@',
				model: '=',
				required: '@'
			},
			link: function ( scope, element, attributes, form ) {

				scope.form = form;


				function removeElement (argument) {

					var file = $(argument.toElement);

					scope.model = scope.model.filter(function (el) {
                     	return el.name !== file.attr('id');
                 	});

					if( scope.model.length == 0 )
					{
						scope.model = null;
					}

					scope.$apply();
                 	file.remove(); 
				}

				function handleFileSelect(evt) {

					$('#myfileslist').html('');
				    scope.model = null;
				    scope.$apply();
					
				    var files = evt.target.files;
				    for (var i = 0, f; f = files[i]; i++) 
				    {
				    	scope.model = [];
				      	var reader = new FileReader();

				        reader.addEventListener("loadend"  , loadEnd);
				        reader.addEventListener("loadstart", loadStart);

						function loadEnd(e) {
						  $('#loadstart').remove();
						}

						function loadStart(e) {
				  			var span = document.createElement('span');
			          		span.innerHTML = ['<i id="loadstart" class="fa fa-spinner fa-pulse fa-3x fa-fw icon-upload" ></i><span class="sr-only">Loading...</span>'].join('');
			          		document.getElementById('myfileslist').insertBefore(span, null);		
						}

				      	reader.onload = (function(theFile) {
				        	
				        	return function(e) {

				          		if( theFile.type.match('image.*') )
				          		{
				          			var span = document.createElement('span');
					          		span.innerHTML = ['<i class="fa fa-file-image-o icon-upload"  title="'+theFile.name+'" id="'+ theFile.name +'"></i>' ].join('');
					          		document.getElementById('myfileslist').insertBefore(span, null);
					          	}
					          	else if(theFile.type.match('application/pdf') )
					          	{
					          		var span = document.createElement('span');
					          		span.innerHTML = ['<i class="fa fa-file-pdf-o icon-upload"  title="'+theFile.name+'" id="'+ theFile.name +'"></i>' ].join('');
					          		document.getElementById('myfileslist').insertBefore(span, null);
								}	                    	
					          	else if(theFile.type.match('application/zip') )
					          	{
					          		var span = document.createElement('span');
					          		span.innerHTML = ['<i class="fa fa-file-pdf-o icon-upload"  title="'+theFile.name+'" id="'+ theFile.name +'"></i>' ].join('');
					          		document.getElementById('myfileslist').insertBefore(span, null);
					          	}	                    	
					          	else if(theFile.type.indexOf('sheet')  >= 0 )
					          	{	
					          		var span = document.createElement('span');
					          		span.innerHTML = ['<i class="fa fa-file-excel-o icon-upload"  title="'+theFile.name+'" id="'+ theFile.name +'"></i>' ].join('');
					          		document.getElementById('myfileslist').insertBefore(span, null);
					          	}	                    	
					          	else if(theFile.type.indexOf('document')   >= 0 )
					          	{
					          		var span = document.createElement('span');
					          		span.innerHTML = ['<i class="fa fa-file-word-o icon-upload"  title="'+theFile.name+'" id="'+ theFile.name +'"></i>' ].join('');
					          		document.getElementById('myfileslist').insertBefore(span, null);
					          	}	                    	
					          	else if(theFile.type.indexOf('text/plain') >= 0  )
					          	{
					          		var span = document.createElement('span');
					          		span.innerHTML = ['<i class="fa fa-file-text-o icon-upload"  title="'+theFile.name+'" id="'+ theFile.name +'"></i>' ].join('');
					          		document.getElementById('myfileslist').insertBefore(span, null);	
					          	}
					          	else if( theFile.type.match('video.*') )
					          	{
					          		var span = document.createElement('span');
					          		span.innerHTML = ['<i class="fa fa-file-video-o icon-upload"  title="'+theFile.name+'" id="'+ theFile.name +'"></i>' ].join('');
					          		document.getElementById('myfileslist').insertBefore(span, null);		
					          	}
					          	else
					          	{
					          		var span = document.createElement('span');
					          		span.innerHTML = ['<i class="fa fa-file-o icon-upload"  title="'+theFile.name+'" id="'+ theFile.name +'"></i>' ].join('');
					          		document.getElementById('myfileslist').insertBefore(span, null);		
					          	}

					          	document.getElementById(theFile.name).addEventListener('click', removeElement, false);
			                        
		                        scope.model.push({
                                    base64: e.target.result,
		                            name  : theFile.name,
                                    type  : theFile.type
		                        });


				      			if( i == files.length )
				      			{
				      				scope.$apply();
				      			}

				        	};

				      	})(f);

				      	reader.readAsDataURL(f);
				    }
				}

				document.getElementById('files').addEventListener('change', handleFileSelect, false);
			}
		}
	}]);
})();