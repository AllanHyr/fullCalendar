import { sliceEvents, createPlugin } from '@fullcalendar/core';

const CustomViewConfig = {
  classNames: [ 'custom-view' ],

  content: function(props) {
    let segs = sliceEvents(props, true); // allDay=true
    let html =
      '<div class="view-title">' +
        props.dateProfile.currentRange.start.toUTCString() +
      '</div>' +
      '<div class="view-events">' +
        segs.length + ' events' +
      '</div>'

    return { html: html }
  },

  didMount: function(props) {
    console.log('custom view now loaded');
  },

  willUnmount: function(props) {
    console.log('about to change away from custom view');
  }
}

export default createPlugin({
  views: {
    custom: CustomViewConfig
  }
});