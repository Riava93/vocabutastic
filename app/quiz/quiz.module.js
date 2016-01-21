'use strict';

import angular from 'angular';
import formly from 'angular-formly';
import formlyTemplates from 'angular-formly-templates-bootstrap';


export default angular.module('VC.quiz', [
	formly,
	formlyTemplates
]);

require('./quiz');
