'use strict';

import angular from 'angular';

import core from './core/core.module';
import login from './login/login.module';


angular.module('VC', [
	//Shared
	core.name,

	//Features
	login.name
]);

import './core/bootstrap.js';
