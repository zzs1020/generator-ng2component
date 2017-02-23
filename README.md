# generator-ng2component
**An angular 2 component/service generator (based on new namespace '@angular/core') that can generate templates for all kinds of angular2 projects.**    

>**To use the tool, please follow these steps: ( Assuming you have installed node.js)**

1. install yeoman (you may need 'sudo' for permission)
    > npm install -g yo
    
2. install my tool (with or without -g)
    > npm install -g generator-ng2component
    
3. run via yeoman
    > yo ng2component
    
4. follow the command line instructions, and your component will be populated in designated directory.
    > it will prompt questions based on your **1st choice**:

    - **what do u wanna generate?**  
        you can generate either component or service or both! default only component
        - **component name?**  
            default: show-message  
        - **resides position?**  
            default under: your_project_root/src/app/, enter '.' will generate in current folder    
        - **style sheet?**  
            choose from scss, css, less  
        - **service name?**  
            default: device  
        - **service resides position?**  
            default under: your_project_root/src/app/shared/services/    
        - **omit index.ts?**  
            default: false. it will generate index.ts for each of your cmp/service

    > normally, it will generate following (example) structure under your project/src/app:

    ```
    project-root/
    ├── src/
    │   └── app/
    │       ├── show-message/
    │       │    ├── show-message.component.ts
    │       │    ├── show-message.component.spec.ts
    │       │    ├── show-message.component.scss[less][css]
    │       │    ├── show-message.component.html
    │       │    └── index.ts
    │       └── shared/
    │            └── device/
    │                ├── device.service.ts
    │                ├── device.service.spec.ts
    │                ├── device.ts
    │                └── index.ts
    ```

Find more generators on yeoman: http://yeoman.io/generators/

> TODO (some thoughts):  

1. add 'generate e2e test' option
    * where do u want to generate
    
You're welcome to contribute (open issues, PRs)!
Also, if you think this tool is helpful, please watch/star/fork me on github/npmjs and let more people know it!

## developing logs
> Check current version: npm view generator-ng2component version  
> Check newest version: npm outdated generator-ng2component  
> Update your local version: npm install generator-ng2component

**02/22/2017 v1.0.9** capable to omit generating index.ts now  
**11/12/2016 v1.0.6** generator is capable to import service automatically into component now  
**11/09/2016 v1.0.3** now you have stable service generator  
**11/8/2016 v0.0.11** fixed ts linting warnings  
**11/07/2016 v0.0.7** added global colors/fonts ref to scss  
**11/01/2016 v0.0.5** first stable version, can only generate component