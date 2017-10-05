import React, {Component} from 'react';
import {observer} from 'mobx-react';
import MainStore from 'stores/MainStore';
import _ from 'lodash';

import {NonIdealState, Spinner} from '@blueprintjs/core';
import {Table, Column, Cell, ColumnHeaderCell} from '@blueprintjs/table';

class Results extends Component {

    render() {
        const {latestResults, currentSQL, queryError} = MainStore.toJS();
        const columns = (latestResults && !_.isEmpty(latestResults.preview)) ? _.keys(latestResults.preview[0]) : [];

        return (
            <div id="results-container">
                {!_.isNull(queryError) ?
                    <NonIdealState visual="error" title="Execution Error" description={<pre style={{overflow: 'scroll', textAlign: 'left'}}>{queryError.toString()}</pre>} />    
                :
                _.isUndefined(latestResults) ?
                    <NonIdealState visual="info-sign" title="Execute a SQL query" description="Start by loading a file and executing a query above." />    
                : _.isNull(latestResults) ?
                    <NonIdealState visual={<Spinner />} title="Loading Results" />
                : (latestResults.itemCount === 0) ? 
                    <NonIdealState visual="exclude-row" title="No Rows Returned" description={"Your query did not return any results"} />
                :
                <div id="table-container">
                    <Table numRows={_.size(latestResults.preview)} style={{margin: '5px 0', width: '100%'}} fillBodyWithGhostCells={true}>
                        {_.map(columns, col => (
                            <Column
                                key={col}
                                renderCell={i => <Cell>{latestResults.preview[i][col]}</Cell>}
                                renderColumnHeader={i => <ColumnHeaderCell name={col} />}
                            />
                        ))}
                    </Table>
                </div>
                }
            </div>
        )
    }
}

export default observer(Results);