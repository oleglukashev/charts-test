export default class DashCtrl {
  constructor(User, Bandwidth, Audience, DashChartsFactory, moment, $window, $timeout) {
    'ngInject';

    DashChartsFactory(this);

    this.Bandwidth = Bandwidth;
    this.Audience = Audience;
    this.moment = moment;
    this.$window = $window;
    this.$timeout = $timeout;

    this.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(),
      minDate: this.moment().subtract(1, 'month').toDate(),
      startingDay: 1,
    };
    this.format = 'dd MMMM yyyy';

    this.fromDatePickerOpened = false;
    this.toDatePickerOpened = false;
    this.fromDate = this.moment().subtract(1, this.period).toDate();
    this.toDate = new Date();

    this.loadData();
  }

  loadBandwidth() {
    this.Bandwidth.loadData(this.fromDate.getTime(), this.toDate.getTime()).then((result) => {
      if (result.status === 200) {
        this.calculateCapacityChartData(result);
      } else {
        alert('Bandwidth: load error. Try to logout and refresh page');
      }
    }, () => {
      alert('Bandwidth: load error. Try to logout and refresh page');
    });
  }

  loadAudience() {
    this.Audience.loadData(this.fromDate.getTime(), this.toDate.getTime()).then((result) => {
      if (result.status === 200) {
        this.calculateViewersChartData(result);
        this.$timeout(() => {
          this.loadBandwidth();
        }, 500);
      } else {
        alert('Audience: load error. Try to logout and refresh page');
      }
    }, () => {
      alert('Audience: load error. Try to logout and refresh page');
    });
  }

  loadData() {
    this.capacityChartIsLoaded = false;
    this.viewersChartIsLoaded = false;
    this.loadAudience();
  }

  calculateCapacityChartData(result) {
    const data = [];
    this.capacityDatapoints = [];
    this.axisExtent = null;

    if (result.data.cdn.length && result.data.p2p.length) {
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
    }

    this.capacityDatapoints = data;
    if (this.capacityChart) {
      this.capacityChart.fastUnzoom();
    }
    this.capacityChartIsLoaded = true;
  }

  calculateViewersChartData(result) {
    const data = [];
    this.viewersDatapoints = [];
    this.axisExtent = null;

    if (result.data.audience.length) {
      result.data.audience.forEach((item) => {
        data.push({
          x: this.moment(item[0]).toDate(),
          viewers: item[1],
        });
      });
    }

    this.viewersDatapoints = data;
    if (this.viewersChart) {
      this.viewersChart.fastUnzoom();
    }
    this.viewersChartIsLoaded = true;
  }

  openFromDatePicker() {
    this.fromDatePickerOpened = true;
  }

  openToDatePicker() {
    this.toDatePickerOpened = true;
  }

  changeDatesAndLoadData() {
    const currentTime = this.moment();
    this.toDate = currentTime.toDate();
    this.fromDate = currentTime.subtract(1, this.period).toDate();

    this.loadData();
  }
}
