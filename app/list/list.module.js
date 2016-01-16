'use strict';

import angular from 'angular';
import formly from 'angular-formly';
import formlyTemplates from 'angular-formly-templates-bootstrap';


export default angular.module('VC.lists', [formly, formlyTemplates]);

//Controller
require('./list');

//Services
require('./services/listService');
require('./services/VocabPairService');

//Directives
require('./directives/MasterList');
