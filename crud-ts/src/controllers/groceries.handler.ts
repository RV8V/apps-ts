import { Request, Response, NextFunction } from 'express'
import { GroceryList } from '../entities/groceryList.entity'

export const showAllGroceries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groceries: GroceryList[] = await GroceryList.find<GroceryList>({ relations: ['items'] })
    res.status(200).json(groceries)
  } catch(err) { next(err) }
}

export const showOneGroceries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const grocery: GroceryList | undefined = await GroceryList.findOne<GroceryList>({ where: { id }, relations: ['items'] })
    if (!grocery) throw new Error('grocery list does not exist')
    res.status(200).json(grocery)
  } catch(err) { next(err) }
}

export const createNewGroceries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const grocery: GroceryList[] = GroceryList.create<GroceryList>(req.body)
    console.log({ grocery })
    await grocery[0].save()
    res.status(201).json(...grocery)
  } catch(err) { next(err) }
}

export const updateGroceries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const grocery: GroceryList | undefined = await GroceryList.findOne<GroceryList>({ where: { id }, relations: ['items'] })
    if (grocery) {
      grocery.name = req.body.name
      await grocery.save()
    }
    res.status(200).json(grocery)
  } catch(err) { next(err) }
}

export const deleteGroceries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const grocery: GroceryList | undefined = await GroceryList.findOne<GroceryList>({ where: { id }, relations: ['items'] })
    if (!grocery) throw new Error('You can not remove grocery list because it does not exists')
    await grocery.remove()
    res.status(204).json(grocery)
  } catch(err) { next(err) }
}
