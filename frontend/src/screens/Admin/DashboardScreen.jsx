import revenueImg from "../../assets/Images/growth-chart.png"
import VolumeImg from "../../assets/Images/price-tag.png"
import NetrevenuesImg from "../../assets/Images/revenues.png"
import "../../assets/styles/CustomStyle.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Overviewdashboard from "./Dashboard/Overviewdashboard.jsx";
import Productdashboard from "./Dashboard/Productdashboard.jsx";

const DashboardScreen = () => {

    return (
        <>
            <div className='KPICnt'>
                <div className='KpiCard'>
                    <div >
                        <img src={revenueImg} className="KPI_IMG" />
                    </div>
                    <div>
                        Total Revenue: 2000000
                    </div>

                </div>
                <div className='KpiCard'>
                    <div >
                        <img src={VolumeImg} className="KPI_IMG" />
                    </div>
                    <div>
                        Total Sales: 8456
                    </div>

                </div>
                <div className='KpiCard'>
                    <div >
                        <img src={NetrevenuesImg} className="KPI_IMG" />
                    </div>
                    <div>
                        Net Revenue: 1500000
                    </div>

                </div>
            </div>
            <Tabs
                defaultActiveKey="Overview"
                id="justify-tab-example"
                className="mt-3"
                justify
            >
                <Tab eventKey="Overview" title="Overview">
                    <Overviewdashboard/>
                </Tab>
                <Tab eventKey="Product" title="Product">
                    <Productdashboard />
                </Tab>
            </Tabs>
        </>
    )
}


export default DashboardScreen;