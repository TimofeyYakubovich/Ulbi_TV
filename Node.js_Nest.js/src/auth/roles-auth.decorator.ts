// декоратор roles в папке auth так как он связан с авторизацией

import { SetMetadata } from "@nestjs/common"

export const ROLES_KEY = 'roles' // константа с ключем по этому ключу сможем получать метаданные внутри гуарда

// создадим функцию каторая будет являться декоратором принимает массив рлей стринговых
// в ней вызываем функцию SetMetadata() 1 передаем константный ключ 2 массив ролей
// теперь внутри RolesGuard эти роли сможем получить
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)