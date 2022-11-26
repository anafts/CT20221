const Kdramas = require('../models/Kdramas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');

module.exports = {

    async index(req, res, next) {

        const { release_year } = req.params;
        const { streamming_services } = req.params;

        const token = req.headers?.token

        if (token) {
            const email = jwt.decode(token)

            if (!email) {
                return res.status(401).send("Invalid token");
            } 
        }

        try {

            const kdramaYear = await Kdramas.findAndCountAll({
                where: {
                    release_year: release_year,
                    streamming_services: {
                        [Op.iLike]: `%${streamming_services}%`
                    }
                }
            })
            
            const [ratingAverage] = await Kdramas.findAll({
                where: {
                    release_year: release_year,
                    streamming_services: {
                        [Op.iLike]: `%${streamming_services}%` 
                    }
                },
                attributes: [[Sequelize.fn('avg', Sequelize.col('rating')), 'average']],
                raw: true
            })

            if ( kdramaYear.count <= 0 ) {
                return res.send(`There Isn't any kdramas watched on ${streamming_services} in ${release_year}`)
            }

            return res.json({ ...kdramaYear, ...ratingAverage })

            
        } catch (error) {

            next(error)
        }

    },

};