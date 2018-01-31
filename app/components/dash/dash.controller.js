export default class DashCtrl {
  constructor(User, Bandwidth, moment) {
    'ngInject';
    this.Bandwidth = Bandwidth;
    this.moment = moment;

    this.axisExtent = null;
    this.capacityChart = null;
    this.viewersChart = null;
    this.datapoints = [];
    this.datacolumns = [{
      'id': 'cdn',
      'type': 'area-spline',
      'name': 'cdn'
    }, {
      'id': 'p2p',
      'type': 'area-spline',
      'name': 'Top two'
    }];
    this.cdnMax = null;
    this.p2pMax = null;

    this.datax = { 'id': 'x' };
    this.isLoaded = false;

    this.handleCapacityChart = (chart) => {
      this.capacityChart = chart;
      this.capacityChart.legend.hide();
    }

    this.handleViewersChart = (chart) => {
      this.viewersChart = chart;
      this.viewersChart.legend.hide();
    }

    this.handleZoomCapacityChart = (domain) => {
      this.axisExtent = domain;

      if (this.viewersChart) {
        this.viewersChart.fastZoom(domain);
      }
    }

    this.handleZoomViewersChart = (domain) => {
      this.axisExtent = domain;

      if (this.capacityChart) {
        this.capacityChart.fastZoom(domain);
      }
    }
    
    this.contentFormatFunction = () => {
      return '<h1 class="chart-tooltip">test</h1>';
    }

    this.handleResized = () => {
      // temporary fix of https://github.com/c3js/c3/issues/2275

      if (this.capacityChart) {
        this.capacityChart.fastZoom(this.axisExtent);
      }

      if (this.viewersChart) {
        this.viewersChart.fastZoom(this.axisExtent);
      }
    }

    this.loadBandwidth(1516024384269, 1517359984269);
  }

  loadBandwidth(from, to) {
    this.Bandwidth.loadData(from, to).then((result) => {
      this.calculateChartsData(result);
    }, () => {

    })
  }

  calculateChartsData(result) {
    if (!result.data.cdn || !result.data.p2p) {
      return;
    }

    result.data.cdn.forEach((item, index) => {
      const cdnValue = this.getGbps(item[1]);
      const p2pValue = this.getGbps(result.data.p2p[index][1]);

      this.datapoints.push({
        x: this.moment(item[0]).toDate(),
        'cdn': cdnValue,
        'p2p': p2pValue,
      });

      if (!this.cdnMax || cdnValue > this.cdnMax) {
        this.cdnMax = cdnValue;
      }

      if (!this.p2pMax || p2pValue > this.p2pMax) {
        this.p2pMax = p2pValue;
      }

      this.isLoaded = true;
    });

    return;
  }

  getP2pMaxGridText() {
    return `Maximum throughput ${this.cdnMax} Gbps`;
  }

  getCdnMaxGridText() {
    return `Maximum CDN contribution ${this.p2pMax} Gbps`;
  }

  getGbps(bytes) {
    return Number((bytes * 0.000000001).toFixed(1));
  }
}
