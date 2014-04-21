'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var wiredep = require('wiredep');

var H5skGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {

      if (!this.options['skip-install']) {

        this.installDependencies({
          callback: function () {
            var bowerJson = JSON.parse(fs.readFileSync('./bower.json'));

            wiredep({
              bowerJson: bowerJson,
              directory: 'app/bower_components',
              src: 'app/index.html'

            });

          }
        });
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(this.yeoman);

    this.log(chalk.magenta('You\'re using the fantastic H5sk generator.'));

    var prompts = [{
      type: 'confirm',
      name: 'oldIeSupport',
      message: 'Would you like to enable IE 7/8 support ?',
      default: true
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: true
      }]
    }];

    this.prompt(prompts, function (answers) {
      this.oldIeSupport = answers.oldIeSupport;

      var features = answers.features;

      var hasFeature = function (feat) {
        return features.indexOf(feat) !== -1;
      };

      this.includeModernizr = hasFeature('includeModernizr');

      done();
    }.bind(this));
  },

  app: function () {

    this.mkdir('app');
    this.mkdir('app/css');
    this.mkdir('app/js');
    this.mkdir('app/js/vendor');
    this.mkdir('app/images');

    this.copy('gulpfile.js', 'gulpfile.js');

    this.copy('_package.json', 'package.json');

    this.copy('bowerrc', '.bowerrc');

    this.copy('normalize.css', 'app/css/normalize.css');
    this.copy('main.css', 'app/css/main.css');
    this.copy('main.js', 'app/js/main.js');

    if(this.oldIeSupport) {
      this.copy('fixIE7.css', 'app/css/fixIE7.css');
      this.copy('fixIE8.css', 'app/css/fixIE8.css');
      this.copy('IE9.js', 'app/js/vendor/IE9.js');
    }

    this.template('_bower.json', 'bower.json');
    this.template('_index.html', 'app/index.html');

  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = H5skGenerator;
