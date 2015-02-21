
var React = require('react');
var Color = require('color');

module.exports = React.createClass({displayName: "exports",

  getDefaultProps: function() {
    return {
      value: '',
      onChange: false,
      inline: true,
      tabIndex: 0,
      classNames: {
        container: 'flex flex-center',
        rangeGroup: 'px1',
        rangeLabel: 'h5 bold lh1 block',
        range: 'full-width m0 range-light',
      }
    }
  },

  getInitialState: function() {
    var hsl = Color(this.props.value).hsl();
    return {
      hue: hsl.h,
      saturation: hsl.s,
      lightness: hsl.l,
    }
  },

  updateColor: function() {
    var hex = Color({
      h: this.state.hue,
      s: this.state.saturation,
      l: this.state.lightness
    }).hexString();
    if (hex != this.props.value) {
      this.props.onChange(hex);
    }
  },

  updateHue: function(e) {
    this.setState({ hue: e.target.value }, function() {
      this.updateColor();
    });
  },

  updateSaturation: function(e) {
    this.setState({ saturation: e.target.value }, function() {
      this.updateColor();
    });
  },

  updateLightness: function(e) {
    this.setState({ lightness: e.target.value }, function() {
      this.updateColor();
    });
  },

  componentWillReceiveProps: function(nextProps) {
    try {
      var hsl = Color(nextProps.color).hsl();
      this.setState({
        hue: hsl.h,
        saturation: hsl.s,
        lightness: hsl.l,
      });
    } catch(e) {
    }
  },

  renderRange: function(range) {
    return (
      React.createElement("div", {className: this.props.classNames.rangeGroup}, 
        React.createElement("label", {className: this.props.classNames.rangeLabel}, 
          range.label, " ", range.value, range.symbol
        ), 
        React.createElement("input", {type: "range", 
          className: this.props.classNames.range, 
          value: range.value, 
          onChange: range.onChange, 
          min: range.min, 
          max: range.max, 
          tabIndex: this.props.tabIndex}
          )
      )
    )
  },

  render: function() {
    var ranges = [
      {
        label: 'Hue',
        value: this.state.hue,
        onChange: this.updateHue,
        min: 0,
        max: 360,
        symbol: '°',
      },
      {
        label: 'Saturation',
        value: this.state.saturation,
        onChange: this.updateSaturation,
        min: 0,
        max: 100,
        symbol: '%',
      },
      {
        label: 'Lightness',
        value: this.state.lightness,
        onChange: this.updateLightness,
        min: 0,
        max: 100,
        symbol: '%',
      },
    ];
    return (
      React.createElement("div", {className: this.props.classNames.container}, 
        ranges.map(this.renderRange)
      )
    )
  }

});

