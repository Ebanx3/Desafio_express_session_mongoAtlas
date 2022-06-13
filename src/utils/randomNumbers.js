function getRandomArbitrary(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export const randomNumbers = (cant) => {
    const info = {}
    for (let i = 0; i<cant ; i++){
        const n = getRandomArbitrary(1,1000);
        const keyName = n.toString();
        if(info.hasOwnProperty(keyName)) {
            info[keyName] ++;
        }
        else {
            info[keyName] = 1;
        }
    }
    return info;
}

process.on('message',(cant)=>{
    const num = parseInt(cant);
    console.log('La cant recibida es ',cant)
    const result = randomNumbers(num);
    process.send(result);
});