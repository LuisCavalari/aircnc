const Booking =  require('../model/Booking')
const Spot = require('../model/Spot')
class BookingController {
    async store(request, response) {
        const { spot_id } = request.params
        const { user } = request.headers
        const { date } = request.body

        const booking = await Booking.create({
            spot:spot_id,
            user,
            date,
        })
        await booking.populate('spot').populate('user').execPopulate()
        
        const socketUser = request.connectedUsers[booking.spot.user];
        
        request.io.to(socketUser).emit('booking',booking)

        return response.json(booking)
    }
}

module.exports = new BookingController()