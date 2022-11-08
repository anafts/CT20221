const Kdramas = require('../models/Kdramas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

    async index(req, res, next) {

        const genres = req.query.genres
        const release_year = req.query.release_year
        const review = req.query.review

        try {

            if (genres) {
                const kdramaGenres = await Kdramas.findAndCountAll({
                    where: {
                        genres: Sequelize.where(
                            Sequelize.cast(Sequelize.col('genres'), 'text'),
                            {
                                [Op.iLike]: `%${genres}%` 
                            }
                        )
                    }
                })

                return res.json(kdramaGenres)
            }

            if (release_year) {
                const kdramaYear = await Kdramas.findAndCountAll({
                    where: {
                        release_year: release_year
                    }
                })

                return res.json(kdramaYear)
            }

            if (review) {
                const kdramaReview = await Kdramas.findAndCountAll({
                    where: {
                        review: {
                            [Op.like]: `%${review}%`
                        }
                    }
                })

                return res.json(kdramaReview)
            }

            const newKdramas = await Kdramas.findAndCountAll();

            return res.json(newKdramas);

        } catch (error) {
            next(error);
        }
    },

    async findById(req, res, next) {

        try {

            const { id } = req.params;

            const kdramaId = await Kdramas.findOne({ where: {'id': id} });

            return res.json(kdramaId);

        } catch (error) {
           next(error);
        }
    },

    async store(req, res) {

        try {

            const { drama_name, favorite_character, streamming_services, release_year, genres, rating, review } = req.body;

            if (!drama_name || !favorite_character || !streamming_services || !release_year) {
                return res.status(405).send('Verifique se todos os campos estão preenchidos!')
            }

            if ( rating < 0 || rating > 5 ) {
                return res.status(405).send('It should be rated between 0.0 and 5.0')
            }

            if ( !genres === "romance" || !genres === "action" || !genres === "romantic comedy" || !genres === "others" ) {
                return res.status(405).send('Just romance, action, romantic comedy and others are available genres')
            }
            
            const createKdrama = await Kdramas.create({
            drama_name, 
            favorite_character, 
            streamming_services, 
            release_year,
            genres,
            rating, 
            review
        });

        return res.status(201).send('Kdrama cadastrado com sucesso!');
            
        } catch (error) {
            // console.log({ error })
            return res.status(409).send('Kdrama já cadrastrado!');
        }
        
    },

    async removeById(req, res, next) {

        try {

            const { id } = req.params;
            const deleteKdrama = await Kdramas.destroy({ where: {'id': id } });

            return res.status(202).send('Kdrama deletado!');
            
        } catch (error) {

            next(error);
        }
    },

    async updateById (req,res, next) {

        try {

            const { id } = req.params;

            const { drama_name, favorite_character, streamming_services, release_year, genres, rating, review } = req.body;

            if (!drama_name || !favorite_character || !streamming_services || !release_year) {
                return res.status(405).send('Verifique se todos os campos estão preenchidos!')
            }

            if ( rating < 0 || rating > 5 ) {
                return res.status(405).send('It should be rated between 0.0 and 5.0')
            }

            if ( !genres === "romance" || !genres === "action" || !genres === "romantic comedy" || !genres === "others" ) {
                return res.status(405).send('Just romance, action, romantic comedy and others are available genres')
            }

            const updateKdrama = await Kdramas.update(
                {
                 'drama_name': drama_name, 
                 'favorite_character': favorite_character, 
                 'streamming_services': streamming_services,
                 'release_year': release_year,
                 'genres': genres,
                 'rating': rating,
                 'review': review
                },
                {
                    where: { 'id': id}
                }
            );

            return res.status(204).send('Informação atualizada com sucesso!'); 
            
        } catch (error) {
            next(error);
        }
    },

};