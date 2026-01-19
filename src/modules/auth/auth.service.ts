import { prisma } from "@/shared/database/prisma"
import { hashPassword, comparePassword } from "@/shared/utils/hash"
import { signToken } from "@/shared/utils/jwt"

export class AuthService {
  async register(email: string, password: string) {
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) throw new Error("User already exists")

    const hashed = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        roleId: "TEMP_ROLE_ID"
      }
    })

    return user
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new Error("Invalid credentials")

    const valid = await comparePassword(password, user.password)
    if (!valid) throw new Error("Invalid credentials")

    const token = signToken({
      userId: user.id,
      roleId: user.roleId,
      tenantId: user.tenantId
    })

    return { token }
  }
}
