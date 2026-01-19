import { Request, Response } from "express"
import { AuthService } from "./auth.service"

const service = new AuthService()

export class AuthController {
  async register(req: Request, res: Response) {
    const { email, password } = req.body
    const user = await service.register(email, password)
    res.status(201).json(user)
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    const result = await service.login(email, password)
    res.json(result)
  }
}
