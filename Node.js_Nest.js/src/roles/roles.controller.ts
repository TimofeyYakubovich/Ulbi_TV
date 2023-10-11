import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

    @Get('/:value') // сдесь будет динамически изминяющийся участок пути в каорой будет добовляться value что бы это value втащить используем
    getByValue(@Param('value') value: string) { // декоратор Param и в него передаем название этого динамически изминяющегося участка пути
        return this.rolesService.getRoleByValue(value)
    }

}
