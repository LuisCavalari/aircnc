const Spot = require('../model/Spot')

class DashboardController {
    async show(request, response) {
        const { user } = request.headers
        const spots = await Spot.find({ user })
        return response.json(spots)
    }
}

module.exports = new DashboardController()