const flashNewsModel = require('../models/flash-news');


const objectPopulate = [{
    path: 'author',
    select: 'nom prenom'
}];

exports.add = async (req, res) => {

    try {
        let {

            type,
            desc,


        } = req.body;

        const flash = flashNewsModel();

        flash.type = type;

        flash.desc = desc;

        // categorie.color = color;

        flash.author = req.user.id_user;

        // categorie.bgColor = bgColor;

        // categorie.photoCouverture = photoCouverture;

        const flashSave = await flash.save();

        return res.status(201).json({
            message: 'creation réussi',
            status: 'OK',
            data: flashSave,
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


exports.all = async (req, res) => {

    try {

        const flashs = await flashNewsModel.find({}).populate(objectPopulate).exec();

        return res.status(200).json({
            message: 'liste réussi',
            status: 'OK',
            data: flashs,
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