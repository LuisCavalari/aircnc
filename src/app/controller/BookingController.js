const Booking =  require('../model/Booking')

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
        return response.json(booking)
    }
}

module.exports = new BookingController()