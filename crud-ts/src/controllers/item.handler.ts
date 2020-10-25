import { Request, Response, NextFunction } from 'express'
import { Item } from '../entities/item.entity'
import { GroceryList } from '../entities/groceryList.entity'

export const showAllItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const list: GroceryList | undefined = await GroceryList.findOne<GroceryList>({ where: { id }, relations: ['items'] })
    if (!list) throw new Error('Do not have such grocery list and items in it too of course')
    res.send(200).json(list.items)
  } catch(err) { next(err) }
}

export const showItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params
    const item = await Item.findOne<Item>({ where: { id: itemId } })
    res.status(200).json(item)
  } catch(err) { next(err) }
}

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    let item: Item[] | Item = Item.create<Item>(req.body)
    item = await item[0].save()
    const list: GroceryList | undefined = await GroceryList.findOne<GroceryList>({ where: { id }, relations: ['items'] })
    if (!list) throw new Error('can not create item because we do not have its list')
    list.items.push(item)
    await list.save()
    return res.send(201).json(list)
  } catch(err) { next(err) }
}

export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params
    const item: Item | undefined = await Item.findOne<Item>({ where: { id: itemId } })
    if (!item) throw new Error('no such item so we can not update this item')
    item.name = req.body.name
    await item.save()
    res.status(200).json(item)
  } catch(err) { next(err) }
}

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params
    const item: Item | undefined = await Item.findOne<Item>({ where: { id: itemId } })
    if (!item) throw new Error('no such item so we can not delete this item')
    await item.remove()
    res.status(200).json(item)
  } catch(err) { next(err) }
}
