'use strict';

import angular from 'angular';


angular
	.module('VC.lists')
	.factory('ListService', ListService);

ListService.$inject = ['$rootScope', '$http', 'config'];

function ListService($rootScope, $http, config) {

	return {
		createList: createList,
		getLists: getLists,
		getList: getList,
		removeList: removeList,
		updateList: updateList
	};

	function createList(details) {
		if (!details.name) { return; }

		return $http({
			method: 'POST',
			url: `${config.apiURL}lists`,
			data: details
		}).then(function(response) {
			return response;
		}, function(error) {
			return error;
		});
	}

	function getLists() {
		return $http({
			method: 'GET',
			url: `${config.apiURL}lists`
		})
		.then(function(response) {
			return response;
		}, function(error) {
			return error;
		});
	}

	function getList(listID) {
		return $http({
			method: 'GET',
			url: `${config.apiURL}lists/${listID}`
		})
		.then(function(response) {
			return response;
		}, function(error) {
			return error;
		});
	}

	function removeList(listId) {
		console.log($http.defaults.headers);
		return $http({
			method: 'DELETE',
			url: `${config.apiURL}lists/${listId}`
		})
		.then(function(response) {
			if (response.success) {
				return true;
			} else {
				return false;
			}
		});
	}

	function updateList(details, listId) {
		return $http({
			method: 'PUT',
			url: `${config.apiURL}lists/${listId}`,
			data: details
		})
		.then(function(response) {
			return response;
		});
	}
}
