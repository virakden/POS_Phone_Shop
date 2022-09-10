import { Component } from '@angular/core';
import { UserProfileService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'velzon';

  constructor (private userProfileService: UserProfileService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.onGetUsers();
  }

  onGetUsers(): void {
    this.userProfileService.getAll().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting users')
    );
  }
  
}
