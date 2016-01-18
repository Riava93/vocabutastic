'use strict';

import angular from 'angular';


angular
	.module('VC.lists')
	.factory('VocabPairService', VocabPairService);

VocabPairService.$inject = ['config', '$http'];

function VocabPairService(config, $http) {

	return {
		createPair: createPair,
		updatePair: updatePair,
		removePair: removePair
	};

	function createPair(listId, langPair) {
		if (!langPair) { return; }

		return $http({
			method: 'POST',
			url: `${config.apiURL}lists/${listId}/pairs`,
			data: langPair
		})
		.then(function(response) {
			return response;
		}, function(error) {
			return error;
		});
	}

	function updatePair(updates) {}

	function removePair(listId, pairId) {
		return $http({
			method: 'DELETE',
			url: `${config.apiURL}lists/${listId}/pairs/${pairId}`
		})
		.then(function(response) {
			console.log('%cSuccess',
				'background: green; color: white');
			return response;
		}, function(error) {
			console.log('%cError',
				'background: red; color: white;');
			return error;
		})
	}
}
