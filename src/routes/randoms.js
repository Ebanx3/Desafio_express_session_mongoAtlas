import path from 'path';
import { fork } from 'child_process';

const functionRandomNumberPath = path.resolve(__dirname, '../utils/randomNumbers.js')

const randoms = (req,res) => {
    let {cant} = req.query;
    if(!cant) cant = 100000000;
    const msgr = fork(functionRandomNumberPath);
    msgr.send(cant.toString());
    msgr.on('message',(result) => {
        res.json(result);
    });
};


export default randoms;
