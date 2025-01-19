import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

const get = async (req: Request, res: Response) => {
  const object = req.query
  const route = req.params.route

  const facadePath = path.join(__dirname, `../facade/${route}.ts`)

  if (!fs.existsSync(facadePath)) {
    return res.sendStatus(400)
  }

  const facade = require(facadePath)

  const result = await facade.get(object)
  if (result) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}

const insert = async (req: Request, res: Response) => {
  const object = req.body
  const route = req.params.route
  const userId = req.cookies.cookieID
  const files = req.files

  const facade = require(`../facade/${route}`)

  const result = await facade.insert({ ...object, files }, userId)
  if (result.errors) {
    return res.status(400).send(result.errors)
  }
  return res.sendStatus(204)
}

const update = async (req: Request, res: Response) => {
  const id = req.params.id
  const object = req.body
  const route = req.params.route
  const userId = req.cookies.cookieID
  const files = req.files

  const facade = require(`../facade/${route}`)

  const result = await facade.update({ ...object, files }, id, userId)
  if (result.errors) {
    return res.status(400).send(result.errors)
  }
  return res.sendStatus(204)
}

const remove = async (req: Request, res: Response) => {
  const id = req.params.id
  const route = req.params.route
  const facade = require(`../facade/${route}`)

  const result = await facade.remove(id)
  if (result) {
    return res.sendStatus(204)
  }
  return res.sendStatus(400)
}

const getById = async (req: Request, res: Response) => {
  const id = req.params.id
  const route = req.params.route
  const facade = require(`../facade/${route}`)

  const result = await facade.remove(id)
  if (result) {
    return res.sendStatus(204)
  }
  return res.sendStatus(400)
}

export default {
  getById,
  get,
  insert,
  update,
  remove,
}
