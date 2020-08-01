import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response:Response){
        const city = request.query.city !== undefined ? String(request.query.city) : '';
        const uf = request.query.uf !== undefined ? String(request.query.uf) : '';
        const { items } = request.query;
        
        const parsedItems = items !== undefined ? String(items).split(',').map(item => Number(item.trim())) : [];

        var query = knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .where('city', 'like', `%${city}%`)
            .where('uf', 'like', `%${uf}%`)
            .distinct()
            .select('points.*');

        if(items !== undefined){
            query.whereIn('point_items.item_id', parsedItems)
        }

        const points = await query

        // const points = await knex('points')
        //     .join('point_items', 'points.id', '=', 'point_items.point_id')
        //     .whereIn('point_items.item_id', parsedItems)
        //     .where('city', 'like', `%${city}%`)
        //     .where('uf', 'like', `%${uf}%`)
        //     .distinct()
        //     .select('points.*');

        return response.json(points);
    }

    async show(request: Request, response: Response){
        const { id } = request.params;
        const point = await knex('points').where('id', id).first();
        if(!point) {
            return response.status(400).json({message: 'Point not found.'});
        }
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title','items.id');
        return response.json({point, items});
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();
    
        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const insertedIds = await trx('points').insert(point);    
        const point_id = insertedIds[0];
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        })
    
        await trx('point_items').insert(pointItems);
        await trx.commit();
        return response.json({
            id: point_id,
            ...point
        });
    }
}

export default PointsController;