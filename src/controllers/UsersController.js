const Users = require('../models/Users');
const bcrypt = require("bcrypt"); 
var jwt = require('jsonwebtoken');
const { where } = require('sequelize');

module.exports = {

    async signUp(req, res, next) {

        try {

            const { userName, email, password } = req.body;
            const hashPassword = await bcrypt.hash(password, 10)

            const userData = {
                userName: userName,
                email: email,
                password: hashPassword,
            }

           const user = await Users.create(userData);

           return res.status(201).send("New user created!") 
            
        } catch (error) {
            console.log({ error })

            next(error)
            
        }

    },

    async login(req, res, next) {

         try {

            const { email, password } = req.body;

            const user = await Users.findOne({
                where: { 
                    "email": email 
                }
            })
            
            if (!user) {

                 return res.status(401).send('Please signup!');

            } else {
                const verifyPassword = await bcrypt.compare(password, user.password)

                if (!verifyPassword) {
                    return res.status(401).send("Invalid credencial");
                }
                
                const token = await jwt.sign(user.email, user.password)

                return res.status(200).send(token);
            }
         } catch (error) {
            next(error)
         }
    },

}