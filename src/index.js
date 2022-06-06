import config from './config';
import { ConnectToDDBB } from './services/ddbb';
import server from './services/server';


const init = () =>{
    server.listen(config.PORT, () => console.log('Server up!, listening at port', config.PORT));
    ConnectToDDBB();
    console.log('Connected to database');
}

init();