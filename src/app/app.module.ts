import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { CitiesComponent } from "./cities/cities.component";
import { IntentComponent } from "./intent/intent.component";

import { IntentService } from "./intent.service";
//interceptor
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JWTInterceptor } from "./intercept.service";

@NgModule({
  declarations: [AppComponent, CitiesComponent, IntentComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "intent", pathMatch: "full" },
      { path: "cities", component: CitiesComponent },
      { path: "intent", component: IntentComponent }
    ]),
    ReactiveFormsModule
  ],
  providers: [
    IntentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
