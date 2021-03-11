import React from "react";
import Table from 'react-bootstrap/Table'

export interface IAPIKey {
    api_key: string;
    active: boolean;
    restricted?: String[]
}

function APIKeysTable() {
    return <Table responsive={true}>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">KEY</th>
                    <th scope="col">Restricted</th>
                    <th scope="col">Active</th>
                </tr>
                </thead>
                <tbody>
                {keys.map((key: IAPIKey, idx: number) => {
                    return <tr key={key.api_key}>
                        <td>{idx + 1}</td>
                        <td>{key.api_key}</td>
                        <td>{!!key.restricted?.toString()}</td>
                        <td>{key.active?.toString()}</td>
                    </tr>
                })}
                </tbody>
            </Table>
}


export default APIKeysTable

const keys = [{
    api_key: '1dasd212ed1dasd21e1dasd21ed1dasd21edd',
    active: true,
}, {
    api_key: '1dasd21ed13dasd21e1dasd21ed1dasd21edd',
    active: false,
}, {api_key: '1dasd21ed1das5d21e1dasd21ed1dasd21edd', active: true}]
