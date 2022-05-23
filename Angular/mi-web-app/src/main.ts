import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
//TOma la configracion del app.Module.ts , y la refleja en la pantalla index html
platformBrowserDynamic().bootstrapModule(AppModule)  //El objeto app module representa la ruta de ejecucion de cada proyecto angular
  .catch(err => console.error(err));
