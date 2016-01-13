'use strict';

import angular from 'angular';


export default angular
	.module('VC.login')
	.controller('LoginController', LoginController);


LoginController.$inject = ['AuthService', '$state', '$timeout'];

function LoginController(AuthService, $state, $timeout) {
	let vm = this;

	//Function
	vm.submitLoginCredentials = submitLoginCredentials;
	vm.register = register;

	//FormlyFrom Config
	vm.loginFields = [
		{
			key: 'username',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Username',
				required: true,
				placeholder: 'awesome_username'
			}
		},

		{
			key: 'password',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'Password',
				required: true
			}
		}
	];

	vm.registerFields = [
		{
			key: 'username',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Username',
				required: true,
				placeholder: 'even_awesomer_username',
				minlength: 6
			}
		},

		{
			key: 'password1',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'Password',
				required: true,
				placeholder: '******',
				minlength: 10
			}
		},

		{
			key: 'password2',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'Password Confirmation',
				required: true,
				placeholder: '******',
				minlength: 10
			},
			validators: {
				passwordMatch: {
					expression: function($viewValue, $modelValue) {
						let value = $viewValue || $modelValue;

						if (value !== vm.newUser.password1) {
							return false;
						} else {
							return true;
						}
					},
					message: 'Passwords do not match'
				}
			}
		}
	];


	//Function definitions
	function register(userObj) {
		AuthService.createUser(
			userObj.username,
			userObj.password1)
		.then(function(response) {
			console.log(response);
			$timeout(function() {
				$state.go('login');
			}, 2000);
		}, function(err) {
			console.log('There was an error. Oh noez.');
			angular.copy({}, vm.registerForm);
		});
	}

	function submitLoginCredentials(credentials) {
		AuthService.loginUser(
			credentials.username,
			credentials.password);
	}
}

