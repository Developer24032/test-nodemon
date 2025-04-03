import { Request, Response } from "express";
const Product = require('../models/product');

interface ProductQuery {
    featured?: boolean;
    company?: string;
    name?: { $regex: string; $options: string };
    price?: { [key: string]: number };
    rating?: { [key: string]: number };
}

interface ProductQueryParams {
    featured?: string;
    company?: string;
    name?: string;
    sort?: string;
    fields?: string;
    numericFilters?: string;
    page?: string;
    limit?: string;
}

export const getAllProductsStatic = async (req: Request, res: Response) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');

  res.status(200).json({ products, nbHits: products.length });
};
export const getAllProducts = async (req: Request<{}, {}, {}, ProductQueryParams>, res: Response) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject: ProductQuery = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${(operatorMap as any)[match]}-`
    );
    const options = ['price', 'rating'];
    filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        (queryObject as any)[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23
  // 4 7 7 7 2

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

export default {
  getAllProducts,
  getAllProductsStatic,
};