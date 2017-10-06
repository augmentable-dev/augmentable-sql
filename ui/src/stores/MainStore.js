import {extendObservable, toJS} from 'mobx';
import _ from 'lodash';
const {app} = window.require('electron').remote;

class MainStore {
    constructor() {
        extendObservable(this, {
            currentSQL: '',
            sqlHistory: [],
            latestResults: undefined,
            queryError: null,
            files: [],
            fileHovering: false
        });

    }

    setSQL(sql) {
        this.currentSQL = sql;
    }

    setFileHovering(hovering) {
        this.fileHovering = hovering;
    }

    runSQL() {
        const {currentSQL, files} = this.toJS();
        this.latestResults = null;
        this.queryError = null;
        const fileMap = _.reduce(files, (accum, filePath, i) => ({...accum, [i+1]: filePath}), {});
        window.worker.alasql(currentSQL, fileMap, app.getPath('userData'))
            .then(res => {
                this.latestResults = res;
                console.log(res)
            })
            .catch(e => {
                this.queryError = e;
                this.latestResults = undefined;
            })
    }

    loadFile(filePath) {
        const alreadyLoaded = _.includes(this.files.values(), filePath)
        if (alreadyLoaded) return;
        this.files.push(filePath);
    }

    removeFile(filePathIndex) {
        this.files.splice(filePathIndex, 1);
    }
    
    toJS() {
		return toJS(this);
	}
}

export default new MainStore();