'use strict';

import angular from 'angular';

//Templates
import '../shell/shell_template.jade';
import '../login/login_template.jade';
import '../login/register_template.jade';
import '../profile/profile_template.jade';
import '../profile/edit/edit_template.jade';


angular
	.module('VC.core')
	.config(VocabularizeRouter);

VocabularizeRouter.$inject = ['$urlRouterProvider', '$stateProvider'];

function VocabularizeRouter($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('login');

	$stateProvider
		.state('shell', {
			abstract: true,
			controller: 'ShellController',
			controllerAs: 'vm',
			templateUrl: 'shell_template.jade'
		})

		.state('shell.login', {
			url: '/login',
			controller: 'LoginController',
			controllerAs: 'vm',
			templateUrl: 'login_template.jade'
		})

		.state('shell.register', {
			url: '/register',
			controller: 'LoginController',
			controllerAs: 'vm',
			templateUrl: 'register_template.jade'
		})

		.state('shell.profile', {
			url: '/profile',
			data: {
				authorization: true
			},
			controller: 'ProfileController',
			controllerAs: 'vm',
			templateUrl: 'profile_template.jade'
		})

		.state('shell.profileEdit', {
			url: '/edit',
			data: {
				authorization: true
			},
			controller: 'ProfileEditController',
			controllerAs: 'vm',
			templateUrl: 'edit_template.jade'
		});
}
