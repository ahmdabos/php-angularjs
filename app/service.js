app.factory('Data', function($http, $q, Config) {
    return{
		get : function (url) {
			var deferred = $q.defer();
			return $http.get(Config.URL+url)
			.then(function (response) {
					deferred.resolve(response.data);
				}, function (response) {
					deferred.reject(response);
				});
			return deferred.promise;
		},
		send: function(data, url){
			var deferred = $q.defer();
           return $http({
              method: 'POST',
              url: Config.URL+url,
              data: data
            })
            .then(function (response) {
				deferred.resolve(response);
				}, function (response) {
					deferred.reject(response);
				});
			return deferred.promise;
      }
	}
});

