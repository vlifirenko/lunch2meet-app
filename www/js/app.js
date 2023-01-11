// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
        if (i>=10)
            input.push(i);
        else
            input.push("0"+ i);
    return input;
  };
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  delete $httpProvider.defaults.headers.post['Content-Type'];

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

		.state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'templates/login.html'
        })

        .state('callback', {
            url: '/callback',
            controller: 'CallbackController',
            templateUrl: 'templates/callback.html'
        })

        .state('auth', {
            url: '/auth/:provider',
            controller: 'AuthController',
            templateUrl: 'templates/auth.html'
        })
		
		.state('auth-callback', {
            url: '/auth-callback/:token',
            controller: 'AuthCallbackController',
            templateUrl: 'templates/auth-callback.html'
        })
		
		.state('profile', {
            url: '/profile',
            controller: 'ProfileController',
            templateUrl: 'templates/profile.html'
        })
		
		.state('main', {
            url: '/main',
            controller: 'MainController',
            templateUrl: 'templates/main.html'
        })

        .state('peoples', {
            url: '/peoples',
            controller: 'PeoplesController',
            templateUrl: 'templates/peoples.html'
        })

        .state('show-profile', {
            url: '/show-profile/:profileId',
            controller: 'ShowProfileController',
            templateUrl: 'templates/show-profile.html'
        })

        .state('places', {
            url: '/places',
            controller: 'PlacesController',
            templateUrl: 'templates/places.html'
        })

        .state('show-place', {
            url: '/show-place/:placeId',
            controller: 'ShowPlaceController',
            templateUrl: 'templates/show-place.html'
        })

        .state('messages', {
            url: '/messages/:recipientId',
            controller: 'MessagesController',
            templateUrl: 'templates/messages.html'
        })

        .state('general-chat', {
            url: '/general-chat',
            controller: 'GeneralChatController',
            templateUrl: 'templates/general-chat.html'
        })

        .state('my-chats', {
            url: '/my-chats',
            controller: 'MyChatsController',
            templateUrl: 'templates/my-chats.html'
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});

