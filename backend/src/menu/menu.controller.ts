import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private MenuService: MenuService) { }

  @Get("/sections")
  async getSections() {
    return this.MenuService.getSections()
  }

}
