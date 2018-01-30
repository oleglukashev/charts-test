export default class DashCtrl {
  constructor() {
    'ngInject';

    this.axisExtent = null;
    this.capacityChart = null;
    this.viewersChart = null;

    this.handleCapacityChartCallback = (chart) => {
      this.capacityChart = chart;
      this.capacityChart.legend.hide();
    }

    this.handleViewersChartCallback = (chart) => {
      this.viewersChart = chart;
      this.viewersChart.legend.hide();
    }

    this.handleBrushCallback = (domain) => {
      this.axisExtent = domain;

      if (this.viewersChart) {
        this.viewersChart.fastZoom(domain);
      }
    }
    
    this.contentFormatFunction = () => {
      return '<h1 class="chart-tooltip">test</h1>';
    }

    this.onResizedCallback = () => {
      // temporary fix of https://github.com/c3js/c3/issues/2275

      if (this.capacityChart) {
        this.capacityChart.fastZoom(this.axisExtent);
      }

      if (this.viewersChart) {
        this.viewersChart.fastZoom(this.axisExtent);
      }
    }
  }
}
