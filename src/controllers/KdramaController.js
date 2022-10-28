const Kdramas = require('../models/Kdramas');

module.exports = {

    async index(req, res,next) {
        
        try {
            const newKdramas = await Kdramas.findAll();

            return res.json(newKdramas);

        } catch (error) {
            next(error);
        }
    },

    async findById(req, res, next) {
        try {

            const { id } = req.params;

            const newKdramas = await Kdramas.findOne({ where: {'id': id} });

            return res.json(newKdramas);

        } catch (error) {
           next(error);
        }
    },

    async store(req, res) {

        try {

            const { drama_name, favorite_character, streamming_services, release_year } = req.body;

            if (!drama_name || !favorite_character || !streamming_services || !release_year) {
                return res.status(404).send('Verifique se todos os campos estão preenchidos!')
            }
            
            const dramas = await Kdramas.create({
            drama_name, 
            favorite_character, 
            streamming_services, 
            release_year
        });

        return res.status(200).send('Kdrama cadastrado com sucesso!');
            
        } catch (error) {
            return res.status(409).send('Kdrama já cadrastrado!');
        }
        
    },

    async removeById(req, res, next) {

        try {

            const { id } = req.params;
            const newKdramas = await Kdramas.destroy({ where: {'id': id } });

            return res.status(200).send('Kdrama deletado!');
            
        } catch (error) {

            next(error);
        }
    },

    async updateById (req,res, next) {

        try {

            const { id } = req.params;

            const { drama_name, favorite_character, streamming_services, release_year } = req.body;

            if (!drama_name || !favorite_character || !streamming_services || !release_year) {
                return res.status(404).send('Verifique se todos os campos estão preenchidos!')
            }

            const dramaUpdate = await Kdramas.update(
                {
                 'drama_name': drama_name, 
                 'favorite_character': favorite_character, 
                 'streamming_services': streamming_services,
                 'release_year': release_year 
                },
                {
                    where: { 'id': id}
                }
            );

            return res.status(200).send('Informação atualizada com sucesso!'); 
            
        } catch (error) {
            next(error);
        }
    }


};