import config from './config';
import { ConnectToDDBB } from './services/ddbb';
import server from './services/server';
import open from 'open';
import minimist from 'minimist';

const optionalArgsObject = {
    alias:{
        p:'port'
    },
    default:{
        p:8080,
    }
}
const args = minimist(process.argv, optionalArgsObject)

const init = () =>{
    server.listen(args.port, () => console.log('Server up!, listening at port', args.port));

    ConnectToDDBB();
    console.log('Connected to database');
    open(`http://localhost:${config.PORT}/api`);
}

init();