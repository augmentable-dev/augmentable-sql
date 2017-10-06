import React, {Component} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import MainStore from 'stores/MainStore';

import {Tag} from '@blueprintjs/core';
const path = window.require('path');
const {shell} = window.require('electron')

class FileList extends Component {
    render() {
        const {files} = MainStore.toJS();
        return (
            <div className="file-list">
                {_.map(files, (file, i) => {
                    return (
                        <Tag
                            key={i}
                            className="pt-intent-primary file-list-item pt-monospace-text"
                            style={{cursor: 'pointer'}}
                            onRemove={e => {
                                e.stopPropagation();
                                MainStore.removeFile(i)
                            }}
                            onClick={() => shell.showItemInFolder(file)}
                        >
                            <strong>${i+1}</strong> {path.basename(file)}
                        </Tag>
                    )
                })}
                {_.isEmpty(files) ? <Tag className="pt-monospace-text file-list-item pt-intent-default">Load a file to being querying</Tag> : null}
          </div>
        )
    }
}

export default observer(FileList);