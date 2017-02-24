import { Component, OnInit } from '@angular/core';<%if(put_service != null){%>
<%-put_service%><%}%>

@Component({
    selector: 'my-<%=folder_name %>',
    templateUrl: './<%=folder_name %>.component.html',
    styleUrls: ['./<%=folder_name %>.component.<%=style_suffix %>']<%if(put_service != null){%>,<%}%><%if(put_service != null){%>
    providers: [ <%=service_class_full %> ]<%}%>
})
export class <%=class_name %> implements OnInit {
    constructor(<%if(put_service != null){%>public <%=service_instance%>: <%=service_class_full %><%}%>) {
    }

    ngOnInit() {
    }
}

// if you don't have src/app/app.module.ts set up, then you may declare this component manually to make it works
