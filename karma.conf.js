//jshint strict: false
module.exports = function(config) {
  config.set({
    basePath: '.',
    files: [
	  'node_modules/angular/angular.js',
	  'node_modules/angular-mocks/angular-mocks.js',
      'app/**/*.module.js',
      'app/**/*.component.js',
      'app/**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

//    browsers: ['Firefox' 'Chrome'],
    browsers: ['Firefox'],

    plugins: [
//      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
