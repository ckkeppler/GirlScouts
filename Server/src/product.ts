import { NextFunction, Response, Router, Request } from "express";
import { getProductRepository, Product } from "./model";

export const router: Router = Router();

router.get(
  "/product",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repository = await getProductRepository();
      const allProducts = await repository.find();
      res.send(allProducts);
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repository = await getProductRepository();
      const product = await repository.findOne(req.params.id);
      res.send(product);
    } catch (err) {
      return next(err);
    }
  }
);

router.post(
  "/product",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repository = await getProductRepository();
      const product = new Product();
      product.name = req.body.name;
      product.sku = req.body.sku;
      product.description = req.body.description;
      product.price = Number.parseFloat(req.body.price);
      product.stock = Number.parseInt(req.body.stock);

      const result = await repository.save(product);
      res.send(result);
    } catch (err) {
      return next(err);
    }
  }
);

router.post(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repository = await getProductRepository();
      const product = await repository.findOne(req.params.id);
      product.name = req.body.name;
      product.sku = req.body.sku;
      product.description = req.body.description;
      product.price = Number.parseFloat(req.body.price);
      product.stock = Number.parseInt(req.body.stock);

      const result = await repository.save(product);
      res.send(result);
    } catch (err) {
      return next(err);
    }
  }
);

router.delete(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repository = await getProductRepository();
      await repository.delete(req.params.id);
      res.send("OK");
    } catch (err) {
      return next(err);
    }
  }
);
