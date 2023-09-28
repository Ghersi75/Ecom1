import { Module } from '@nestjs/common';
import { MenuItemRepository } from './menu-item.repository';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, MenuItemRepository]
})

export class MenuModule {}
