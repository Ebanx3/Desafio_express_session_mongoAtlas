import config from './config';
import { ConnectToDDBB } from './services/ddbb';
import server from './services/server';
import open from 'open';

const init = () =>{
    server.listen(config.PORT, () => console.log('Server up!, listening at port', config.PORT));
    ConnectToDDBB();
    console.log('Connected to database');
    open(`http://localhost:${config.PORT}/api`);
}

init();