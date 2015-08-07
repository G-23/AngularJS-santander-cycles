(function(){
	var cyclesApp = angular.module('cycles', []);

	cyclesApp.service('GeoLocation', function($q) {
		var geocoder = new google.maps.Geocoder();

		this.requestLocation = function(address) {
			var deferred = $q.defer();

			geocoder.geocode( { 'address': address}, function(result, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					deferred.resolve(result[0], status);
				} else {
					deferred.resolve(result[0], status);
				}
			});

			return deferred.promise;
		};
	});

	cyclesApp.service('Cycles', function(GeoLocation, $http, $q) {
		this.getBikes = function(data) {
			var deferred = $q.defer();

			$http.get('https://api.tfl.gov.uk/BikePoint?lat=' + data.geometry.location.G + '&lon=' + data.geometry.location.K + '&radius=2000&app_id=53f9784a&app_key=acacc3e2c79c8bf49bf9315e6e8dec5f ')
			.then(function(result) {
				deferred.resolve(result);
			});

			return deferred.promise;
		};
	});

	cyclesApp.controller('cyclesController', function($scope, GeoLocation, Cycles) {
		$scope.messages = {
			invalidAddress: false,
			noResults: false
		};

		$scope.findBikes = function() {
			$scope.bikes = [];

			GeoLocation.requestLocation($scope.address)
			.then(function(data){
				if(data == undefined) {
					$scope.messages.invalidAddress = true;
					$scope.messages.noResults = false;
				} else {
					Cycles.getBikes(data)
					.then(function(result){
						if(result.data.places.length > 0) {
							$scope.fetchResults(result.data);
							$scope.messages.noResults = false;
						} else {
							$scope.messages.noResults = true;
						}
					});
					$scope.messages.invalidAddress = false;
				}
			}, function() {
				alert('Sorry there was an error in your request, please try again in few minutes.');
			});
		};

		$scope.fetchResults = function(data) {

			angular.forEach(data.places, function(place) {
				$scope.bikes.push( {
					name: place.commonName,
					distance: (Math.round(place.distance) *0.000621371192).toFixed(2),
					availableBikes: place.additionalProperties[6].value,
					emptyDocks: place.additionalProperties[7].value
				});
			});
		};
	});	
})();
