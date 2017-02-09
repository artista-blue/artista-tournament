function loading (flag) {
    if (flag === true) {
	$('#loading').show();	    
    } else {
	$('#loading').hide();
    }
}

// REST APIs
app.factory('Players', ['$resource', function($resource) {
    return $resource('/api/v1/players');
}]);

app.factory('Events', ['$resource', function($resource) {
    return $resource('/api/v1/events');
}]);

// Directives



// Filters

app.filter('TimeStamp', function () {
    return function (input) {
	var m = moment(input / 1000).subtract(9, 'hours');
	return m.format('YYYY-MM-DD HH:mm:ss');
    };
});

app.filter('stacked', function () {
	return function (input) {
	    return input ? 'To line chart' : 'To stacked area chart';
	};
});

app.filter('NL', function() {
    return function(input) {
	return input.replace(/\\n/g, '\n');
    };
});

app.filter('SHOW_HIDE', function() {
    return function(input) {
	return input ? 'show' : 'hide';
    };
});

app.filter('highlight', function($sce) {
    return function(text, phrase) {
	if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
					'<span class="highlighted" style="background: #ffb7b7">$1</span>');
	return $sce.trustAsHtml(text);
    };
});

//

app.factory('LoadingInterceptor', function($q) {
    var count = 0;

    var showLoading = function () {
	$('#loading').show();
	count++;
    };
    
    var hideLoading = function () {
	count--;
	if (count <= 0) {
	    $('#loading').hide();
	}
    };

    var isThrough = function (url) {
	var urls = [
	    "/api/v1/anomalies"
	];
	if (urls.indexOf(url) >= 0) {
	    return true;
	}
	return false;
    };
    
    return {
	request: function(config) {
	    if (isThrough(config.url)) {
		return config
	    }
	    showLoading();
	    return config;
	},
	requestError: function(rejection) {
	    hideLoading();
	    return $q.reject(rejection);
	},
	response: function(response) {
	    hideLoading();
	    return response;
	},
	responseError: function(rejection) {
	    hideLoading();
	    return $q.reject(rejection);
	}
    };
});

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
});
