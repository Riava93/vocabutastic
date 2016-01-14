'use strict';

import angular from 'angular';

import shell from './shell/shell.module';
import core from './core/core.module';
import login from './login/login.module';
import profile from './profile/profile.module';
import profile_edit from './profile/edit/edit.module';


angular.module('VC', [
	//Shared
	core.name,
	shell.name,

	//Features
	login.name,
	profile.name,
	profile_edit.name
]);

import './core/bootstrap.js';
