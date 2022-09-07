const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { categoryModel } = require("../../../models/categories.model");
const { errorMessage } = require("../../../utils/errors");
const { resSuccess } = require("../../../utils/functions");
const {
  addCategoryValidate,
} = require("../../validators/admin/category.validate");
const Controller = require("../Controller");

// getOtpValidate
class Category extends Controller {
  constructor() {
    super();
  }
  async createCategory(req, res, next) {
    try {
      await addCategoryValidate.validateAsync(req.body);
      const { title, description = undefined, parent } = req.body;
      const doc = {
        title,
        description,
        parent,
      };
      const result = await categoryModel.create(doc);
      if (!result)
        throw createHttpError.InternalServerError(errorMessage.internalMessage);

      const statusCode = 201;
      return res.status(statusCode).json({
        ...resSuccess("فهرست شما ایجاد شد", statusCode),
        data: {
          ...result.toObject(),
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const result = await categoryModel.deleteMany({
        $or: [{ _id: categoryId }, { parent: categoryId }],
      });
      if (!result.acknowledged && !result.deletedCount)
        throw createHttpError.InternalServerError(errorMessage.internalMessage);
      res.json({
        ...resSuccess("کنگوری با موفقیت حذف شد"),
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  editCategory() {}
  async getAllCategory(req, res, next) {
    try {
      const result = await categoryModel.aggregate(
        [
          {
            $graphLookup: {
              from: "categories",
              startWith: "$_id",
              connectFromField: "_id",
              connectToField: "parent",
              as: "child",
              depthField: "depthField",
            },
          },
          {
            $match: {
              parent: null,
            },
          },
        ],
        {
          allowDiskUse: false,
        }
      );
      if (!result)
        throw createHttpError.InternalServerError(errorMessage.internalMessage);

      res.json({
        ...resSuccess(),
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const result = await categoryModel.find({ parent: undefined });
      if (!result)
        createHttpError.InternalServerError(errorMessage.internalMessage);
      return res.json({
        ...resSuccess(),
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllChildrenInParent(req, res, next) {
    try {
      const { parentId } = req.params;
      const result = await categoryModel.find({ parent: parentId });
      if (!result)
        createHttpError.InternalServerError(errorMessage.internalMessage);
      return res.json({
        ...resSuccess(),
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
      const { categoryId } = req.params;
      const result = await categoryModel.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(categoryId),
            },
          },
          {
            $graphLookup: {
              from: "categories",
              startWith: "$_id",
              connectFromField: "_id",
              connectToField: "parent",
              as: "child",
              depthField: "depthField",
            },
          },
          {
            $match: {
              parent: null,
            },
          },
        ],
        {
          allowDiskUse: false,
        }
      );
      if (!result.length)
        throw createHttpError.InternalServerError(errorMessage.internalMessage);
      return res.json({
        ...resSuccess(),
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
const category = new Category();
module.exports = category;
