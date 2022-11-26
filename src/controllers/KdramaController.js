const Kdramas = require('../models/Kdramas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');

module.exports = {

    async index(req, res, next) {

        const genres = req.query.genres
        const release_year = req.query.release_year
        const review = req.query.review

        const token = req.headers?.token

        if (token) {
            const email = jwt.decode(token)

            if (!email) {
                return res.status(401).send("Invalid token");
            } 
        }

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

        const { id } = req.params;

        const token = req.headers?.token

        if (token) {
            const email = jwt.decode(token)

            if (!email) {
                return res.status(401).send("Invalid token");
            } 
        }

        try {

            const kdramaId = await Kdramas.findOne({ where: {'id': id} });

            return res.json(kdramaId);

        } catch (error) {
           next(error);
        }
    },

    async store(req, res) {

        const { drama_name, favorite_character, streamming_services, release_year, genres, rating, review } = req.body;

        const token = req.headers?.token

        if (token) {
            const email = jwt.decode(token)

            if (!email) {
                return res.status(401).send("Invalid token");
            } 
        }

        try {

            if (!drama_name || !favorite_character || !streamming_services || !release_year) {
                return res.status(405).send('Make sure all fields are filled in!')
            }

            if ( rating < 0 || rating > 5 ) {
                return res.status(405).send('It should be rated between 0.0 and 5.0')
            }

            if (genres !== "romance" && genres && "action" && genres !== "romantic comedy" && genres !== "others") {
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

        return res.status(201).send('Kdrama successfully registered');
            
        } catch (error) {
            // console.log({ error })
            return res.status(409).send('Kdrama already registered!');
        }
        
    },

    async removeById(req, res, next) {

        const { id } = req.params;

        const token = req.headers?.token

        if (token) {
            const email = jwt.decode(token)

            if (!email) {
                return res.status(401).send("Invalid token");
            } 
        }

        try {

            const deleteKdrama = await Kdramas.destroy({ where: {'id': id } });

            return res.status(202).send('Kdrama  successfully deleted!');
            
        } catch (error) {

            next(error);
        }
    },

    async updateById (req,res, next) {

         const { id } = req.params;
         const { drama_name, favorite_character, streamming_services, release_year, genres, rating, review } = req.body;

         const token = req.headers?.token

        if (token) {
            const email = jwt.decode(token)

            if (!email) {
                return res.status(401).send("Invalid token");
            } 
        }

        try {

            if (!drama_name || !favorite_character || !streamming_services || !release_year) {
                return res.status(405).send('Make sure all fields are filled in!')
            }

            if ( rating < 0 || rating > 5 ) {
                return res.status(405).send('It should be rated between 0.0 and 5.0')
            }

            if (genres !== "romance" && genres && "action" && genres !== "romantic comedy" && genres !== "others") {
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

            return res.status(204).send('Information successfully updated!'); 
            
        } catch (error) {
            next(error);
        }
    },

};