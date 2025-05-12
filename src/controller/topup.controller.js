import gameProduct from "../model/game.nodel.js";
import topupOrders from "../model/topuporder.model.js";

export const product = async (req, res) => {
    try {
        const product = await gameProduct.find({isActive: true});
        if (product.length > 0) {
         res.status(200).json({
                message: "Daftar Product",
                product
            })   
        } else {
            res.status(400).json({
                message: "belum ada product"
            })
        }
    } catch (error) {
        console.log(`server error: ${error}`)
        res.status(500).json({
            message: "internal server error"
        })
    }
}
export const topUp = async (req, res) => {
    try {
        const {game, userGameId, productId, note } = req.body;
        if(!game || !userGameId || !productId || !note ) {
           return res.status(400).json({
            message: "fieald tidak boleh kosong"
           })
        }
        const product = await gameProduct.findById(productId);
        if(!product || !product.isActive) {
            return res.status(404).json({
                message: "product tidak di temukan atau nonaktif"
            })
        }
        const newOrder = new topupOrders({
            game: game,
            userGameid: userGameId,
            product: productId,
            note:  note
        })
        if(newOrder) {
            await newOrder.save()
            res.status(200).json({
                message: "pesanan berasil dibuat",
                orderId: newOrder._id
            })
        }

    } catch (error) {
        console.log(`server error: ${error}`)
        res.status(500).json({
            message: "internal server error"
        })        
    }
}
export const statusOrder = async (req, res) => {
 try {
    const orderId = req.params.id;

    const order = await topupOrders.findById(orderId).populate('product');

    if (!order) {
      return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }

    res.json({
      message: 'Status pesanan ditemukan',
      status: order.status,
      order: {
        id: order._id,
        game: order.game,
        userGameId: order.userGameId,
        product: order.product.productName,
        price: order.product.price,
        status: order.status,
        note: order.note,
        createdAt: order.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil status pesanan' });
  }

}
