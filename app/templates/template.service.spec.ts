import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
// import { <%=class_name%> } from './<%=folder_name%>';
import { <%=class_name%>Service } from './<%=folder_name%>.service';

describe('<%=class_name%>Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                <%=class_name%>Service
            ],
            imports: [
                HttpModule
            ]
        });

    });

    xit('#<%=class_name%>Service should be defined', inject([<%=class_name%>Service], (service: <%=class_name%>Service) => {
        expect(service).toBeDefined();
    }));
});
