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
})

.factory('Peoples', function() {
  
  var peoples = [
    { id: 0, name: 'Николай Рыжаков', profession: 'Психолог-программист', favorite: false, distance: "0.9 км", time: "обедаю в 13:00"},
    { id: 1, name: 'Ольга Кулешова', profession: 'Маркетолог', favorite: false, distance: "1 км", time: "обедаю в 14:00"},
    { id: 2, name: 'Иван Вырвинога-Ив', profession: 'Исследователь-физиолог-каратист', favorite: true, distance: "0.1 км", time: "обедаю в 12:34"},
    { id: 3, name: 'Алексей Брин', profession: 'Интересуюсь всем подряд, строительство, бальные та', favorite: false, distance: "0.1 км", time: "обедаю в 15:00"}
  ];

  return {
    all: function() {
      return peoples;
    },
    get: function(peopleId) {
      return peoples[peopleId];
    },
    recent: function() {
      var returnArr = [];
      for (var i = 0; i < peoples.length; i++) {
        if (i<2)
          returnArr.push(peoples[i]);
      }
      return returnArr;
    },
    favorite: function() {
      var returnArr = [];
      for (var i = 0; i < peoples.length; i++) {
        if (peoples[i].favorite == true)
          returnArr.push(peoples[i]);
      }
      return returnArr;
    },
    arr: function(arr) {
      var returnArr = [];
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < peoples.length; j++) {
          if (arr[i] == peoples[j].id)
            returnArr.push(peoples[j]);
        }  
      }
      return returnArr;
    }
  }
})

.factory('Places', function() {
  
  var places = [
    { id: 0, name: 'Столовая №1', businessLunch: '100 р.', businessLunchTime: '12:00 - 16:00', averageCheck: "200 р.", favorite: false, distance: "0.9 км", lat: 20.0, lon: 20.0, specialHeader: "", specialText: "", avatar: "", address: "Невский проспект, д.123", link: "http://stolovayanomerodin.ru"},
    { id: 1, name: 'Столовая №2', businessLunch: '110 р.', businessLunchTime: '11:00 - 12:00', averageCheck: "210 р.", favorite: false, distance: "1 км", lat: 20.0, lon: 20.0, specialHeader: "Супер предложение! 499р.", specialText: "Купи пять беляшей и собери кошку!", avatar: "", address: "Невский проспект, д.111", link: "http://stolovayanomerodva.ru"},
    { id: 2, name: 'Суши-шор "Шоп я так жил!"', businessLunch: '200 р.', businessLunchTime: '10:00 - 13:00', averageCheck: "500 р.", favorite: true, distance: "0.1 км", lat: 20.0, lon: 20.0, specialHeader: "", specialText: "", avatar: "", address: "Невский проспект, д.222", link: "http://sitesitesite.ru"}
  ];

  return {
    all: function() {
      return places;
    },
    get: function(placeId) {
      return places[placeId];
    }
  }
})

.factory('Messages', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var messages = [
    { id: 0, recipient: 0, isMyMessage: true, text: 'Николай, а не отобедать ли нам с Вами и не обсудить ли психологические проблемы программирования?', time: "12:45 10.03.2014", isRead: true},
    { id: 1, recipient: 0, isMyMessage: false, text: 'otvet', time: "12:46 10.03.2014", isRead: false},
    { id: 2, recipient: 1, isMyMessage: true, text: 'Николай, а не отобедать ли нам с Вами и не обсудить ли психологические проблемы программирования?', time: "12:47 10.03.2014", isRead: true},
    { id: 3, recipient: 1, isMyMessage: false, text: 'otvet', time: "12:48 10.03.2014", isRead: false},
    { id: 4, recipient: 2, isMyMessage: true, text: 'Николай, а не отобедать ли нам с Вами и не обсудить ли психологические проблемы программирования?', time: "12:49 10.03.2014", isRead: true},
    { id: 5, recipient: 2, isMyMessage: false, text: 'otvet', time: "12:50 10.03.2014", isRead: false},
  ];

  return {
    all: function() {
      return messages;
    },
    recipient: function(recipientId) {
      var returnArr = [];
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].recipient == recipientId)
          returnArr.push(messages[i]);
      }
      return returnArr;
    },
    unread: function() {
      var count = 0;
      for (var i = 0; i < messages.length; i++) {
        if (messages.isRead == true)
          count++
      }
      return count;
    },
    recipients: function() {
      var returnArr = [];
      for (var i = 0; i < messages.length; i++) {
        if (returnArr.indexOf(messages[i].recipient) == -1)
          returnArr.push(messages[i].recipient);
      }
      return returnArr;
    }
  }
})

.factory('MenuService', function() {

  var menuItems = [
      { text: 'Общий чат', link: 'general-chat'},
      { text: 'Люди', link: 'peoples'},
      { text: 'Места', link: 'places'},
	   { text: 'Мои чаты', link: 'my-chats'},
	  { text: 'Мой профиль', link: 'profile'},
	  { text: 'О проекте', link: 'about'}
  ];

  return {
    all: function() {
      return menuItems;
    }
  }
});
