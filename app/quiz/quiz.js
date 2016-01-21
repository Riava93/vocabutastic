'use strict';

import angular from 'angular';

//TODO: Need to integrate quiz results with server side
//request to create new result object.

//FIXME: Perhaps optimize/thin controller by extracting
//quiz logic out into separate service?

angular
	.module('VC.quiz')
	.controller('QuizController', QuizController);

QuizController.$inject = [
	'$window',
	'$stateParams',
	'HelperService',
	'ListService',
	'FormService',
	'$state',
	'QuizService'
];

function QuizController(
	$window, $stateParams, HelperService,
	ListService, FormService, $state, QuizService) {

	let vm = this;
	init(); //Setup current state

	//State Variables
	vm.noListsFound = false;
	vm.currentQuestion = 0;
	vm.quizInProgress = false;
	vm.showResults = false;
	vm.processing = false;
	vm.userScore = 0;

	//Formly Fields
	vm.answerField = FormService.nativeAnswerField;

	//State Functions
	vm.nextQuestion = nextQuestion;
	vm.restartQuiz = restartQuiz;
	vm.quitQuiz = quitQuiz;


	//Function Definitions

	function quitQuiz() {
		vm.currentQuestion = 0;
		vm.userScore = 0;
		vm.showResults = false;
		vm.quizInProgress = false;
	}

	function checkAnswer(answer) {
		let correctAnswer = vm.currentList
			.pairs[vm.currentQuestion]
			.native_word
			.toLowerCase();

		if (answer.toLowerCase() === correctAnswer) {
			vm.userScore += 1;
		}
	}

	function restartQuiz() {
		vm.currentQuestion = 0;
		vm.showResults = false;
		vm.quizInProgress = true;
		vm.userScore = 0;
	}

	function nextQuestion(answer) {
		checkAnswer(answer.native_word);

		vm.currentQuestion += 1;

		if (vm.currentQuestion >= vm.questions.length) {
			vm.showResults = true;
			vm.quizInProgress = false;
			_saveRecord();
		}

		angular.copy({}, vm.answer);
		HelperService.resetForm(vm.answerForm);
	}

	//Get list for current state
	function init() {
		let data = HelperService.parseData(
			$window.sessionStorage.getItem('lists'));

		if (data) {
			//Setup state variables needed for quiz.
			vm.currentList = HelperService.findList(data);
			vm.questions = vm.currentList.pairs;
			vm.totalScore = vm.questions.length;
			console.log(vm.questions);
		} else {
			ListService.getLists()
			.then(function(response) {
				if (response.statusText === 'UNAUTHORIZED') {
					vm.noListsFound = true;
				} else {
					vm.currentList = HelperService.findList(response.data);
					vm.questions = vm.currentList.pairs;
				}
			});
		}
	}

	function _saveRecord() {
		QuizService.createRecord(
			vm.userScore,
			vm.totalScore,
			vm.currentList)
		.then(function(result) {
			if (result) {
				console.log('%cRecord saved!', 'background: #008aff; color: white');
			} else {
				console.log('%cError saving!', 'background: red; color: white');
			}
		});
	}
}
