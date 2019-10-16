const Booking = require('../model/Booking')

class RefuseController {
    async store(request, response) {
        const { bookingId } = request.params
        const boooking = await Booking.findById(bookingId)
            .populate('spot')
            
        if(boooking.approved)
            return response.status(403).send({ error: 'Booking  already has a state' })
        
        boooking.approved = false

        await boooking.save()

        const  requireUser = request.connectedUsers[boooking.user]
        if(requireUser)
            io.to(requireUser).emit('booking_response',boooking)

        return response.json(boooking)

    }
}



module.exports = new RefuseController()