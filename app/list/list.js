'use strict';

import angular from 'angular';


angular
	.module('VC.lists')
	.controller('ListController', ListController);

ListController.$inject = [
	'FormService',
	'ListService',
	'$state',
	'$window',
	'$timeout'
];

function ListController(FormService, ListService, $state, $window, $timeout) {
	//Config
	let vm = this;
	_getListData(); //Get Lists from sessions or api

	//State Variables
	vm.editing = false;
	vm.processing = false;

	//View Functions
	vm.createList       = createList;
	vm.removeList       = removeList;
	vm.updateList       = updateList;
	vm.startEditingList = startEditingList;
	vm.stopEditingList = stopEditingList;

	//Formly Fields
	vm.listFields = FormService.listFields;

	//Function Definitions
	function createList(newList) {
		vm.processing = true;

		ListService.createList(newList)
		.then(function(response) {
			console.log(response);
			if (response.statusText === 'UNAUTHORIZED') {
				angular.copy({}, vm.newList);
				_resetForm(vm.newListForm);
				vm.processing = false;
			} else {
				_getListData(true);
				$timeout(function() {
					$state.go('shell.lists');
				}, 500);
			}
		});
	}

	function removeList(idx) {
		let mark = vm.lists[idx];

		console.log(mark.id);

		ListService.removeList(mark.id)
		.then(function(response) {
			_getListData(true);
		});
	}

	function updateList(updates) {
		vm.processing = true;
		let listId = vm.currentlyEditingList.id;

		ListService.updateList(updates, listId)
		.then(function(response) {
			if (response.statusText === 'UNAUTHORIZED') {
				angular.copy({}, vm.editList);
				_resetForm(vm.listEditForm);
				vm.processing = false;
			} else {
				_updateListData(response.data);
				vm.editing = false;
				vm.processing = false;
			}
		});
	}

	function startEditingList(idx) {
		vm.currentlyEditingList = vm.lists[idx];
		vm.editing = true;
	}

	function stopEditingList() {
		angular.copy({}, vm.editList);
		_resetForm(vm.listEditForm);

		vm.currentlyEditingList = null;
		vm.editing = false;
	}

	//Private --------------------------------------------------

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

	function _getListData(forceUpdate = false) {
		//Get list data from session storage, otherwise, call to api
		let data = _parseData($window.sessionStorage.getItem('lists'));

		if (!forceUpdate && data) {
			vm.lists = data;
		} else {
			ListService.getLists()
			.then(function(response) {
				if (response.statusText === 'UNAUTHORIZED') {
					console.log('Error fetching Lists');
					vm.lists = [];
				} else {
					vm.lists = response.data.lists;
					$window.sessionStorage.setItem(
						'lists', _parseData(vm.lists));
				}
			});
		}
	}

	function _updateListData(newValues) {
		let data = _parseData($window.sessionStorage.getItem('lists'));

		if (data) {
			for (let idx in data) {
				if (data[idx].id === newValues.id) {
					data[idx] = newValues;
				}
			}

			let preppedData = _parseData(data);
			$window.sessionStorage.setItem(
				'lists', preppedData);

			_getListData();
		} else {
			return false;
		}
	}
}
