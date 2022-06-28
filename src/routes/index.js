import { Router } from 'express';
import passport from 'passport';
import { middlewareErrorLogger } from '../services/logger';
import randoms from './randoms';

const router = Router();

router.get('/', (req, res) => {
    const inf = {
        loggedIn: false
    }
    if (req.session.info?.loggedIn) { //SI AL RECARGAR ESTO ES TRUE, LE AVISA A PUG QUE ESTÁ LOGUEADO Y LE ENVIA EL EMAIL
        inf.loggedIn = true;
        inf.email = req.session.passport?.user.email;
    }
    else if (req.session.info?.emailAlreadyUsed) { //SI AL RECARGAR ESTO ES TRUE, LE AVISA A PUG PARA QUE TIRE ERROR DE EMAIL YA USADO
        inf.emailAlreadyUsed = true;
        req.session.info.emailAlreadyUsed = false;
    }
    else if (req.session.info?.userRegistered) { //SI AL RECARGAR ESTO ES TRUE, LE AVISA A PUG QUE EL REGISTRO SI HIZO DE FORMA CORRECTA
        inf.userRegistered = true;
        req.session.info.userRegistered = false;
    }
    else if(req.session.info?.errLogginIn){  //SI AL RECARGAR ESTO ES TRUE, LE AVISA A PUG QUE EL CORREO O PASS NO SOS CORRECTAS
        inf.errLogginIn = true;
        req.session.info.errLogginIn = false;
    }
    res.render('index', { inf })
})

const passportOptions = { badRequestMessage: 'wrong email or password' ,failureRedirect:'/api'};

router.post('/login', passport.authenticate('login', passportOptions), function (req, res) { 
    req.session.info = {
        loggedIn: true,
    }
    res.redirect('/api');
});

router.post('/signup', async (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        if (err) {
            middlewareErrorLogger(err);
            return next(err);
        }
        if (!user) {
            if (info.message == 'Email already registered') {
                req.session.info = {
                    emailAlreadyUsed: true,
                }
                return res.redirect('/api');
            }
            return res.status(401).json(info)
        };
        req.session.info = {
            userRegistered: true,
        }
        res.redirect('/api');
    })(req, res, next);

});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/api')
})



router.get('/randoms',randoms);

export default router;