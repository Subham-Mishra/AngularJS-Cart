(function () {
	var app = angular.module('store', ['ngCookies']);
	app.controller('StoreController', ['$scope', '$cookies',
		function ($scope, $cookies) {
			$scope.fruits = fruits;
			$scope.cart = [];
			$scope.total = 0;
			if (!angular.isUndefined($cookies.get('total'))) {
				$scope.total = parseFloat($cookies.get('total'));
			}
			if (!angular.isUndefined($cookies.get('cart'))) {
				$scope.cart = $cookies.getObject('cart');
			}
			$scope.addItemToCart = function (fruit) {
				if ($scope.cart.length === 0) {
					fruit.count = 1;
					$scope.cart.push(fruit);
				} else {
					var repeat = false;
					for (var i = 0; i < $scope.cart.length; i++) {
						if ($scope.cart[i].id === fruit.id) {
							repeat = true;
							$scope.cart[i].count += 1;
						}
					}
					if (!repeat) {
						fruit.count = 1;
						$scope.cart.push(fruit);
					}
				}
				var expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 1);
				$cookies.putObject('cart', $scope.cart, {
					'expires': expireDate
				});
				$scope.cart = $cookies.getObject('cart');
				$scope.total += parseFloat(fruit.price);
				$cookies.put('total', $scope.total, {
					'expires': expireDate
				});
			};
			$scope.removeItemCart = function (fruit) {
				if (fruit.count > 1) {
					fruit.count -= 1;
					var expireDate = new Date();
					expireDate.setDate(expireDate.getDate() + 1);
					$cookies.putObject('cart', $scope.cart, {
						'expires': expireDate
					});
					$scope.cart = $cookies.getObject('cart');
				} else if (fruit.count === 1) {
					var index = $scope.cart.indexOf(fruit);
					$scope.cart.splice(index, 1);
					expireDate = new Date();
					expireDate.setDate(expireDate.getDate() + 1);
					$cookies.putObject('cart', $scope.cart, {
						'expires': expireDate
					});
					$scope.cart = $cookies.getObject('cart');
				}
				$scope.total -= parseFloat(fruit.price);
				$cookies.put('total', $scope.total, {
					'expires': expireDate
				});
			};
		}
	]);
	var fruits = [{
		id: 1,
		name: 'Apple',
		price: 85,
		image: './image/Apple.jpg'
	}, {
		id: 2,
		name: 'Mango',
		price: 60,
		image: './image/Mango.jpg'
	}, {
		id: 3,
		name: 'Melon',
		price: 20,
		image: './image/Melon.jpg'
	}, {
		id: 4,
		name: 'Grapes',
		price: 45,
		image: './image/Grapes.jpg'
	}, {
		id: 5,
		name: 'Papaya',
		price: 35,
		image: './image/Papaya.jpg'
	}, {
		id: 6,
		name: 'Pineapple',
		price: 10,
		image: './image/Pineapple.jpg'
	}, {
		id: 7,
		name: 'Banana',
		price: 25,
		image: './image/Banana.jpg'
	}, {
		id: 8,
		name: 'Orange',
		price: 75,
		image: './image/Orange.jpg'
	}, ];
})();