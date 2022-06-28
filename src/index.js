import { ConnectToDDBB } from './services/ddbb';
import server from './services/server';
import minimist from 'minimist';
import os from 'os';
import cluster from 'cluster';
import { middlewareErrorLogger } from './services/logger';

const numCPUs = os.cpus().length;

const optionalArgsObject = {
    alias:{
        p:'port',
        m:'modoCluster'
    },
    default:{
        p:8080,
        m: false
    }
}
const args = minimist(process.argv, optionalArgsObject);

const init = (port) =>{
    try {
        server.listen(port, () => console.log('Server up!, listening at port', port,' // Process pid',process.pid));
        ConnectToDDBB();
        console.log('Connected to database');
    }
    catch(err){
        middlewareErrorLogger(err);
    }
}

const modoCluster = args.m;

if(modoCluster && cluster.isMaster){
    console.log('numero de CPUs :',numCPUs);
    for (let i=0;i<numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker, code) => {
        console.log(`Worker died: ${worker.process.pid} ... with code ${code} at ${Date()}`);
        cluster.fork();
    })
}

else{
    init(process.env.PORT || 8080);
    
};