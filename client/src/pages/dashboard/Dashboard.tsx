import React from "react";
import './Dashboard.css'
import {useDispatch, useSelector} from "react-redux";
import {setActiveTab} from "../../store/actions/navigationActions";
import {RootReducer} from "../../store/rootReducer";
import APIKeysTable from "../../components/dashboard/APIKeysTable";

function APIKeys() {
    return <div className='api-keys-sections'>
        <div>
            <p>Generate API keys in order to use our services from your platform</p>
            <button className='btn btn-primary'>Generate</button>
        </div>
        <div>
            <APIKeysTable/>
        </div>
    </div>
}

function DashboardSettings() {
    return <div>Settings</div>
}

function DashboardPage() {
    const {navigation: {activeTab}} = useSelector((state: RootReducer) => state)

    const {component: ActiveComponent} = dashboardTabs[+activeTab]

    return <div className='dashboard-container'>
        <ContainerTabs activeTab={activeTab}/>
        <div className='active-section'>
            <ActiveComponent/>
        </div>
    </div>
}

function ContainerTabs({activeTab}: { activeTab: number | string }) {
    const dispatch = useDispatch()

    const onTabChange = (tab: string | number) => {
        dispatch(setActiveTab(tab))
    }

    return <div className='container-tabs'>
        <ul>
            {dashboardTabs.map((tab, idx) => {
                return <li onClick={() => onTabChange(idx)} key={tab.tabLabel}
                           className={idx === +activeTab ? 'active' : ''}>{tab.tabLabel}
                    <div/>
                </li>
            })}
        </ul>
    </div>
}

const dashboardTabs = [{tabLabel: 'API Keys', component: APIKeys}, {tabLabel: 'Settings', component: DashboardSettings}]

export default DashboardPage
