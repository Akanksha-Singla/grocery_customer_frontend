import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { cartReducer } from './features/cart/store/cart.reducer';
import { provideEffects } from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { CartEffect } from './features/cart/store/cart.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({'cart':cartReducer}),
    provideEffects([CartEffect]),
    provideStoreDevtools({maxAge:25,logOnly:!isDevMode()})
],
};
