import intl from "react-intl-universal";
import http from "axios";
import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

import * as utils  from './common/utils.js';
import SUPPOER_LOCALES from './common/support_locales';
/*const locales = {
  "en-US": require('./locales/en-US.js'),   //locals  under the folder of public
  "zh-CN": require('./locales/zh-CN.js'),
};
*/
class App extends Component {

  state = { initDone: false };

  constructor(props) {
    super(props);
    this.onSelectLocale = this.onSelectLocale.bind(this);
  }

  componentDidMount() {
    this.loadLocales();
  }

  loadLocales() {
    utils.loadIntlResources(_ => this.setState({ initDone: true }));
  }

  render() {
    return (
      this.state.initDone &&
      <div>
        <div><img src={logo} className="App-logo" alt="logo" /></div>
        <p>{intl.get('SIMPLE')}</p>
        <p>{this.renderLocaleSelector()}</p>
      </div>
    );
  }

  renderLocaleSelector() {
    return (
      <select onChange={this.onSelectLocale} defaultValue="">
        <option value="" disabled>Change Language</option>
        {SUPPOER_LOCALES.map(locale => (
          <option key={locale.value} value={locale.value}>{locale.name}</option>
        ))}
      </select>
    );
  }

  onSelectLocale(e) {
    let lang = e.target.value;
    window.location.search = `?lang=${lang}`;
  }
}

export default App;