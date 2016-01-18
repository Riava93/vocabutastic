'use strict';

import angular from 'angular';
import formly from 'angular-formly';
import formlyTemplates from 'angular-formly-templates-bootstrap';

import pairs from './vocab_pairs/vocab_pairs.module';


export default angular.module('VC.lists', [
	//Vendor
	formly,
	formlyTemplates,

	//Features
	pairs.name
]);

//Controller
require('./list');

//Services
require('./services/listService');
require('./services/VocabPairService');

//Directives
require('./directives/MasterList');
