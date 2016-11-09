/**
 * Created by ZZS on 11/1/16.
 */
var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function () {
        // calling super first
        generators.Base.apply(this, arguments);

        this.log('you are on version 1.0.3');

        // this helper help to change show-message to ShowMessageComponent
        this.toClassNameHelper = function(input){
            return _.join(input.split('-').map(function (s) {
                return _.upperFirst(s);
            }), '');
        };

        // init some variables
        this.generate_opt = ['component'];
        this.component_name = 'show-message';
        this.component_location = 'src/app';
        this.component_class = 'ShowMessageComponent';
        this.component_style = 'scss';
        this.service_name = 'device';
        this.service_location = 'src/app/shared/services';
        this.service_class = 'Device'
    },
    // this function used to interact with user
    prompting: function () {
        return this.prompt([{
            type    : 'checkbox',
            name    : 'generate_opt',
            message : 'what do u wanna generate?(Multiselect, default only component)',
            choices : ['component', 'service'],
            default : this.generate_opt
        }, {
            type    : 'input',
            name    : 'component_name',
            message : 'component folder name? [use kebab-case]',
            store   : true,
            default : this.component_name,
            when    : function (answers) {
                return answers.generate_opt.indexOf('component') != -1;
            }
        }, {
            type    : 'input',
            name    : 'component_location',
            message : 'resides position? (under current folder)',
            store   : true,
            default : this.component_location,
            when    : function (answers) {
                return answers.generate_opt.indexOf('component') != -1;
            }
        }, {
            type    : 'list',
            name    : 'component_style',
            choices : ['scss', 'css', 'less'],
            message : 'style sheets?',
            when    : function (answers) {
                return answers.generate_opt.indexOf('component') != -1;
            }
        }, {
            type    : 'input',
            name    : 'service_name',
            message : 'service folder name? [use kebab-case]',
            store   : true,
            default : this.service_name,
            when    : function (answers) {
                return answers.generate_opt.indexOf('service') != -1;
            }
        }, {
            type    : 'input',
            name    : 'service_location',
            message : 'service resides position? (under current folder)',
            store   : true,
            default : this.service_location,
            when    : function (answers) {
                return answers.generate_opt.indexOf('service') != -1;
            }
        }]).then(function (answers) {
            // change our instance variable
            this.generate_opt = answers.generate_opt;
            if (this.generate_opt.indexOf('component') != -1) {
                this.component_name = answers.component_name;
                this.component_location = answers.component_location;
                this.component_class = this.toClassNameHelper(answers.component_name)+'Component';
                this.component_style = answers.component_style;
            }
            if (this.generate_opt.indexOf('service') != -1) {
                this.service_name = answers.service_name;
                this.service_location = answers.service_location;
                this.service_class = this.toClassNameHelper(answers.service_name);
            }
        }.bind(this));
    },

    // starting creating files
    writing: function () {
        if (this.generate_opt.indexOf('component') != -1) {
            this.fs.copyTpl(
                this.templatePath('template.component.html'),
                this.destinationPath(this.component_location+'/'+ this.component_name + '/'+ this.component_name +'.component.html')
            );
            this.fs.copyTpl(
                this.templatePath('template.component.ts'),
                this.destinationPath(this.component_location+'/'+ this.component_name + '/'+ this.component_name +'.component.ts'),
                {folder_name: this.component_name, class_name: this.component_class, style_suffix: this.component_style}
            );
            this.fs.copyTpl(
                this.templatePath('template.component.spec.ts'),
                this.destinationPath(this.component_location+'/'+ this.component_name + '/'+ this.component_name +'.component.spec.ts'),
                {folder_name: this.component_name, class_name: this.component_class}
            );
            this.fs.copyTpl(
                this.templatePath('template.component.' + this.component_style),
                this.destinationPath(this.component_location+'/'+ this.component_name + '/'+ this.component_name +'.component.'+ this.component_style)
            );
            this.fs.copyTpl(
                this.templatePath('index.ts'),
                this.destinationPath(this.component_location+'/'+ this.component_name + '/index.ts'),
                {folder_name: this.component_name, suffix: 'component'}
            );

            this.log('Component Created!');
        }
        if (this.generate_opt.indexOf('service') != -1) {
            this.fs.copyTpl(
                this.templatePath('template.service.ts'),
                this.destinationPath(this.service_location+'/'+ this.service_name + '/'+ this.service_name +'.service.ts'),
                {class_name: this.service_class}
            );
            this.fs.copyTpl(
                this.templatePath('template.service.spec.ts'),
                this.destinationPath(this.service_location+'/'+ this.service_name + '/'+ this.service_name +'.service.spec.ts'),
                {folder_name: this.service_name, class_name: this.service_class}
            );
            this.fs.copyTpl(
                this.templatePath('template.entity.ts'),
                this.destinationPath(this.service_location+'/'+ this.service_name + '/'+ this.service_name +'.ts'),
                {class_name: this.service_class}
            );
            this.fs.copyTpl(
                this.templatePath('index.ts'),
                this.destinationPath(this.service_location+'/'+ this.service_name + '/index.ts'),
                {folder_name: this.service_name, suffix: 'service'}
            );
            this.log('Service Created!')
        }
    }
});
