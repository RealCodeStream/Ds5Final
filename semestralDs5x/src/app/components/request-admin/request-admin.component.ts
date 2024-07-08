import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { RequestService } from '../../service/request.service'; 
@Component({
  selector: 'app-request-admin',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './request-admin.component.html',
  styleUrls: ['./request-admin.component.css'],
  providers: [RequestService]
})
export class RequestAdminComponent implements OnInit {
  requests: any[] = [];

  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.fetchRequests();
  }

  fetchRequests() {
    this.requestService.getAllRequests().subscribe(
      (data: any) => {
        this.requests = data;
      },
      (error: any) => {
        console.error('Error fetching requests:', error);
      }
    );
  }

  acceptRequest(requestId: string) {
    this.requestService.updateRequestStatus(requestId, 'Accepted').subscribe(
      () => {
        this.fetchRequests();
      },
      (error: any) => {
        console.error('Error accepting request:', error);
      }
    );
  }

  rejectRequest(requestId: string) {
    this.requestService.updateRequestStatus(requestId, 'Rejected').subscribe(
      () => {
        this.fetchRequests();
      },
      (error: any) => {
        console.error('Error rejecting request:', error);
      }
    );
  }
}
