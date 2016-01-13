'use strict';

import angular from 'angular';


export default angular
	.module('VC.core')
	.config(HTTPConfig)
	.factory('AuthService', AuthService);

HTTPConfig.$inject = ['$httpProvider'];

function HTTPConfig($httpProvider, $rootScope) {
	let token = sessionStorage.getItem('token') || '';

	if (!!token) {
		token = `Basic ${token}`;
	} else { return; }

	$httpProvider.interceptors.push(function() {
		return {
			request: function(config) {
				config.headers.Authorization = token;
				return config;
			}
		};
	});
}

AuthService.$inject = ['$http', '$window', 'config'];

function AuthService($http, $window, config) {
	return {
		createUser: createUser,
		loginUser: loginUser,
		getUser: getUser,
		updateUser: updateUser,
		removeUser: removeUser,
	};


	function createUser(username, password) {
		if (!username || !password) {
			console.log(`${username}: ${password}`);
			return; }
		console.log(`${username}: ${password}`);

		let data = {
			username: username,
			password: password
		};

		return $http.post(
			config.apiURL + 'users',
			data
		).then(function(response) {
			console.log('%c[AuthService]: createUser response! %o',
						'background: green; color: white;',
						response);
			return response;
		}, function(error) {
			console.log('%c[AuthService]: Error: %o',
						'background: red; color: white',
						error);
			return error;
		});
	}

	function loginUser(username, password) {
		if (!username || !password) { return; }

		_setupHTTPHeaders(username, password);

		return $http({
			method: 'GET',
			url: config.apiURL + 'api/token',
		})
		.then(function(response) {
			console.log(`%c[AuthService]: Login Success!`,
						'background: green; color: white;');

			let token = response.data.token;
			_setupHTTPHeaders(token, 'unused');

			// Save the current users data
			$window.sessionStorage.setItem(
				'user', _parseData(response.data.user));
		}, function(error) {
			console.log(`%c[AuthService] Login User Error! %o`,
						'background: red; color: white;',
						error);
			_clearHTTPHeaders();
		});
	}

	function getUser() {
		let user = _parseData($window.sessionStorage.getItem('user'));
		return user;
	}

	function updateUser() {}

	function removeUser() {}

	//Private -------------------------

	function _setupHTTPHeaders(usernameOrToken, password) {
		let fullString = `${usernameOrToken}:${password}`;

		function encodeString(includeBasic = false) {
			if (includeBasic) {
				return `Basic ${btoa(fullString)}`;
			} else {
				return btoa(fullString);
			}
		}

		$http.defaults.headers.common.Authorization = encodeString(true);
		$window.sessionStorage.setItem('token', encodeString(false));
	}

	function _clearHTTPHeaders() {
		delete $http.defaults.headers['Authorization'];
		$window.sessionStorage.clear();
	}

	function _parseData(data) {
		if (!data) { return; }

		if (typeof data === 'string') {
			return JSON.parse(data);
		} else {
			return JSON.stringify(data);
		}
	}
}
