import { Component, OnInit } from '@angular/core';
import { GraphqlService } from './services/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: any;
  constructor(private service: GraphqlService) {

  }

  ngOnInit(): void {
    this.service.user.subscribe(data => {
      this.user = data;
    });
    this.service.updateUser().subscribe();
  }

  logar(){
    location.href = "https://api-staging.csgoroll.com/auth/steam?redirectUri=http://localhost:4200";
  }

  getWallet() {
    return (<any[]>this.user.wallets).reduce((acc, x) => acc += x.amount, 0)
  }
}
