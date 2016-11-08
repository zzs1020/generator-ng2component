import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-<%=folder_name %>',
    templateUrl: '<%=folder_name %>.component.html',
    styleUrls: ['<%=folder_name %>.component.<%=style_suffix %>']
})

export class <%=class_name %> implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
// to make your component work,
// remember to manually declare this component at your app.module.ts
