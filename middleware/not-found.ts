import { Request, Response } from 'express';

const notFoundMiddleware = (req: Request, res: Response) => res.status(404).send("Sorry, this route does not exist");

export default notFoundMiddleware;