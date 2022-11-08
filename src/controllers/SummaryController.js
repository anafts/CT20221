const sequelize = require('sequelize');
const Kdramas = require('../models/Kdramas');


module.exports = {

    async index(req, res, next) {

        try {
            
            const { release_year } = req.params;
            const { streamming_services } = req.params;

            const kdramaYear = await Kdramas.findAndCountAll({
                where: {
                    release_year: release_year,
                    streamming_services: streamming_services
                }
            })
            
            const [ratingAverage] = await Kdramas.findAll({
                where: {
                    release_year: release_year,
                    streamming_services: streamming_services
                },
                attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'average']],
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