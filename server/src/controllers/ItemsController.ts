import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*'); //Utiliza o await para esperara a consulta ser executada
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.0.122:3333/uploads/${item.image}`,
            }
        })
        return response.json(serializedItems);
    }
}

export default ItemsController;