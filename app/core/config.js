'use strict';

export default angular
	.module('VC.core')
	.value('config', {
		apiURL: 'http://localhost:9022/'
	})
	.run(AuthorizeRoutes);

AuthorizeRoutes.$inject = ['$rootScope', '$q', '$state', '$urlRouter', 'AuthService'];

function AuthorizeRoutes($rootScope, $q, $state, $urlRouter, AuthService) {
	$rootScope.$on('$stateChangeStart', function(event, toState) {
		let userData = AuthService.getUser();

		if (toState.data && toState.data.authorization) {
			if (!userData || !userData.token) {
				event.preventDefault();
				return $state.go('shell.login');
			}
		} else {
			if (userData && userData.token) {
				event.preventDefault();
				return $state.go('shell.profile');
			}
		}
		return;
	});
}
