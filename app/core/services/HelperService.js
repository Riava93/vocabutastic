'use strict';

import angular from 'angular';


angular
	.module('VC.core')
	.factory('HelperService', HelperService);

HelperService.$inject = ['$window', 'ListService', '$stateParams'];

function HelperService($window, ListService, $stateParams) {

	return {
		//GENERAL HELPERS
		parseData: parseData,
		resetForm: resetForm,

		//LIST HELPERS
		getAllLists: getAllLists,
		updateListData: updateListData,
		findList: findList,

		//PAIR HELPERS
		removePair: removePair,
		updatePair: updatePairs,
		addNewLangPair: addNewLangPair
	};


	//GENERAL HELPERS --------------------------------------------------

	/**
	 * Will return a JSON string of passed in data
	 * or JSON parsed string of data.
	 * @param {String|Array} data - data to be parsed/stringified
	 */
	function parseData(data) {
		if (!data) { return false; }

		if (typeof data === 'string') {
			return JSON.parse(data);
		} else {
			return JSON.stringify(data);
		}
	}

	/**
	 * Resets an angular from to untouched
	 * and pristine.
	 * @param form {Object} - Form object to be reset
	 */
	function resetForm(form) {
		if (!form) { return false; }

		form.$setPristine();
		form.$setUntouched();
	}

	//LIST HELPERS --------------------------------------------------

	/**
	 * Get all lists from either sessionStorage
	 * or the API if sessionStorage is empty.
	 * @param forceUpdate {Boolean} - Force fetch from API
	 */
	function getAllLists(forceUpdate = false) {
		let data = parseData($window.sessionStorage.getItem('lists'));
		let lists = [];

		if (!forceUpdate && data) {
			lists = data;
		} else {
			ListService.getLists()
			.then(function(response) {
				if (response.statusText === 'UNAUTHORIZED') {
					console.log('Error fetching Lists');
				} else {
					lists = response.data.lists;
					$window.sessionStorage.setItem(
						'lists', parseData(lists));
				}
			});
		}

		return lists;
	}

	/**
	 * Updates data for single list of lists on session
	 * storage and causes view to refresh with new data
	 * @param {Object} newValues - List updates
	 */
	function updateListData(newValues) {
		let data = parseData($window.sessionStorage.getItem('lists'));

		if (data) {
			for (let idx in data) {
				if (data[idx].id === newValues.id) {
					data[idx] = newValues;
				}
			}

			let preppedData = parseData(data);
			$window.sessionStorage.setItem(
				'lists', preppedData);

			getAllLists();
		} else {
			return false;
		}
	}

	/**
	 * Finds a list object from all lists and
	 * returns it.
	 * @param {Array} lists - Master array of lists
	 */
	function findList(lists) {
		let stateId = parseInt($stateParams.list_id, 10);
		let list;

		for (let idx in lists) {
			if (lists[idx].id === stateId) {
				list = lists[idx];
			}
		}

		return list;
	}

	//PAIRS HELPERS --------------------------------------------------

	/**
	 * Finds the index of target pair on the
	 * states current list and splices it.
	 * @param {Object} target - Pair to find on list
	 * @param {Object} current - Current State's list
	 */
	function removePair(target, current) {
		let idx = current.pairs.indexOf(target);

		if (idx !== -1) {
			current.pairs.splice(idx, 1);
			updatePairs(current);
		}
	}

	/**
	 * Updates data for a single pair on the
	 * state's current list.
	 * @param {Object} current - Current State's list
	 */
	function updatePairs(current) {
		let data = parseData($window.sessionStorage.getItem('lists'));

		for (let i in data) {
			if (data[i].id === current.id) {
				data[i] = current;
			}
		}

		let preppedData = parseData(data);
		$window.sessionStorage.setItem('lists', preppedData);
	}

	function addNewLangPair(langPair, current) {
		if (!langPair) { return; }

		current.pairs.push(langPair);
		let data = parseData($window.sessionStorage.getItem('lists'));

		if (data) {
			for (let idx in data) {
				if (data[idx].id === current.id) {
					data[idx] = current;
				}
			}

			let preppedData = parseData(data);
			$window.sessionStorage.setItem('lists', preppedData);
		}

	}
}
