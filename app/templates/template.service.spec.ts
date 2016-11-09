import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { <%=service_name%> } from './<%=service_folder_name%>';
import { <%=service_name%>Service } from './<%=service_folder_name%>.service';

describe('<%=service_name%>ServiceTest', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                <%=service_name%>Service
            ],
            imports: [
                HttpModule
            ]
        });

    });

    it('#<%=service_name%>Service should be defined', inject([<%=service_name%>Service], (service: <%=service_name%>Service) => {
        expect(service).toBeDefined();
    }));
});
