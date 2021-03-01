const jwt = require('jsonwebtoken');

let checkAuth = (req, res, next)=>{

    let token = req.get('token');
    jwt.verify(token, process.env.SEED_AUTHENTICATION,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err: {
                    message: 'error token'
                }
            })
        }
        req.user = decoded;
        next();
    })
};

const checkRole = function (req, res, next) {

    let role = req.get('role');

    if (role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'No tienes permitido estar aqui'
            }
        });
    }
}

const checkPassword = function (req, res, next) {

    let password = req.body.password;
    let confirm_password = req.body.confirm_password;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,15}/

    if (password !== '') {
        if (password === confirm_password) {
            if (regex.test(password)) {
                next();
            } else {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'La contraseña debe contener al menos 8 caracteres, 1 miníscula, 1 mayúscula y un número'
                    }
                });
            }
        } else {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Las contraseñas no coinciden'
                }
            });
        }
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'La contraseña no puede estar vacía'
            }
        });
    }
}
let checkAuthChangePass = (req, res, next) => {
    //headers    
    let token = req.get('token');

    jwt.verify(token, process.env.SEED_AUTHENTICATION, (err, decoded) => {

        let email_token_user = decoded.user.email;
        let email_req_change_password = req.body.email;
        if(email_token_user !== email_req_change_password){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'error token try again'
                }
            });
        }
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'error token try again'
                }
            });
        }
        req.user = decoded;

        next();
    })
};


module.exports = {checkAuth,checkRole,checkPassword,checkAuthChangePass}