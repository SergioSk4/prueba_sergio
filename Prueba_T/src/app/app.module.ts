import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { EmptyComponent } from './user/empty/empty.component';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, UserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
