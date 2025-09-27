//order.routes.js
router.post(
            '/', 
            log, 
            requireAuth, 
            requireParams({
              keys: [
                'host.userId', 
                'totalPrice', 
                'checkIn', 
                'checkOut', 
                'guests', 
                'home.homeId', 
                'home.name', 
                'home.imageUrl',
                'status'
              ]

            }), 
            addOrder)
            
//order.controller.js
export async function addOrder(req, res) {
  const { loggedInUser } = req
  const order = req.body
  
  try {
    order.purchaser = {
    userId: new ObjectId(loggedInUser._id),
    fullname: loggedInUser.fullname,
    imageUrl: loggedInUser.imageUrl,
    email: loggedInUser.email
    }
    
    order.host.userId = new ObjectId(order.host.userId)
    order.home.homeId = new ObjectId(order.home.homeId)

    const addedOrder = await orderService.add(order)
    
    socketService.emitToUser({ type: 'home-booked', data: addedOrder, userId: order.host.userId.toString()})

    res.json(addedOrder)
  } catch (err) {
    loggerService.error('Failed to add order', err)
    res.status(400).send({ err: 'Failed to add order' })
  }
}

//order.service.js
async function add(order) {
  try {
    const collection = await dbService.getCollection('order')
    const result = await collection.insertOne(order)
    order._id = result.insertedId
    return order
  } catch (err) {
    loggerService.error('Failed to add order', err)
    throw err
  }
}
