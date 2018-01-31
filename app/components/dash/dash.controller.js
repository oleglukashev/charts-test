export default class DashCtrl {
  constructor(User, Bandwidth, Audience, AppConstants, moment) {
    'ngInject';

    this.Bandwidth = Bandwidth;
    this.Audience = Audience;
    this.moment = moment;

    this.axisExtent = null;
    this.capacityChart = null;
    this.viewersChart = null;
    this.capacityDatapoints = [];
    this.viewersDatapoints = [];
    this.capacityColumns = [{
      id: 'cdn',
      type: 'area-spline',
      width: 2,
      color: AppConstants.colors.berry,
      name: 'cdn',
    }, {
      id: 'p2p',
      type: 'area-spline',
      width: 2,
      color: AppConstants.colors.lightBlue,
      name: 'p2p',
    }];
    this.viewersColumns = [{
      id: 'viewers',
      type: 'spline',
      width: 2,
      color: AppConstants.colors.deepOrange,
      name: 'viewers',
    }];
    this.cdnMax = null;
    this.p2pMax = null;

    this.datax = { id: 'x' };
    this.isLoaded = false;
    this.periodOptions = [
      { name: 'Last month', value: 'month' },
      { name: 'Last week', value: 'week' },
      { name: 'Last day', value: 'day' },
      { name: 'Last hour', value: 'hour' },
    ];
    this.period = this.periodOptions[0].value;

    this.handleCapacityChart = (chart) => {
      this.capacityChart = chart;
      this.capacityChart.legend.hide();
    };

    this.handleViewersChart = (chart) => {
      this.viewersChart = chart;
      this.viewersChart.legend.hide();
    };

    this.handleZoomCapacityChart = (domain) => {
      this.axisExtent = domain;

      if (this.viewersChart) {
        this.viewersChart.fastZoom(domain);
      }
    };

    this.handleZoomViewersChart = (domain) => {
      this.axisExtent = domain;

      if (this.capacityChart) {
        this.capacityChart.fastZoom(domain);
      }
    };

    this.contentCapacityChartFunction = (data) => {
      let resultHTML = '<div class="c3-tooltip-popup modal-content"><div>';
      let title;
      let totalValue = 0;
      let sprikePercent = 0;
      
      data.forEach((item) => {
        const dateTime = this.moment(item.x).format('dddd, MMMM DD, YYYY HH:mm a');

        if (!title) {
          resultHTML += `<h4><b>${dateTime}</b></h4>`;
          title = dateTime;
        }

        totalValue += item.value;
        resultHTML += `<p class='tooltip-${item.id}'><span class='tooltip-mark'></span>${item.id}: <span>${item.value} Gbps</span></p>`;
      });

      sprikePercent = parseInt(data[1].value * 100 / totalValue);

      resultHTML += `<hr />`;
      resultHTML += `<p class='tooltip-sum'>Total: <span>${Number(totalValue.toFixed(1))} Gbps</span></p>`;
      resultHTML += `<p class='tooltip-sprike'>Sprike reduction: <span>${sprikePercent} %</span></p>`;

      return resultHTML += `</div>`;
    }

    this.contentViewersChartFunction = (data) => {
      let resultHTML = '<div class="c3-tooltip-popup modal-content"><div>';
      let title;

      const dateTime = this.moment(data[0].x).format('dddd, MMMM DD, YYYY HH:mm a');
      resultHTML += `<h4><b>${dateTime}</b></h4>`;
      resultHTML += `<p class='tooltip-${data[0].id}'><span class='tooltip-mark'></span>${data[0].id}: <span>${data[0].value}</span></p>`;

      return resultHTML += `</div>`;
    }


      
    this.contentYTickFunction = (d) => `${d} Gbps`;

    this.handleResized = () => {
      // temporary fix of https://github.com/c3js/c3/issues/2275

      if (this.capacityChart) {
        this.capacityChart.fastZoom(this.axisExtent);
      }

      if (this.viewersChart) {
        this.viewersChart.fastZoom(this.axisExtent);
      }
    };

    this.loadData();
  }

  loadBandwidth() {
    const period = this.getDatesDuringCurrentPeriod();

    this.Bandwidth.loadData(period.from, period.to).then((result) => {
      this.calculateCapacityChartData(result);
    }, () => {});
  }

  loadAudience() {
    const period = this.getDatesDuringCurrentPeriod();

    this.Audience.loadData(period.from, period.to).then((result) => {
      this.calculateViewersChartData(result);
    }, () => {});
  }

  loadData() {
    this.loadBandwidth();
    this.loadAudience();
  }

  calculateCapacityChartData(result) {
    if (!result.data.cdn.length || !result.data.p2p.length) {
      return false;
    }

    const data = [];
    this.capacityDatapoints = [];
    this.axisExtent = null;

    result.data.cdn.forEach((item, index) => {
      const cdnValue = this.getGbps(item[1]);
      const p2pValue = this.getGbps(result.data.p2p[index][1]);
      data.push({
        x: this.moment(item[0]).toDate(),
        cdn: cdnValue,
        p2p: p2pValue,
      });

      if (!this.cdnMax || cdnValue > this.cdnMax) {
        this.cdnMax = cdnValue;
      }

      if (!this.p2pMax || p2pValue > this.p2pMax) {
        this.p2pMax = p2pValue;
      }
    });

    this.capacityDatapoints = data;

    if (this.capacityChart) {
      this.capacityChart.fastUnzoom();
    }

    this.isLoaded = true;
  }

  calculateViewersChartData(result) {
    if (!result.data.audience.length) {
      return false;
    }

    const data = [];
    this.viewersDatapoints = [];
    this.axisExtent = null;
    result.data.audience.forEach((item, index) => {
      data.push({
        x: this.moment(item[0]).toDate(),
        viewers: item[1],
      });
    });

    this.viewersDatapoints = data;

    if (this.viewersChart) {
      this.viewersChart.fastUnzoom();
    }

    this.isLoaded = true;
  }

  getP2pMaxGridText() {
    return `Maximum throughput ${this.p2pMax} Gbps`;
  }

  getCdnMaxGridText() {
    return `Maximum CDN contribution ${this.cdnMax} Gbps`;
  }

  getGbps(bytes) {
    return Number((bytes * 0.000000001).toFixed(1));
  }

  getDatesDuringCurrentPeriod() {
    const currentTime = this.moment();
    const to = currentTime.format('x');
    const from = currentTime.subtract(1, this.period).format('x');

    return { from, to };
  }
}
