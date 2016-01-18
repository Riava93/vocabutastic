'use strict';

import angular from 'angular';


angular
	.module('VC.pairs')
	.controller('PairController', PairController);

PairController.$inject = [
	'FormService',
	'VocabPairService',
	'ListService',
	'$stateParams',
	'$window'
];

function PairController(FormService, VocabPairService, ListService,
	$stateParams, $window) {

	let vm = this;
	init();

	//formly config
	vm.pairFields = FormService.pairFields;

	//View Functions
	vm.createPair = createPair;
	vm.removePair = removePair;

	//Function definitions
	function createPair(langPair) {
		vm.processing = true;

		VocabPairService.createPair(
			vm.currentList.id,
			langPair)
		.then(function(response) {
			if (response.statusText === 'UNAUTHORIZED') {
				angular.copy({}, vm.langPair);
				_resetForm(vm.langPairForm);
				vm.processing = false;
			} else {
				_addNewLangPair(response.data);
				vm.processing = false;
				angular.copy({}, vm.langPair);
				_resetForm(vm.langPairForm);
			}
		});
	}

	function removePair(idx) {
		let mark = vm.currentList.pairs[idx];
		VocabPairService.removePair(
			vm.currentList.id,
			mark.id)
		.then(function() {
			_removePair(mark);
		});
	}

	function init() {
		let data = _parseData($window.sessionStorage.getItem('lists'));
		vm.currentList = _findList(data);
		console.log(vm.currentList);
	}

	//FIXME: Abstract these functions out into a service.
	//TODO: Remove all definitions of thsese functions from
	//other files and replace with service calls
	function _parseData(data) {
		if (!data) { return false; }

		if (typeof data === 'string') {
			return JSON.parse(data);
		} else {
			return JSON.stringify(data);
		}
	}

	function _resetForm(form) {
		form.$setPristine();
		form.$setUntouched();
	}

	function _findList(lists) {
		let stateId = parseInt($stateParams.list_id, 10);
		let list;

		for (let idx in lists) {
			if (lists[idx].id === stateId) {
				list = lists[idx];
			}
		}

		return list;
	}

	function _removePair(target) {
		let idx = vm.currentList.pairs.indexOf(target);
		console.log(idx);

		if (idx !== -1) {
			vm.currentList.pairs.splice(idx, 1);
			_updateSessionStorage();
		}
	}

	function _updateSessionStorage() {
		let data = _parseData($window.sessionStorage.getItem('lists'));

		for (let i in data) {
			if (data[i].id === vm.currentList.id) {
				data[i] = vm.currentList;
			}
		}

		let preppedData = _parseData(data);
		$window.sessionStorage.setItem('lists', preppedData);
	}

	function _addNewLangPair(langPair) {
		if (!langPair) { return; }

		vm.currentList.pairs.push(langPair);
		let data = _parseData($window.sessionStorage.getItem('lists'));

		if (data) {
			for (let idx in data) {
				if (data[idx].id === vm.currentList.id) {
					data[idx] = vm.currentList;
				}
			}

			let preppedData = _parseData(data);
			$window.sessionStorage.setItem('lists', preppedData);
		}
	}
}
