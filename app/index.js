/**
 * Created by ZZS on 11/1/16.
 */
var generators = require('yeoman-generator');
var _ = require('lodash');
var esprima = require('esprima');
var fs = require('fs');

module.exports = generators.Base.extend({
    constructor: function () {
        // calling super first
        generators.Base.apply(this, arguments);

        // must pass in an absolute path so use templatePath
        this.log('Current generator-ng2component VERSION: '+this.fs.readJSON(this.templatePath('../../package.json'), 'no_file_error').version);

        // this helper help to change show-message to ShowMessage
        this.toClassNameHelper = function(input){
            return _.join(input.split('-').map(function (s) {
                return _.upperFirst(s);
            }), '');
        };

        this.findRelativePath = function (put, beput) {
            var arr = [put, beput];
            var commonStart = this.findCommonPath(arr);
            var needToJump = put.substring(commonStart.length).split('/').length;
            var relativePath = '';
            for (var i = 0; i < needToJump; i++) {
                relativePath += '../';
            }
            relativePath += beput.substring(commonStart.length);
            return relativePath;
        };

        this.findCommonPath = function(array){
            var A= array.concat().sort(),
                a1= A[0], a2= A[A.length-1], L= a1.length, i= 0;
            while (i<L && a1.charAt(i)=== a2.charAt(i)) i++;
            while (a1.charAt(i) != '/') i--; // back to slash

            return a1.substring(0, i+1);
        };


        // init some variables
        this.generate_opt = ['component'];
        this.component_name = 'show-message';
        this.component_location = 'src/app';
        this.component_class = 'ShowMessageComponent';
        this.component_style = 'scss';
        this.service_name = 'device';
        this.service_location = 'src/app/shared/services';
        this.service_class = '';
        this.use_service = false;
        this.omit_index = false;
    },
    // this function used to interact with user
    prompting: function () {
        return this.prompt([{
            type    : 'checkbox',
            name    : 'generate_opt',
            message : 'Generate a cmp/service?',
            choices : ['component', 'service'],
            default : this.generate_opt,
            store   : true
        }, {
            type    : 'input',
            name    : 'component_name',
            message : 'Name for this Component & its Folder? [Use kebab-case; Folder & cmp shares the same name]',
            store   : true,
            default : this.component_name,
            when    : function (answers) {
                return answers.generate_opt.indexOf('component') != -1;
            }
        }, {
            type    : 'input',
            name    : 'component_location',
            message : 'Resides location? [Enter \'.\' for current, or type full path beneath current directory]',
            store   : true,
            default : this.component_location,
            when    : function (answers) {
                return answers.generate_opt.indexOf('component') != -1;
            }
        }, {
            type    : 'list',
            name    : 'component_style',
            choices : ['scss', 'css', 'less'],
            message : 'Style sheets?',
            default : this.component_style,
            store   : true,
            when    : function (answers) {
                return answers.generate_opt.indexOf('component') != -1;
            }
        }, {
            type    : 'input',
            name    : 'service_name',
            message : 'Name for this Service & its Folder? [Use kebab-case; Folder & service shares the same name]',
            store   : true,
            default : this.service_name,
            when    : function (answers) {
                return answers.generate_opt.indexOf('service') != -1;
            }
        }, {
            type    : 'input',
            name    : 'service_location',
            message : 'Resides location? [Enter \'.\' for current, or type full path beneath current directory]',
            store   : true,
            default : this.service_location,
            when    : function (answers) {
                return answers.generate_opt.indexOf('service') != -1;
            }
        }, {
            type    : 'confirm',
            name    : 'use_service',
            message : 'Use service in new component?',
            default : this.use_service,
            store   : true,
            when    : function (answers) {
                return answers.generate_opt.indexOf('service') != -1 && answers.generate_opt.indexOf('component') != -1;
            }
        }, {
            type    : 'confirm',
            name    : 'omit_index',
            message : 'Omit all index.ts? [recommend don\'t omit]',
            default : this.omit_index,
            store   : true
        }]).then(function (answers) {
            // change our instance variable
            this.generate_opt = answers.generate_opt;
            this.omit_index = answers.omit_index;
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
                this.use_service = answers.use_service;
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
            if (this.use_service) {
                var service_pos = this.findRelativePath(this.destinationPath(this.component_location+'/'+ this.component_name), this.destinationPath(this.service_location+'/'+ this.service_name));
                var put_service = 'import { '+this.service_class+"Service } from '"+service_pos+"';";
                var service_instance = _.camelCase(this.service_class)+'Service';
                var service_class_full = this.service_class+'Service';
            }
            this.fs.copyTpl(
                this.templatePath('template.component.ts'),
                this.destinationPath(this.component_location+'/'+ this.component_name + '/'+ this.component_name +'.component.ts'),
                {folder_name: this.component_name, class_name: this.component_class, style_suffix: this.component_style,
                    put_service: put_service, service_instance: service_instance, service_class_full: service_class_full}
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
            if (!this.omit_index) {
                this.fs.copyTpl(
                    this.templatePath('index.ts'),
                    this.destinationPath(this.component_location+'/'+ this.component_name + '/index.ts'),
                    {folder_name: this.component_name, suffix: 'component'}
                );
            }

            // starting read app.module.ts
            var module_path = this.component_location + '/app.module.ts';
            // set component path ref, if use index.ts then it's enough to import until folder name
            var cmpImport = "import { " + this.component_class + " } from './" + this.component_name;
            if (this.omit_index) {
                cmpImport += '/' + this.component_name + ".component';\n";
            } else {
                cmpImport += "';\n";
            }
            var cmpDeclare = '\n\t\t' + this.component_class + ',';
            fs.open(module_path, 'r+', function (err, fd) {
                if (err) {
                    throw err;
                } else {
                    fs.stat(module_path, function (err, stats) {
                        if (err) throw err;
                        var buffer = Buffer.allocUnsafe(stats.size);
                        fs.read(fd, buffer, 0, buffer.length, null, function (err, bytesRead, buffer) {
                            if (err) throw err;

                            if (buffer.length === 0) { // if not find app.module then create one with

                            } else {
                                var writeBack = cmpImport + buffer.toString('utf8', 0, buffer.length);
                                var writeBackArr = writeBack.split('');

                                var declarationsPos = writeBack.indexOf("declarations:");
                                var insertPos;
                                if (declarationsPos > -1) { // if already have declarations field
                                    insertPos = writeBack.indexOf('[', declarationsPos) + 1;
                                    writeBackArr.splice(insertPos, 0, cmpDeclare); // splice will return the thing being removed
                                    writeBack = writeBackArr.join('');
                                } else { // no declarations field, then create one
                                    insertPos = writeBack.indexOf('@NgModule({') + 11;
                                    writeBackArr.splice(insertPos, 0, '\n\tdeclarations: [' + cmpDeclare + '\n\t],'); // splice will return the thing being removed
                                    writeBack = writeBackArr.join('');
                                }

                                fs.write(fd, writeBack, 0, writeBack.length, function(err) {
                                    if (err) throw err;
                                });

                            }
                            fs.close(fd);
                        })
                    })
                }
            })


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
            if (!this.omit_index) {
                this.fs.copyTpl(
                    this.templatePath('index.ts'),
                    this.destinationPath(this.service_location+'/'+ this.service_name + '/index.ts'),
                    {folder_name: this.service_name, suffix: 'service'}
                );
            }

            this.log('Service Created!');
        }
    }
});
