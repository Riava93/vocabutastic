'use strict';

import angular from 'angular';

//Modules
import shell from './shell/shell.module';
import core from './core/core.module';
import login from './login/login.module';
import profile from './profile/profile.module';
import profile_edit from './profile/edit/edit.module';
import lists from './list/list.module';
import quiz from './quiz/quiz.module';


angular.module('VC', [
	//Shared
	core.name,
	shell.name,

	//Features
	login.name,
	profile.name,
	profile_edit.name,
	lists.name,
	quiz.name
]);

import './core/bootstrap.js';
