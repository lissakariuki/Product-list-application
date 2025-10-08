import { Component } from '@angular/core';
import { RouterOutlet,RouterModule} from '@angular/router';
import { ShimmerModule } from '@sreyaj/ng-shimmer';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'product-list';
  isLoading = false; 
}