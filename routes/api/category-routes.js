const router = require("express").Router();
const { Category, category } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated categorys
  Category.findAll({ include: category }).then((categoryData) => {
    res.json(categoryData);
  });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated categorys
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: category,
  }).then((categoryId) => {
    res.json(categoryId);
  });
});

router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_id: req.body.category_id,
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // try {
  //   const categoryData = await category.create({
  //     category_id: req.body.category_id,
  //     category_name: req.body.category_name,
  //     category_price: req.body.category_price,
  //     category_stock: req.body.category_stock,
  //     category_id: req.body.category_category_id,
  //   });
  //   res.status(200).json(categoryData);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    console.log(req.params.id);
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (categoryData === 0) {
      res.status(400).json({ message: "No Category with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(400).json({ message: "No Category with this id!" });
      return;
    }
    res.json({ message: "Successfully deleted Category" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
