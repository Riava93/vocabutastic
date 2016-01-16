'use strict';

import angular from 'angular';


angular
	.module('VC.profile_edit')
	.controller('ProfileEditController', ProfileEditController);

ProfileEditController.$inject = ['AuthService', 'FormService'];

function ProfileEditController(AuthService, FormService) {
	//Config
	let vm = this;

	//Attributes
	vm.processing = false;

	//Public Functions
	vm.currentUser = AuthService.getUser();
	vm.submitEdits = submitEdits;

	//Formly Fields
	vm.editFields = FormService.userFields;

	//Function definitions
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
