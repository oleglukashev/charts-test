export default class DashCtrl {
  constructor() {
    'ngInject';

    this.axisExtent = [0,5];
    this.theChart = null;
    this.theChart2 = null;

    this.handleCallbackChart = (chartObj) => {
      this.theChart = chartObj;
      this.theChart.legend.hide();
    }

    this.handleCallbackChart2 = (chartObj) => {
      this.theChart2 = chartObj;
      this.theChart2.legend.hide();
    }

    this.showBrush = (domain) => {
      this.theChart2.fastZoom(domain);
    }
    
    this.contentFormatFunction = () => {
      return '<h1 class="chart-tooltip">C3JS AngularJS Directives - Examples</h1>';
    }
  }
}
