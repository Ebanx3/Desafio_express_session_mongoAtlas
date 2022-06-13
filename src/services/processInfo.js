import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const cantElementosEntrada = Object.keys(args).length + args._.length;

const processInfoFunc = (req,res) =>{
    const info = {
        cantElmentosEntrada:cantElementosEntrada,
        argumentosDeEntrada: args,
        pathEjecucion: process.argv[1],
        sistemaOperativo: process.platform,
        procesoId: process.pid,
        nodeVersion: process.version,
        carpetaProyecto: process.cwd(),
        memoriaReservada: process.memoryUsage()
    }
    res.render('pInfo',{info})
}

export default processInfoFunc;