'use strict';

import angular from 'angular';
import formly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';


export default angular.module('VC.login', [
	formly,
	formlyBootstrap
]);

require('./login');
