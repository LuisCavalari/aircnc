const Booking = require('../model/Booking')

class AproveController {
    async store(request, response) {
        const { bookingId } = request.params
        const boooking = await Booking.findById(bookingId)
            .populate('spot')
            
        boooking.approved = true
        await boooking.save()

        const  requireUser = request.connectedUsers[boooking.user]
        if(requireUser)
            io.to(requireUser).emit('booking_response',boooking)

        return response.json(boooking)

    }
}



module.exports = new AproveController()