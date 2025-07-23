import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // Import provideRouter
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()] // Add provideRouter with your routes and provideHttpClient
};