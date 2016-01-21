'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';


export default angular.module('VC.core', [uirouter]);

//Config
require('./config');
require('./router');

//Services
require('./services/AuthService');
require('./services/FormService');
require('./services/HelperService');
require('./services/QuizService');
