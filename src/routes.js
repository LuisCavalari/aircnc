const router = require('express').Router()
const uploadConfig = require('./config')
const multer = require('multer')
const upload = multer(uploadConfig)
const SessionController = require('./app/controller/SessionController')
const SpotController = require('./app/controller/SpotController')
const DashBoardController = require('./app/controller/DashboardController')
const BookingController = require('./app/controller/BookingController')

router.post('/session', SessionController.store)
router.get('/spot/', SpotController.index)
router.get('/dashboard', DashBoardController.show)
router.post('/spot', upload.single('thumbnail') ,SpotController.store)
router.post('/spot/:spot_id/booking', BookingController.store)

module.exports = router