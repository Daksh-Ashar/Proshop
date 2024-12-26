import React from 'react'
import ReactDOM from 'react-dom'
import { VegaLite } from 'react-vega'

const spec = {
    width: 1200,
    height: 500,
    mark: 'bar',
    encoding: {
        x: {
            field: 'Month',
            type: 'ordinal',
            axis: {
                labelAngle: 0,  // Set the angle of the x-axis labels to 0 degrees (horizontal)
                labelFontSize: 20,
                titleFontSize: 20  // Increase the x-axis title font size
            }
        },
        y: {
            field: 'Sales',
            type: 'quantitative',
            axis: {
                labelAngle: 0,  // Set the angle of the x-axis labels to 0 degrees (horizontal)
                labelFontSize: 20,
                titleFontSize: 20  // Increase the y-axis title font size
            }
        },
        color: {
            field: 'Sales',          // Color based on the 'Sales' field
            type: 'quantitative',    // Use quantitative color scale
            scale: { scheme: ["#E5E4E2", "#899499"] },  // Continuous color scheme,
            legend: null
        },
        tooltip: [
            { field: 'Sales', type: 'quantitative' }  // Show Sales in tooltip
        ]
    },
    data: { name: 'table' },
}

const barData = {
    table: [
        { "Month": 'Jan', "Year": 2024, "Sales": 200 },
        { "Month": 'Feb', "Year": 2024, "Sales": 256 },
        { "Month": 'Mar', "Year": 2024, "Sales": 123 },
        { "Month": 'Apr', "Year": 2024, "Sales": 320 },
        { "Month": 'May', "Year": 2024, "Sales": 480 },
        { "Month": 'Jun', "Year": 2024, "Sales": 692 },
        { "Month": 'Jul', "Year": 2024, "Sales": 900 },
        { "Month": 'Aug', "Year": 2024, "Sales": 1136 },
        { "Month": 'Sep', "Year": 2024, "Sales": 820 },
        { "Month": 'Oct', "Year": 2024, "Sales": 900 },
        { "Month": 'Nov', "Year": 2024, "Sales": 950 },
        { "Month": 'Dec', "Year": 2024, "Sales": 1230 },
    ],
}

const byCategorySpec = {
    width: 600,
    height: 500,
    "mark": { "type": "arc", "innerRadius": 50 },
    "encoding": {
        "theta": { "field": "value", "type": "quantitative" },
        "color": { "field": "category", "type": "nominal", scale: { scheme: ["#E5E4E2", "#899499", "#848884", "#708090"] } },
        tooltip: [
            { field: 'category', type: 'nominal' },  // Show Sales in tooltip
            { field: 'value', type: 'quantitative' }  // Show Sales in tooltip
        ],
    },
    data: { name: 'table' },
};


const byCategoryData = {
    table: [
        { "category": 1, "value": 4 },
        { "category": 2, "value": 6 },
        { "category": 3, "value": 10 },
        { "category": 4, "value": 3 },
        { "category": 5, "value": 7 },
        { "category": 6, "value": 8 }
    ],
}

const Overviewdashboard = () => {
    return (<>
        <div>
            <VegaLite spec={spec} data={barData} />
        </div>
        <div>
        <VegaLite spec={byCategorySpec} data={byCategoryData} />
        </div>

    </>)
}

export default Overviewdashboard;