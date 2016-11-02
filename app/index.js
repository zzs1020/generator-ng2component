/**
 * Created by ZZS on 11/1/16.
 */
var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function () {
        // calling super first
        generators.Base.apply(this, arguments);
        
        // this helper help to change show-message to ShowMessageComponent
        this.toClassNameHelper = function(input){
            return _.join(input.split('-').map(function (s) {
                return _.upperFirst(s);
            }), '') + 'Component';
        };

        // init some variables
        this.component_name = 'show-message';
        this.component_location = 'src/app';
        this.component_class = 'ShowMessageComponent';
        this.component_style = 'scss';
    },
    // this function used to interact with user
    prompting: function () {
        return this.prompt([{
            type    : 'input',
            name    : 'component_name',
            message : 'component folder name? [use kebab-case]',
            store   : true,
            default : this.component_name
        }, {
            type    : 'input',
            name    : 'component_location',
            message : 'resides position? (under current folder)',
            store   : true,
            default : this.component_location
        }, {
            type    : 'list',
            name    : 'component_style',
            choices : ['scss', 'css', 'less'],
            message : 'style sheets?'
        }]).then(function (answers) {
            // change our instance variable
            this.component_name = answers.component_name;
            this.component_location = answers.component_location;
            this.component_class = this.toClassNameHelper(answers.component_name);
            this.component_style = answers.component_style;
        }.bind(this));
    },

    // starting creating files
    writing: function () {
        this.fs.copyTpl(
            this.templatePath('template.component.html'),
            this.destinationPath(this.component_location+'/'+ this.component_name + '/'+ this.component_name +'.component.html')
        );
        this.fs.copyTpl(
            this.templatePath('template.component.ts'),
            this.destinationPath(this.component_location+'/'+ this.component_name + '/'+ this.component_name +'.component.ts'),
            {folder_name: this.component_name, class_name: this.component_class}
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
    }
});
