import {Request, Response} from 'express';

/**
 * GET /
 * Home page.
 */
export var index = (req: Request, res: Response) => {
  res.render('home', {
    title: 'Home'
  });
};

