export default function DashChartsFactory(moment, AppConstants) {
  'ngInject';

  return (that) => {
    const instance = that;

    instance.axisExtent = null;
    instance.capacityChart = null;
    instance.viewersChart = null;
    instance.capacityDatapoints = [];
    instance.viewersDatapoints = [];
    instance.capacityColumns = [{
      id: 'cdn',
      type: 'area-spline',
      color: AppConstants.colors.berry,
      name: 'cdn',
    }, {
      id: 'p2p',
      type: 'area-spline',
      color: AppConstants.colors.lightBlue,
      name: 'p2p',
    }];
    instance.viewersColumns = [{
      id: 'viewers',
      type: 'spline',
      color: AppConstants.colors.deepOrange,
      name: 'viewers',
    }];
    instance.cdnMax = null;
    instance.p2pMax = null;

    instance.datax = { id: 'x' };
    instance.capacityChartIsLoaded = false;
    instance.viewersChartIsLoaded = false;
    instance.periodOptions = [
      { name: 'Last month', value: 'month' },
      { name: 'Last week', value: 'week' },
      { name: 'Last day', value: 'day' },
      { name: 'Last hour', value: 'hour' },
    ];

    instance.period = instance.periodOptions[0].value;

    instance.handleCapacityChart = (chart) => {
      instance.capacityChart = chart;
      instance.capacityChart.legend.hide();
    };

    instance.handleViewersChart = (chart) => {
      instance.viewersChart = chart;
      instance.viewersChart.legend.hide();
    };

    instance.handleZoomCapacityChart = (domain) => {
      instance.axisExtent = domain;

      if (instance.viewersChart) {
        instance.viewersChart.fastZoom(domain);
      }
    };

    instance.handleZoomViewersChart = (domain) => {
      instance.axisExtent = domain;

      if (instance.capacityChart) {
        instance.capacityChart.fastZoom(domain);
      }
    };

    instance.contentCapacityChartFunction = (data) => {
      let resultHTML = '<div id="tooltip" class="c3-tooltip-popup modal-content"><div>';
      let title;
      let totalValue = 0;
      let sprikePercent = 0;

      data.forEach((item) => {
        const dateTime = moment(item.x).format('dddd, MMMM DD, YYYY HH:mm a');

        if (!title) {
          resultHTML += `<h4><b>${dateTime}</b></h4>`;
          title = dateTime;
        }

        totalValue += item.value;
        resultHTML += `<p class='tooltip-${item.id}'><span class='tooltip-mark'></span>${item.id}: <span>${item.value} Gbps</span></p>`;
      });

      if (data.length === 2) {
        sprikePercent = parseInt((data[1].value * 100) / totalValue) || 0;
      }

      resultHTML += '<hr />';
      resultHTML += `<p class='tooltip-sum'>Total: <span>${Number(totalValue.toFixed(1))} Gbps</span></p>`;
      resultHTML += `<p class='tooltip-sprike'>Sprike reduction: <span>${sprikePercent} %</span></p>`;
      resultHTML += '</div>';
      return resultHTML;
    };

    instance.contentViewersChartFunction = (data) => {
      let resultHTML = '<div id="tooltip" class="c3-tooltip-popup modal-content"><div>';

      const dateTime = instance.moment(data[0].x).format('dddd, MMMM DD, YYYY HH:mm a');
      resultHTML += `<h4><b>${dateTime}</b></h4>`;
      resultHTML += `<p class='tooltip-${data[0].id}'><span class='tooltip-mark'></span>${data[0].id}: <span>${data[0].value}</span></p>`;

      resultHTML += '</div>';
      return resultHTML;
    };

    instance.contentYTickFunction = (d) => `${d} Gbps`;
    instance.tooltipPositionFunction = (data, width, height, element) => {
      const doc = instance.$window.document;
      const chartOffsetX = doc.querySelector('#capacityChart').getBoundingClientRect().left;
      const xElement = parseInt(element.getAttribute('x'));
      return { top: 140, left: chartOffsetX + xElement };
    };

    instance.handleResized = () => {
      // temporary fix of https://github.com/c3js/c3/issues/2275

      if (instance.capacityChart) {
        instance.capacityChart.fastZoom(instance.axisExtent);
      }

      if (instance.viewersChart) {
        instance.viewersChart.fastZoom(instance.axisExtent);
      }
    };

    instance.getP2pMaxGridText = () => `Maximum throughput ${instance.p2pMax} Gbps`;

    instance.getCdnMaxGridText = () => `Maximum CDN contribution ${instance.cdnMax} Gbps`;

    instance.getGbps = (bytes) => Number((bytes * 0.000000001).toFixed(1));
  };
}
