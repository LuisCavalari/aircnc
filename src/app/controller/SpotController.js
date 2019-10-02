const Spot = require('../model/Spot')
const User = require('../model/User')
class SpotController {
    async index(request, response) {
        const { tech } = request.query
        const spots = await Spot.find({ techs: tech })

        return response.json({ spots })
    }

    async store(request, response) {
        try {
            const { filename } = request.file
            const { user } = request.headers
            const { company, price, techs } = request.body
            const findUser = await User.findById(user)
            if (!findUser)
                return response.status(401).send({ error: 'User dont exist' })

            const spot = await Spot.create({
                thumbnail: filename,
                company,
                price,
                techs: techs.split(',').map((tech) => tech.trim()),
                user
            })

            return response.json({ spot })
        } catch (error) {
            return response.status(401).send({ error: "Erro on store" })
        }
    }


}

module.exports = new SpotController()