'use strict';

import angular from 'angular';


angular
	.module('VC.shell')
	.controller('ShellController', ShellController);

ShellController.$inject = ['AuthService', '$state'];

function ShellController(AuthService, $state) {
	let vm = this;

	vm.userLoggedIn = function() {
		return !!AuthService.getUser();
	};

	// if ($state.current.data && $state.current.data.authorization) {
	// 	vm.userLoggedIn = true;
	// } else {
	// 	vm.userLoggedIn = false;
	// }

	vm.logout = function() {
		AuthService.logoutUser();
	};
}
