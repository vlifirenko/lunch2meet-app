angular.module('starter.controllers', [])

.controller('ContentController', function($scope) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

.controller('MenuController', function ($scope, $ionicSideMenuDelegate, MenuService, $location) {
	// "MenuService" is a service returning mock data (services.js)
	$scope.list = MenuService.all();

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.goTo = function(page) {
		console.log('Going to ' + page);
		$ionicSideMenuDelegate.toggleLeft();
		$location.url('/' + page);
	};

	$scope.myMessages = 3;
	
	$scope.openChat = function(){
		$location.url('/my-chats');
	};
})

.controller('LoginController', function ($scope, $location, $http) {

	var token = localStorage.getItem('token');
	var url = 'http://localhost:8080/api?action=login&token=' + token;
	$http.get(url).
	  success(function(data) {
	  	if (typeof data == 'object') {
	    	$location.url('/profile');
	    }
	  }).
	error(function(data, status) {
	});

    $scope.auth = function(provider) {
		$location.url('/auth/' + provider);
	}
})

.controller('AuthController', function ($scope, $stateParams) {
	var provider = $stateParams.provider;
	window.location = 'http://localhost:8080/api?action=auth&provider=' + provider;
})

.controller('AuthCallbackController', function ($scope, $location, $stateParams) {
	var token = $stateParams.token;
	localStorage.setItem('token', token);
	$location.url('/profile');
})

.controller('ProfileController', function ($scope, $ionicSideMenuDelegate, $location, $http) {
	var token = localStorage.getItem('token');

    $scope.save = function() {
		$location.url('/main');
	}
	$scope.showMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	}
	$scope.profile = {};

	$scope.getUser = function() {
		var url = 'http://localhost:8080/api?action=get_my_profile&token=' + token;
		$http.get(url).
		  success(function(data) {
		    $scope.profile = data;
		  }).
		  error(function(data, status) {
		  });
	}
	$scope.getUser();
})

.controller('MainController', function ($scope, $ionicSideMenuDelegate, $location) {
	$scope.showMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	}
})

.controller('PeoplesController', function ($scope, $ionicSideMenuDelegate, $location, Peoples, $http, $timeout) {
	$scope.showMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	}

	$scope.showProfile = function(id) {
		$location.url('/show-profile');
	}

	$scope.peoples = [];
	$scope.interval = 500;
	$scope.getUsers = function() {
		if (!startsWith($location.$$path, '/peoples')) {
		  return;
		}

		var url = 'http://localhost:8080/api?action=get_users';
		$http.get(url).
		  success(function(data) {
		    $timeout($scope.getUsers, $scope.interval);
		    $scope.peoples = data;
		  }).
		  error(function(data, status) {
		    $timeout($scope.getUsers, $scope.interval);
		  });
	}
	$scope.getUsers();
})

.controller('ShowProfileController', function ($scope, Peoples, $stateParams, $location, $http) {
	$scope.profileId = $stateParams.profileId;

	$scope.favorite = function() {
		alert("set " + $stateParams.profileId + " favorite");
	}

	$scope.sendMessage = function() {
		$location.url('/messages/' + $stateParams.profileId);
	}

	$scope.profile = {};

	$scope.getUser = function() {
		if (!startsWith($location.$$path, '/show-profile')) {
		  return;
		}

		var url = 'http://localhost:8080/api?action=get_profile&id=' + $scope.profileId;
		$http.get(url).
		  success(function(data) {
		    $scope.profile = data;
		  }).
		  error(function(data, status) {
		  });
	}
	$scope.getUser();
})

.controller('PlacesController', function ($scope, $ionicSideMenuDelegate, $location, Places, $http, $timeout, $ionicLoading) {
	$scope.showMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	}

	$scope.places = [];
	$scope.interval = 500;
	$scope.getPlaces = function() {
		if (!startsWith($location.$$path, '/places')) {
		  return;
		}

		var url = 'http://localhost:8080/api?action=get_places';
		$http.get(url).
		  success(function(data) {
		    $timeout($scope.getPlaces, $scope.interval);
		    $scope.places = data;
		  }).
		  error(function(data, status) {
		    $timeout($scope.getPlaces, $scope.interval);
		  });
	}
	$scope.getPlaces();

	// map
	function initialize() {
		var mapOptions = {
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map"),
		  mapOptions);

		google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function (e) {
		  e.preventDefault();
		  return false;
		});

		$scope.map = map;
		centerOnMe();
	}

	function centerOnMe() {
		if (!$scope.map) {
		  return;
		}

		$scope.loading = $ionicLoading.show({
		  content: 'Getting current location...',
		  showBackdrop: false
		});

		navigator.geolocation.getCurrentPosition(function (pos) {
		  $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		  $scope.loading.hide();
		  for (var i = 0; i < $scope.places.length; i++) {
		  	var contentString = $scope.places[i].place.name;
		  	var infowindow = new google.maps.InfoWindow({
			    content: contentString
			});
		    var marker = new google.maps.Marker({
		      position: new google.maps.LatLng($scope.places[i].place.location[0], $scope.places[i].place.location[1]),
		      map: $scope.map
		  	});
		  	google.maps.event.addListener(marker, 'click', function() {
    			infowindow.open($scope.map,marker);
			});
		  }

		}, function (error) {
		  alert('Unable to get location: ' + error.message);
		});
	}

	$scope.tabRefresh = function() {
		setTimeout(initialize);
	}
})

.controller('ShowPlaceController', function ($scope, Places, $stateParams, $http, $timeout, $location, $ionicLoading) {

	$scope.place = [];
	$scope.interval = 500;
	$scope.getPlaces = function() {
		if (!startsWith($location.$$path, '/show-place')) {
		  return;
		}

		var url = 'http://localhost:8080/api?action=get_place&place=' + $stateParams.placeId;
		$http.get(url).
		  success(function(data) {
		    $timeout($scope.getPlaces, $scope.interval);
		    $scope.place = data;
		  }).
		  error(function(data, status) {
		    $timeout($scope.getPlaces, $scope.interval);
		  });
	}
	$scope.getPlaces();

	$scope.favorite = function() {
		alert("set " + $stateParams.placeId + " favorite");
	}

	// map
	function initialize2() {
		var mapOptions = {
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map"),
		  mapOptions);

		google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function (e) {
		  e.preventDefault();
		  return false;
		});

		$scope.map = map;
		centerOnMe2();
	}

	function centerOnMe2() {
		if (!$scope.map) {
		  return;
		}

		$scope.loading = $ionicLoading.show({
		  content: 'Getting current location...',
		  showBackdrop: false
		});

		navigator.geolocation.getCurrentPosition(function (pos) {
		  $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		  $scope.loading.hide();
		  var contentString = $scope.place.name;
	  	  var infowindow = new google.maps.InfoWindow({
		    content: contentString
		  });
		  var marker = new google.maps.Marker({
		      position: new google.maps.LatLng($scope.place.location[0], $scope.place.location[1]),
		      map: $scope.map
		  });
		  google.maps.event.addListener(marker, 'click', function() {
    	      infowindow.open($scope.map,marker);
		  });

		}, function (error) {
		  alert('Unable to get location: ' + error.message);
		});
	}

	initialize2();
	$scope.centerOnMe = centerOnMe2;
})

.controller('MessagesController', function ($scope, Messages, Peoples, $stateParams, $http, $location, $timeout) {

	$scope.user = {};
	$scope.messages = [];

	extendScopeWithChat($scope, $http);
	$scope.reciever = $stateParams.recipientId;

	var url = 'http://localhost:8080/api?action=get_profile&id=' + encodeURI($stateParams.id);
		$http.get(url).success(function(data) {
		$scope.user = data;
	});


	$scope.lastTimestamp = 0;
	$scope.interval = 500;
	$scope.getDialog = function() {
		if (!startsWith($location.$$path, '/messages')) {
		  return;
		}

		var token = localStorage.getItem('token');
		var url = 'http://localhost:8080/api?action=get_dialog&since='     + encodeURI($scope.lastTimestamp)
		                              + '&reciever='  + encodeURI($stateParams.recipientId)
		                              + '&latitude='  + encodeURI($scope.latitude)
		                              + '&longitude=' + encodeURI($scope.longitude)
		                              + '&token='     + encodeURI(token);
		$http.get(url).
		  success(function(data) {
		  $scope.messages = [];
		  $scope.messages =  $scope.messages.concat(data);
		  /*
		  if ($scope.messages.length > 0)
		      $scope.lastTimestamp = $scope.messages[$scope.messages.length - 1].message.timestamp;
		    window.scrollTo(0, document.body.scrollHeight);
		    */
		    $timeout($scope.getDialog, $scope.interval);
		  }).
		  error(function(data, status) {
		    $timeout($scope.getDialog, $scope.interval);
		  });
	}
	$scope.getDialog();
})


.controller('GeneralChatController', function ($scope, Messages, Peoples, $stateParams, $http, $location, $timeout) {
	$scope.messages = [];

	extendScopeWithChat($scope, $http);

	$scope.showMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	}

	$scope.recipients = Messages.recipients();
	$scope.peoples = Peoples.arr($scope.recipients);

	$scope.lastTimestamp = 0;
  	$scope.interval = 300;
  	$scope.getMessages = function() {
    	if (!startsWith($location.$$path, '/general-chat')) {
    		return;
    	}

    	var token = localStorage.getItem('token');

	    var url = 'http://localhost:8080/api?action=get_messages&since='     + encodeURI($scope.lastTimestamp)
	                                    + '&latitude='  + encodeURI($scope.latitude)
	                                    + '&longitude=' + encodeURI($scope.longitude)
	                                    + '&token=' + encodeURI(token);
	    $http.get(url).success(function(data) {
	    	$scope.messages = [];
			$scope.messages =  $scope.messages.concat(data);
			/*
			if ($scope.messages.length > 0)
				$scope.lastTimestamp = $scope.messages[$scope.messages.length - 1].message.timestamp;*/
			window.scrollTo(0, document.body.scrollHeight);
	        $timeout($scope.getMessages, $scope.interval);
		}).
	    error(function(data, status) {
			$timeout($scope.getMessages, $scope.interval);
		});
  	}
	$scope.getMessages();
/*
	$scope.dialogs_count = 0;
	$scope.getDialogsCount = function(){
		if (!startsWith($location.$$path, '/general-chat')) {
			return;
		}

		var url = 'http://localhost:8080/api?action=get_dialogs_count';
		$http.get(url).success(function(data) {
			$scope.dialogs_count = data.count;
			$timeout($scope.getDialogsCount, $scope.interval);
		}).
		error(function(data, status) {
			$timeout($scope.getDialogsCount, $scope.interval);
		});
	}
	$scope.getDialogsCount();*/
})

.controller('MyChatsController', function ($scope, $ionicSideMenuDelegate, $location, Peoples, Messages, $http, $timeout) {
	$scope.showMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	}
	/*
	$scope.recipients = Messages.recipients();
	$scope.peoples = Peoples.arr($scope.recipients);
	*/

	$scope.messages = [];
	$scope.interval = 500;
	$scope.getDialogs = function() {
	if (!startsWith($location.$$path, '/my-chats')) {
	  return;
	}

	var token = localStorage.getItem('token');

	var url = 'http://localhost:8080/api?action=get_dialogs&token=' + token;
	$http.get(url).
	  success(function(data) {
	  $scope.messages = data;
	    $timeout($scope.getDialogs, $scope.interval);
	  }).
	  error(function(data, status) {
	    $timeout($scope.getDialogs, $scope.interval);
	  });
	}
	$scope.getDialogs();
})
;

function extendScopeWithChat($scope, $http) {
  $scope.text = '';
  $scope.reciever = '2';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(SetLocation);
  }

  function SetLocation(location) {
    $scope.latitude  = location.coords.latitude;
    $scope.longitude = location.coords.longitude;
  }

  $scope.send = function() {
    if ($scope.message.text.length == 0)
      return;

    var token = localStorage.getItem('token');

    var url = 'http://localhost:8080/api?action=send_message&text=' + encodeURI($scope.message.text)
                                    + '&latitude='  + encodeURI($scope.latitude)
                                    + '&longitude=' + encodeURI($scope.longitude)
                                    + '&reciever='  + encodeURI($scope.reciever)
                                    + '&token=' + encodeURI(token);
    $http.get(url).success(function(data) {
      $scope.text = '';
      $scope.message.text = '';
    });
  }
}

function startsWith(str1, str2) {
  return str1.slice(0, str2.length) == str2;
}