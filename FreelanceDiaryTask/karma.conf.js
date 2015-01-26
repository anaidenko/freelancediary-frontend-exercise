module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'FreelanceDiaryTask/Scripts/angular.js',
      'FreelanceDiaryTask/Scripts/angular-mocks.js',
      'FreelanceDiaryTask/Scripts/angular-local-storage.js',
      'FreelanceDiaryTask/Scripts/app/*.js',
      'FreelanceDiaryTask.Tests/Scripts/Tests/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
