'use strict';

import angular from 'angular';


export default angular
	.module('VC.login')
	.controller('LoginController', LoginController);


LoginController.$inject = ['AuthService', '$state', 'FormService'];

function LoginController(AuthService, $state, FormService) {
	//Config
	let vm = this;

	//State Attributes
	vm.processing = false;

	//View Functions
	vm.submitLoginCredentials = submitLoginCredentials;
	vm.register = register;

	//FormlyFrom Config
	vm.loginFields = FormService.loginFields;
	vm.registerFields = FormService.userFields;

	//Function definitions
	function register(userObj) {
		vm.processing = true;
		AuthService.createUser(
			userObj.username,
			userObj.password1)
		.then(function(response) {
			if (response.statusText === 'UNAUTHORIZED') {
				vm.processing = false;
				angular.copy({}, vm.loginCreds);
				vm.loginForm.$setPristine();
				vm.loginForm.$setUntouched();
			} else {
				$state.go('shell.login');
			}
		});
	}

	function submitLoginCredentials(credentials) {
		vm.processing = true;
		AuthService.loginUser(
			credentials.username.toLowerCase(),
			credentials.password)
		.then(function(response) {
			if (response.statusText === 'UNAUTHORIZED') {
				vm.processing = false;
				angular.copy({}, vm.loginCreds);
				vm.loginForm.$setPristine();
				vm.loginForm.$setUntouched();
			} else {
				$state.go('shell.profile');
			}
		});
	}
}

