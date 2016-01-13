'use strict';

import angular from 'angular';
import '../login/login_template.jade';
import '../login/register_template.jade';


angular
	.module('VC.core')
	.config(VocabularizeRouter);

VocabularizeRouter.$inject = ['$urlRouterProvider', '$stateProvider'];

function VocabularizeRouter($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('home', {
			url: '/',
			template: '<h1>This is the home template</h1>'
		})

		.state('login', {
			url: '/login',
			controller: 'LoginController',
			controllerAs: 'vm',
			templateUrl: 'login_template.jade'
		})

		.state('register', {
			url: '/register',
			controller: 'LoginController',
			controllerAs: 'vm',
			templateUrl: 'register_template.jade'
		});
}
