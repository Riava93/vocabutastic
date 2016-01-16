'use strict';

import angular from 'angular';


angular
	.module('VC.lists')
	.directive('masterList', MasterList);

MasterList.$inject = [];

function MasterList() {}
