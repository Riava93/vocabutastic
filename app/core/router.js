'use strict';

import angular from 'angular';


angular
	.module('VC.core')
	.config(VocabularizeRouter);

VocabularizeRouter.$inject = ['$urlRouterProvider', '$stateProvider'];

function VocabularizeRouter($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			template: '<h1>This is the home template</h1>'
		});
}
