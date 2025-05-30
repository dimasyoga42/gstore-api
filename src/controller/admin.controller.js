import gameProduct from "../model/game.nodel.js";
import topupOrders from "../model/topuporder.model.js";
import joi from "joi";
export const getProduct = async (req, res) => {
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
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

export const addProduct = async(req, res) => {
    try {
      //validation
      const schema = joi.object({
        game: joi.string().required(),
        productName: joi.string().required(),
        price: joi.number().required(),
        itemCode: joi.string().required(),
        isActive: joi.boolean(),
      })
      const {error} = schema.validate(req.body);
      if(error) {
        return res.status(400).json({ message: error.details[0].message });
      }
        const {game, productName, price, itemCode, isActive} = req.body;
        if(!game || !productName || !price || !itemCode ) {
            res.status(400).json({
                message: "jangan ada kolom yang kosong"
            })
        }
        const newProduct = new gameProduct({
            game: game,
            productName: productName,
            price: price,
            itemCode: itemCode,
            isActive: true,
        })
        if(newProduct) {
            await newProduct.save()
            res.status(200).json({
                message: "product berhasil di tabahkan", 
                idProduct: newProduct._id
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}
export const productEdit = async (req, res) => {
    try {
    const productId = req.params.id;
    const updateData = req.body;

    const product = await gameProduct.findById(productId);
    if (!product) {
      return res.status(400).json({
        message: "ID produk tidak ditemukan"
      });
    }

    const productEdit = await gameProduct.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Produk berhasil diupdate",
      product: productEdit
    });
  } catch (error) {
    console.error("Gagal update produk:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server"
    });
  }
}
export const productDelete = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await gameProduct.findById(productId);

    if (!product) {
      return res.status(400).json({
        message: "ID produk tidak ditemukan"
      });
    }

    await gameProduct.findByIdAndDelete(productId);
    return res.status(200).json({
      message: "Produk berhasil dihapus"
    });
  } catch (error) {
    console.error("Error saat menghapus produk:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server"
    });
  }
};

//function order and edit order
export const getOrder = async (req, res) => {
  try {
    // Ambil semua order
    const orders = await topupOrders.find({}).populate('product', 'productName price');

    if (orders.length === 0) {
      return res.status(400).json({
        message: "belum ada orderan"
      });
    }

    return res.status(200).json({
      message: "daftar orderan",
      orders
    });
  } catch (error) {
    console.error("Error saat mengambil order:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server"
    });
  }
};

export const editOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderStatus = req.body;

    // Validasi jika orderId tidak ditemukan
    const orderFind = await topupOrders.findById(orderId);
    if (!orderFind) {
      return res.status(404).json({
        message: "Order dengan ID tersebut tidak ditemukan"
      });
    }

    // Update status order
    const updatedOrder = await topupOrders.findByIdAndUpdate(orderId, orderStatus, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      message: "Status order berhasil diubah",
      updatedOrder
    });
  } catch (error) {
    console.error("Error saat mengedit order:", error.message);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server"
    });
  }
};