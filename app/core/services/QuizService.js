'use strict';

import angular from 'angular';


angular
	.module('VC.core')
	.factory('QuizService', QuizService);

QuizService.$inject = ['$http', 'config', '$stateParams'];

function QuizService($http, config, $stateParams) {

	return {
		createRecord: createRecord,
		getRecords: getRecords,
		getRecordsAll: getRecordsAll
	};

	function createRecord(userScore, totalScore, list) {
		return $http({
			method: 'POST',
			url: `${config.apiURL}results`,
			data: {
				user_score: userScore,
				total_score: totalScore,
				list_name: list.name
			}
		})
		.then(function(response) {
			console.log('%cSuccess!', 'background: green; color: white;');
			return true;
		}, function(error) {
			console.log('%cError Creating Record: %o',
						'background: red; color: white;',
						error);
			return false;
		});
	}

	function getRecords(limit = 5) {
		return $http({
			method: 'GET',
			url: `${config.apiURL}results/${limit}`
		})
		.then(function(response) {
			return response.data;
		}, function(error) {
			return false;
		});
	}

	function getRecordsAll() {
		return $http({
			method: 'GET',
			url: `${config.apiURL}results`
		})
		.then(function(response) {
			return response.data;
		}, function(error) {
			return false;
		});
	}
}
