import { jwt } from '@elysiajs/jwt'
import { cookie } from '@elysiajs/cookie'

export const jwtConfig = jwt({
    name: 'jwt',
    secret: '12234556',
    exp: '7d'
})

export const cookieConfig = cookie();