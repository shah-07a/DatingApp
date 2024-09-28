import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideClientHydration } from '@angular/platform-browser';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,  // Spread the existing providers from appConfig
    provideClientHydration(),  // Add client-side hydration provider
    // Add any additional client-side providers here if needed
  ],
})
  .catch((err) => console.error(err));

