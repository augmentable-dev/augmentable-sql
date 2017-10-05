import React, { Component } from 'react';
import {observer} from 'mobx-react';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import '@blueprintjs/table/dist/table.css';
import './styles.css';

import numbro from 'numbro';
import moment from 'moment';
import MainStore from 'stores/MainStore';

import SQL from './SQL';
import Controls from './Controls';
import FileList from './FileList';
import Results from './Results';

class App extends Component {
  componentDidMount() {
    document.ondragover = document.ondrop = (ev) => {
      ev.preventDefault();
      MainStore.setFileHovering(true);
    }
    
    document.body.ondrop = (ev) => {
      ev.preventDefault();
      const files = ev.dataTransfer.files;
      for (const f in files) {
        const file = files[f];
        if (file.path) MainStore.loadFile(file.path)
      }
      MainStore.setFileHovering(false);
    }
  }
  render() {
    const {latestResults} = MainStore.toJS();
    console.log(latestResults)
    return (
      <div className="App">
        <nav id="title-bar">
          <span>{latestResults ? `${numbro(latestResults.itemCount).format()} rows. ${moment.duration(latestResults.executionTime).asSeconds()} seconds.` : 'Augmentable SQL'}</span>
        </nav>

        <div id="contents">
          <div id="top-controls">
            <SQL />
            <Controls />
          </div>
          <FileList />
          <Results />
        </div>
      </div>
    );
  }
}

export default observer(App);
