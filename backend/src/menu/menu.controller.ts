import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private MenuService: MenuService) { }

  @Get("/sections")
  async getSections() {
    return this.MenuService.getSections()
  }

  @Get("/item/:id")
  async getItem(@Param() params: { id: number }) {
    return this.MenuService.getItem(params.id)
  }

}
