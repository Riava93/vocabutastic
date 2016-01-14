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

ProfileController.$inject = ['AuthService'];

function ProfileController(AuthService) {
	let vm = this;

	vm.currentUser = AuthService.getUser();
	vm.title = `Welcome back, ${vm.currentUser.username}`;

	vm.deleteUser = deleteUser;


	function deleteUser() {
		AuthService.removeUser();
	}
}
