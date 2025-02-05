const Product = require("../Models/Products");
const fs = require("fs");

exports.read = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const producted = await Product.findOne({id: id}).exec();
    res.send(producted);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.list = async (req, res) => {
  try {
    // กำหนดตัวแปร filter ที่จะใช้ในการค้นหาจาก query params
    const {category} = req.query;

    // สร้าง filter object
    let filter = {};

    if (category) {
      filter = {category: category};
    }
    // code
    const producted = await Product.find(filter).exec();
    res.send(producted);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.listby = async (req, res) => {
  try {
    // code
    const {sort, order} = req.body;
    const producted = await Product.find({})
      .sort({[sort]: order === "desc" ? -1 : 1})
      .exec();
    res.send(producted);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    // หา id ที่มีค่ามากที่สุด
    const latestid = await Product.findOne().sort({id: -1}).exec();
    const id = latestid ? latestid.id + 1 : 1;
    // code
    var data = req.body;
    data.id = id; // เพิ่ม id เข้าไปใน data

    // ตรวจสอบและจัดการไฟล์หลายไฟล์
    if (req.files && req.files.length > 0) {
      data.files = req.files.map((file) => file.filename);
    }

    const producted = await Product(data).save();
    res.send(producted);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    var newData = req.body;

    if (typeof req.file != "undefined") {
      newData.file = req.file.filename;
      await fs.unlink("./uploads/" + newData.fileold, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Edit Success");
        }
      });
    }
    const updated = await Product.findOneAndUpdate({id: id}, newData, {
      new: true,
    }).exec();
    res.send(newData);

    // res.send(updated);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.remove = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const removed = await Product.findOneAndDelete({id: id}).exec();

    if (removed?.file) {
      await fs.unlink("./uploads/" + removed.file, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Remove Success");
        }
      });
    }
    res.send(removed);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};
