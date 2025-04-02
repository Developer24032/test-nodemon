import { Request, Response } from 'express';
import Product from '../models/product';
import { StatusCodes } from 'http-status-codes';
import { QueryParams } from '../interfaces/Product';

export const getAllProductsStatic = async (req: Request, res: Response) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');

  res.status(StatusCodes.OK).json({ products, nbHits: products.length });
};

export const getAllProducts = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  const { featured, company, name, sort, fields, numericFilters, page, limit } = req.query;
  const queryObject: Record<string, any> = {};

  if (featured) {
    queryObject.featured = featured === 'true';
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (numericFilters) {
    const operatorMap: Record<string, string> = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    const filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    
    filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  // Sorting
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // Field selection
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // Pagination
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  result = result.skip(skip).limit(limitNumber);

  const products = await result;
  const totalProducts = await Product.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({
    products,
    nbHits: products.length,
    total: totalProducts,
    page: pageNumber,
    pages: Math.ceil(totalProducts / limitNumber),
  });
};