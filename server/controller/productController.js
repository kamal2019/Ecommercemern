const Product = require("../model/productModel");
const Customer = require("../model/customerModel");

// Getting all products from the database.
const getAllProudcts = async (req, res) => {
  try {
    const allProductData = await Product.find({});
    if (allProductData) res.json({ data: allProductData });
    else throw new Error("Error while fetching product data!");
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

// Getting the product category-wise.
const getProduct = async (req, res) => {
  try {
    const { category } = req.params;

    const categoryWiseData = await Product.find({ category });

    if (categoryWiseData) {
      res.json({ data: categoryWiseData });
    } else {
      res.json({ message: `No any product found for category ${category}` });
    }
  } catch (err) {
    res.json({ errorMessage: err.message, stack: err.stack });
  }
};

// Getting the value of single product by id.
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const productData = await Product.findById(productId);

    if (productData) res.json({ data: productData });
    else
      throw new Error(`Error while fetching product data for id ${productId}.`);
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const addProduct = async (req, res) => {
  const customerData = req.customer;
  console.log(customerData);

  const {
    name,
    description,
    quantity,
    price,
    writerName,
    publicationName,
    category,
    releaseYear,
  } = req.body;

  const nameExists = await Product.findOne({ name });

  try {
    if (!customerData) {
      throw new Error("User not authorized.");
    }

    // If book name already exists.
    if (nameExists) {
      throw new Error("Book name already exists.");
    }

    const imgFile = req.file;

    if (!imgFile) {
      throw new Error("Please upload image.");
    }

    if (imgFile) {
      const imgFileName = req.file.filename;

      let basePath;

      if (req.get("host").includes("10.0.2.2")) {
        basePath = `${req.protocol}://${req
          .get("host")
          .replace("10.0.2.2", "localhost")}/public/uploads/`;
      } else {
        basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      }

      const imgUrl = basePath + imgFileName;

      const productData = await Product.create({
        name,
        description,
        price,
        quantity,
        writerName,
        publicationName,
        category,
        imgUrl,
        releaseYear,
        customerId: customerData._id,
      });

      if (productData) {
        res.send({ message: "Product added successfully." });
      } else {
        throw new Error("Product addition failed.");
      }
    }
  } catch (err) {
    res.json({ errorMessage: err.message, stack: err.stack });
  }
};

const updateProduct = async (req, res) => {
  const customerId = req.customer._id;
  const { productId } = req.params;

  try {
    if (!customerId) {
      throw new Error("No user found.");
    }

    if (!productId) {
      throw new Error("No product id.");
    }

    const productData = await Product.findById(productId);

    if (productData.customerId.toString() !== customerId.toString()) {
      throw new Error("User not authorized.");
    }

    const updatedData = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    res.json({ updatedData });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const customerId = req.customer._id;
  const { productId } = req.params;

  try {
    if (!customerId) {
      throw new Error("No user found.");
    }

    if (!productId) {
      throw new Error("No product id.");
    }

    const productData = await Product.findById(productId);

    if (productData.customerId.toString() !== customerId.toString()) {
      throw new Error("User not authorized.");
    }

    await Product.findByIdAndDelete(productId);

    res.json({ productId });
  } catch (err) {}
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProudcts,
  getProductById,
};
