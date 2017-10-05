import React, {Component} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import MainStore from 'stores/MainStore';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/sql';
import 'brace/theme/xcode';

class SQL extends Component {
    onChange(sql) {
        MainStore.setSQL(sql);
    }

    onKeyPress(e) {
        const {key, shiftKey} = e;
        if ((shiftKey) && key === "Enter") {
            e.preventDefault();
            MainStore.runSQL();
        }
    }
 
    render() {
        const {files, currentSQL} = MainStore.toJS();
        return (
            <div id="sql-container" onKeyPress={this.onKeyPress}>
                <AceEditor
                    mode="sql"
                    theme="xcode"
                    onChange={this.onChange}
                    value={currentSQL}
                    name="sql-ace"
                    editorProps={{$blockScrolling: true}}
                    width={'100%'}
                    height={'100%'}
                    enableBasicAutocompletion={true}
                    enableLiveAutocompletion={true}
                />
            </div>
        )
    }
}

export default observer(SQL);