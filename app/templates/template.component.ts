import { Component, OnInit } from '@angular/core';<%if(put_service != null){%>
<%-put_service%><%}%>

@Component({
    selector: 'my-<%=folder_name %>',
    templateUrl: '<%=folder_name %>.component.html',
    styleUrls: ['<%=folder_name %>.component.<%=style_suffix %>']<%if(put_service != null){%>,<%}%><%if(put_service != null){%>
    providers: [ <%=service_class_full %> ]<%}%>
})
export class <%=class_name %> implements OnInit {
    constructor(<%if(put_service != null){%>public <%=service_instance%>: <%=service_class_full %><%}%>) {
    }

    ngOnInit() {
    }
}

// to make your component work,
// remember to manually declare this component at your app.module.ts
