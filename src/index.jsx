import React, {useRef, createRef} from "react";
import _ from 'lodash'
import ReactDOM from "react-dom";
import {HotTable} from '@handsontable/react'
import './index.css'

const data = [
    ['Z1', 'ipsum', 'dolor', 'sit', '12/1/2015', 23],
    ['a1', 'elit', 'Ut', 'imperdiet', '5/12/2015', 6],
    ['Z2', 'vulputate', 'leo', 'semper', '10/23/2015', 26],
    ['a2', 'et', 'malesuada', 'libero', '12/1/2014', 98],
    ['Z3', 'et', 'dignissim', 'hendrerit', '12/1/2016', 8.5]
];

const columns = [
    {type: 'text'},
    {type: 'text'},
    {type: 'text'},
    {type: 'text'},
    {type: 'date', dateFormat: 'M/D/YYYY'},
    {type: 'numeric'}
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
        this.filterConfig = null;
    }

    clickHandler = () => {
        const filterPlugin = this.ref.current.hotInstance.getPlugin('filters');
        _.forEach(this.filterConfig, ({ column, conditions }) => {
            filterPlugin.removeConditions(column);
            _.forEach(conditions, ({ name, args }) => {
                filterPlugin.addCondition(column, name, args);
            });
        });
        filterPlugin.filter();
    }
    afterFilter = (condition) => {
        this.filterConfig = condition
    }

    render() {
        return <div>
            <button onClick={this.clickHandler}>Manually Filter</button>
            <HotTable
                ref={this.ref}
                data={data}
                columns={columns}
                colHeaders={true}
                rowHeaders={true}
                dropdownMenu={[
                    'filter_by_value',
                    'filter_action_bar'
                ]}
                filters={true}
                afterFilter={this.afterFilter}
                beforeFilterValueOptionsShow={(index1, index2, items) => {
                    items.sort((i, j) => {
                        if (i.value.toString().toLowerCase() < j.value.toString().toLowerCase()) return -1;
                        if (i.value.toString().toLowerCase() > j.value.toString().toLowerCase()) return 1;
                        return 0;
                    });
                }}
            ></HotTable>
        </div>
    }
}

ReactDOM.render(<App/>, document.querySelector("#app"));
