angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff', text: 'Scruff McGruff about'},
    { id: 1, name: 'G.I. Joe', text: 'G.I. Joe about' },
    { id: 2, name: 'Miss Frizzle', text: 'Miss Frizzle about' },
    { id: 3, name: 'Ash Ketchum', text: 'Ash Ketchum about' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
