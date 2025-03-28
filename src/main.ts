import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Chart } from 'chart.js';
import 'chartjs-adapter-luxon';
import annotationPlugin from 'chartjs-plugin-annotation';
import { AppModule } from './app/app.module';
import customPlugin from './app/platform/chart-plugin/corsair';
import { environment } from './environments/environment';

Chart.register(annotationPlugin)
Chart.register(customPlugin)

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
