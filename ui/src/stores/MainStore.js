import {extendObservable, observable, toJS} from 'mobx';
import _ from 'lodash';
const {app} = window.require('electron').remote;

class MainStore {
    constructor() {
        extendObservable(this, {
            currentSQL: '',
            sqlHistory: [],
            latestResults: undefined,
            queryError: null,
            files: observable.map(),
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
        window.worker.alasql(currentSQL, files, app.getPath('userData'))
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
        const fileCount = this.files.size;
        const alreadyLoaded = _.includes(this.files.values(), filePath)
        if (alreadyLoaded) return;
        this.files.set(`${fileCount + 1}`, filePath);
    }

    removeFile(filePathKey) {
        const {files} = this.toJS();
        this.files.delete(filePathKey)
    }
    
    toJS() {
		return toJS(this);
	}
}

export default new MainStore();