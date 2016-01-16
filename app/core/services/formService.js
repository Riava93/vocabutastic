'use strict';

import angular from 'angular';

//TODO: Validators need to have referrence
//to the VM of various controllers.
//Ex: Password1, and Password2


angular
	.module('VC.core')
	.service('FormService', FormService);

FormService.$inject = [];

function FormService() {
	let s = this;

	//List Fields --------------------------------------------------
	s.listFields = [
		{
			key: 'name',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'List Name',
				placeholder: 'Animal Names',
				required: true,
				minlength: 5,
				maxlength: 150
			}
		},

		{
			key: 'desc',
			type: 'textarea',
			templateOptions: {
				label: 'List Desc',
				placeholder: 'A Short description of your list',
				rows: 6
			}
		}
	];

	//User Fields --------------------------------------------------

	//Login
	s.loginFields = [
		{
			key: 'username',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'Username',
				required: true,
				placeholder: 'awesome_username'
			}
		},

		{
			key: 'password',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'Password',
				required: true
			}
		}
	];

	//User Model Fields
	s.userFields = [
		{
			key: 'username',
			type: 'input',
			templateOptions: {
				type: 'text',
				minlength: 10,
				label: 'Username',
				placeholder: 'Awesomerest_username',
				required: true
			}
		},

		{
			key: 'email',
			type: 'input',
			templateOptions: {
				type: 'email',
				label: 'Email Address',
				placeholder: 'awesomerestes@example.com',
			}
		},

		{
			key: 'firstName',
			type: 'input',
			templateOptions: {
				type: 'text',
				minlength: 2,
				maxlength: 50,
				placeholder: 'Really',
				label: 'First Name'
			}
		},

		{
			key: 'lastName',
			type: 'input',
			templateOptions: {
				type: 'text',
				minlength: 2,
				maxlength: 75,
				placeholder: 'Cool',
				label: 'Last Name'
			}
		},

		{
			key: 'password1',
			type: 'input',
			templateOptions: {
				type: 'password',
				minlength: 10,
				label: 'New Password',
				placeholder: '*******'
			}
		},

		{
			key: 'password2',
			type: 'input',
			templateOptions: {
				type: 'password',
				minlength: 10,
				label: 'Confirm Password',
				placeholder: '*******'
			}
		}
	];

	return s;
}
