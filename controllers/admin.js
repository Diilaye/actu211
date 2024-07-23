
const userModel = require('../models/admin');

const bcrytjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

exports.store = async (req, res) => {
    try {

        let {

            service,

            nom,

            prenom,

            telephone,

            email,

            password,

        } = req.body;

        const user = userModel();

        user.service = service;
        user.nom = nom;
        user.prenom = prenom;
        user.telephone = telephone;
        user.email = email;

        user.password = bcrytjs.hashSync(password, bcrytjs.genSaltSync(10));

        const token = jwt.sign({
            id_user: user.id,
            service_user: user.service
        }, process.env.JWT_SECRET, { expiresIn: '8784h' });

        user.token = token;

        const userSave = await user.save();



        return res.status(201).json({
            message: 'creation réussi',
            status: 'OK',
            data: userSave,
            statusCode: 201
        });



    } catch (error) {
        return res.status(404).json({
            message: 'erreur server ',
            status: 'NOT OK',
            data: error,
            statusCode: 404
        });
    }
}

exports.addClient = async (req, res) => {
    try {

        let {



            email,

            password,

        } = req.body;

        const user = userModel();

        user.email = email;

        user.password = bcrytjs.hashSync(password, bcrytjs.genSaltSync(10));

        const token = jwt.sign({
            id_user: user.id,
            service_user: user.service
        }, process.env.JWT_SECRET, { expiresIn: '8784h' });

        user.token = token;

        const userSave = await user.save();



        return res.status(201).json({
            message: 'creation réussi',
            status: 'OK',
            data: userSave,
            statusCode: 201
        });



    } catch (error) {
        return res.status(404).json({
            message: 'erreur server ',
            status: 'NOT OK',
            data: error,
            statusCode: 404
        });
    }
}

exports.auth = async (req, res) => {

    let { email, password } = req.body;


    const user = await userModel.findOne({
        email
    }).exec();

    if (user != undefined) {

        if (bcrytjs.compareSync(password, user.password)) {

            const token = jwt.sign({
                id_user: user.id,
                service_user: user.service,
            }, process.env.JWT_SECRET, { expiresIn: '8784h' });

            user.token = token;

            const saveUser = await user.save();

            return res.status(200).json({
                message: 'Connection réussi',
                status: 'OK',
                data: saveUser,
                statusCode: 200
            });

        } else {

            return res.status(404).json({
                message: 'Identifiant incorrect',
                status: 'NOT OK',
                data: null,
                statusCode: 404
            });
        }

    } else {

        return res.status(404).json({
            message: 'Identifiant incorrect',
            status: 'NOT OK',
            data: null,
            statusCode: 404
        });
    }


    try {

        let { email, password } = req.body;


        const user = await userModel.findOne({
            email
        }).excec();

        if (user != undefined) {

            if (bcrytjs.compareSync(password, user.password)) {

                const token = jwt.sign({
                    id_user: user.id,
                    service_user: user.service,
                }, process.env.JWT_SECRET, { expiresIn: '8784h' });

                user.token = token;

                const saveUser = await user.save();

                return res.status(200).json({
                    message: 'Connection réussi',
                    status: 'OK',
                    data: saveUser,
                    statusCode: 200
                });

            } else {

                return res.status(404).json({
                    message: 'Identifiant incorrect',
                    status: 'NOT OK',
                    data: null,
                    statusCode: 404
                });
            }

        } else {

            return res.status(404).json({
                message: 'Identifiant incorrect',
                status: 'NOT OK',
                data: null,
                statusCode: 404
            });
        }

    } catch (error) {
        return res.status(404).json({
            message: 'erreur server ',
            status: 'NOT OK',
            data: error,
            statusCode: 404
        });
    }
}


exports.one = async (req, res) => {

    try {


        const user = await userModel.findById(req.params.id).excec();

        return res.status(200).json({
            message: 'liste réussi',
            status: 'OK',
            data: user,
            statusCode: 200
        });



    } catch (error) {

        return res.status(404).json({
            message: 'erreur server ',
            status: 'NOT OK',
            data: error,
            statusCode: 404
        });

    }

}

exports.getAuth = async (req, res) => {

    try {


        const user = await userModel.findById(req.user.id_user).excec();

        return res.status(200).json({
            message: 'liste réussi',
            status: 'OK',
            data: user,
            statusCode: 200
        });



    } catch (error) {

        return res.status(404).json({
            message: 'erreur server ',
            status: 'NOT OK',
            data: error,
            statusCode: 404
        });

    }

}


exports.all = async (req, res) => {



    try {

        const users = await userModel.find(req.query);

        return res.status(200).json({
            message: 'liste réussi',
            status: 'OK',
            data: users,
            statusCode: 200
        });
    } catch (error) {

        return res.status(404).json({
            message: 'erreur server ',
            status: 'NOT OK',
            data: error,
            statusCode: 404
        });

    }

}

exports.update = async (req, res) => {

    try {

        let {

            nom,

            prenom,

            telephone,

            email,

            oldpassword,

            newPassword,

            photoProfile

        } = req.body;

        const user = await userModel.findById(req.user.id_user).excec();

        if (user != undefined) {

            if (nom != undefined) {
                user.nom = nom;
            }

            if (prenom != undefined) {
                user.prenom = prenom;
            }

            if (telephone != undefined) {
                user.telephone = telephone;
            }

            if (email != undefined) {
                user.email = email;
            }

            if (oldpassword != undefined) {

                if (bcrytjs.compareSync(oldpassword, user.password)) {
                    user.password = bcrytjs.hashSync(newPassword, bcrytjs.genSaltSync(10))
                }

            }

            if (photoProfile != undefined) {
                user.photoProfile = photoProfile;
            }

            const userSave = await user.save();

            return res.status(200).json({
                message: 'modification réussi',
                status: 'OK',
                data: userSave,
                statusCode: 200
            });


        } else {
            return res.status(404).json({
                message: 'erreur server ',
                status: 'NOT OK',
                data: error,
                statusCode: 404
            });
        }


    } catch (error) {

        return res.status(404).json({
            message: 'erreur server ',
            status: 'NOT OK',
            data: error,
            statusCode: 404
        });

    }

}

exports.delete = async (req, res) => {


    try {

        const user = await userModel.findByIdAndDelete(req.params.id).excec();

        return res.status(200).json({
            message: 'delete réussi',
            status: 'OK',
            data: user,
            statusCode: 200
        });


    } catch (error) {

        return res.status(404).json({
            message: 'erreur server ',
            status: 'NOT OK',
            data: error,
            statusCode: 404
        });


    }
}