'use strict';

import angular from 'angular';


export default angular
	.module('VC.profile')
	.filter('capitalize', function() {
		return function(input) {
			var splitString = input.split(' ');
			var capitalizedString;
			var tempArr = [];

			splitString.map(function(item) {
			  var newString = '';
			  for (var i = 1; i < item.length; i++) {
				newString += item[i];
			  }
			  newString = item[0].toUpperCase() + newString;

			  tempArr.push(newString);
			});

			let newInput = tempArr.join(' ');

			if (input !== newInput) {
				return newInput;
			} else {
				return input;
			}
		};
	})
	.controller('ProfileController', ProfileController);

ProfileController.$inject = [
	'AuthService',
	'QuizService',
	'HelperService',
	'$window'];

function ProfileController(AuthService, QuizService, HelperService, $window) {
	let vm = this;

	vm.currentUser = AuthService.getUser();
	vm.deleteUser = deleteUser;

	vm.title = `Welcome back, ${vm.currentUser.username}`;

	_getRecentResults();


	function deleteUser() {
		AuthService.removeUser();
	}

	function _getRecentResults() {
		QuizService.getRecords()
		.then(function(payload) {
			if (payload) {
				vm.latestRecords = payload.results;
				_findWeakestQuiz();
			}
		});
	}

	function _findWeakestQuiz() {
		let quiz;
		let score = 0;
		let results = vm.latestRecords;

		for (let i in results) {
			let userScore = results[i].user_score;
			let totalScore = results[i].total_score;

			if (userScore < totalScore) {
				if (!score || userScore < score) {
					score = userScore;
					quiz = results[i];
				}
			}
		}

		vm.weakest = quiz;
	}
}
