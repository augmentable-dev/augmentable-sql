import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button} from '@blueprintjs/core';
import MainStore from 'stores/MainStore';
import _ from 'lodash';

const {dialog, getCurrentWindow} = window.require('electron').remote;

class Controls extends Component {

    async runSQL(e) {
        try {
            const res = await MainStore.runSQL();
            console.log(res);
        } catch(e) {
            console.log(e)
        }
    }

    chooseFile() {
        dialog.showOpenDialog(getCurrentWindow(), {
            title: 'Select a data file',
            properties: ['openFile', 'showHiddenFiles', 'multiSelections']
        }, async (files) => {
            if (!_.size(files)) return;
            for (const f in files) {
                const filePath = files[f];
                await MainStore.loadFile(filePath);
            }
        })
    }

    render() {
        const {currentSQL, files, fileHovering} = MainStore.toJS();

        return (
            <div id="controls-container">
                <div id="controls">
                    <Button
                        text="Execute SQL"
                        rightIconName="play"
                        className="pt-fill pt-intent-primary pt-minimal"
                        disabled={!currentSQL}
                        onClick={this.runSQL}
                    />
                    <Button
                        text="Load File"
                        rightIconName="document-open"
                        className="pt-fill pt-minimal"
                        onClick={this.chooseFile}
                    />
                </div>
                
            </div>
        )
    }
}

export default observer(Controls);