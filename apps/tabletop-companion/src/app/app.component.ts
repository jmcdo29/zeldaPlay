import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Message } from "@tabletop-companion/api-interface";

@Component({
  selector: "tabletop-companion-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  hello$ = this.http.get<Message>("/api/hello");
  constructor(private http: HttpClient) {}
}
