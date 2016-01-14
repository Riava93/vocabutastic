'use strict';

import angular from 'angular';


angular
	.module('VC.profile_edit')
	.controller('ProfileEditController', ProfileEditController);

ProfileEditController.$inject = ['AuthService', '$timeout'];

function ProfileEditController(AuthService, $timeout) {
	let vm = this;

	vm.currentUser = AuthService.getUser();
	vm.submitEdits = submitEdits;
	vm.processing = false;

	vm.editFields = [
		{
			key: 'username',
			type: 'input',
			templateOptions: {
				type: 'text',
				minlength: 10,
				label: 'Username',
				placeholder: 'Awesomerest_username',
				required: true
			}
		},

		{
			key: 'email',
			type: 'input',
			templateOptions: {
				type: 'email',
				label: 'Email Address',
				placeholder: 'awesomerestes@example.com',
			}
		},

		{
			key: 'firstName',
			type: 'input',
			templateOptions: {
				type: 'text',
				minlength: 2,
				maxlength: 50,
				placeholder: 'Really',
				label: 'First Name'
			}
		},

		{
			key: 'lastName',
			type: 'input',
			templateOptions: {
				type: 'text',
				minlength: 2,
				maxlength: 75,
				placeholder: 'Cool',
				label: 'Last Name'
			}
		},

		{
			key: 'password1',
			type: 'input',
			templateOptions: {
				type: 'password',
				minlength: 10,
				label: 'New Password',
				placeholder: '*******'
			},
			validators: {
				passwordMatch: {
					expression: function($viewValue, $modelValue) {
						let value = $viewValue || $modelValue;

						if (value !== vm.editUser.password2) {
							return false;
						} else {
							return true;
						}
					},
					message: 'Passwords must match'
				}
			}
		},

		{
			key: 'password2',
			type: 'input',
			templateOptions: {
				type: 'password',
				minlength: 10,
				label: 'Confirm Password',
				placeholder: '*******'
			},
			validators: {
				passwordMatch: {
					expression: function($viewValue, $modelValue) {
						let value = $viewValue || $modelValue;

						if (value !== vm.editUser.password1) {
							return false;
						} else {
							return true;
						}
					},
					message: 'Password must match.'
				}
			}
		}
	];

	function submitEdits(updates) {
		vm.processing = true;

		AuthService.updateUser(
			updates.username)
		.then(function(response) {
			if (response.statusText === 'UNAUTHORIZED') {
				angular.copy({}, vm.editUser);
				vm.editForm.$setPristine();
				vm.editForm.$setUntouched();
				vm.processing = false;
			} else {
				vm.currentUser = AuthService.getUser();
				vm.processing = false;
			}
		});
	}
}
