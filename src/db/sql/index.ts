import {QueryFile, IQueryFileOptions} from 'pg-promise';

const {join: joinPath} = require('path');

export const users = {
    create: sql('users/create.sql'),
    empty: sql('users/empty.sql'),
    drop: sql('users/drop.sql'),
    add: sql('users/add.sql'),
    findById: sql('users/findById.sql'),
    findByEmail: sql('users/findByEmail.sql')
}

export const userRoles = {
    create: sql('userRoles/create.sql'),
    add: sql('userRoles/add.sql')
}

function sql(file: string): QueryFile {

    const fullPath: string = joinPath(__dirname, file)

    const options: IQueryFileOptions = {
        minify: true
    }

    const qf: QueryFile = new QueryFile(fullPath, options)

    if (qf.error) {
        console.error(qf.error)
    }
    return qf
}
