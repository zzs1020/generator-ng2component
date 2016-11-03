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

    > normally, it will generate following structure under your project/src/app:

    ```
    --| show-message/
        --| show-message.component.ts
        --| show-message.component.spec.ts
        --| show-message.component.scss[less][css]
        --| show-message.component.html
    ```

Find more generators on yeoman: http://yeoman.io/generators/

> TODO: 
    1. add 'generate service' option
    2. add test