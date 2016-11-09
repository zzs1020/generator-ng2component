# generator-ng2component
An angular 2 component generator (based on new namespace '@angular/core')

**To use the tool, please follow these steps: ( Assuming you have installed node.js)**

1. install yeoman
    > npm install -g yeoman
    
2. install my tool (with or without -g)
    > npm install -g generator-ng2component
    
3. run via yeoman
    > yo ng2component
    
4. follow the command line instructions, and your component will be populated in designated folder.
    > it will prompt:

    - **component name?** default: show-message  
    - **resides position?** default under: your_project_root/src/app/  
    - **style sheet?** choose from scss, css, less  

    > normally, it will generate following (example) structure under your project/src/app:

    ```
    project-root/
    ├── src/
    │   └── app/
    │       └── show-message/
    │           ├── show-message.component.ts
    │           ├── show-message.component.spec.ts
    │           ├── show-message.component.scss[less][css]
    │           ├── show-message.component.html
    │           └── index.ts
    ```

Find more generators on yeoman: http://yeoman.io/generators/

> TODO (some thoughts):  

1. add 'generate service' option  
    * input 0 at the 'component name' to only generate service
    * answer 0 or service name to [not]generate service
2. add 'generate e2e test' option
    * where do u want to generate
    
Actively upgrade (every Monday?)! Please often come back and check new version. You're welcome to contribute. 
Also, if you think this tool helpful, please watch/star/fork me on github/npmjs and let more people know it!
