import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DisplayTitleComponent } from './features/olympics/components/display-title/display-title.component';
import { DisplayIndicatorComponent } from './features/olympics/components/display-indicator/display-indicator.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, DisplayTitleComponent, DisplayIndicatorComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
