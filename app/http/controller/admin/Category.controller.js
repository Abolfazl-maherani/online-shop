const createHttpError = require("http-errors");
const { categoryModel } = require("../../../models/categories.model");
const { errorMessage } = require("../../../utils/errors");
const { resSuccess } = require("../../../utils/functions");
const {
  addCategoryValidate,
} = require("../../validators/admin/category.validate");
const Controller = require("../Controller");
console.log(addCategoryValidate);
addCategoryValidate;
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
      console.log(result);
      const statusCode = 201;
      return res.status(statusCode).json({
        ...resSuccess("فهرست شما ایجاد شد", statusCode),
        data: {
          ...result.toObject(),
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.body;
      const result = await categoryModel.deleteOne({ _id: categoryId });
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
      const result = await categoryModel.find({});
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
}
const category = new Category();
module.exports = category;
