import { BadRequestException, Injectable } from '@nestjs/common';
import { sql } from 'kysely';
import { DbService } from 'src/db/db.service';
import { MenuItemRepository } from './menu-item.repository';

@Injectable()
export class MenuService {
  constructor(private menuItemRepo: MenuItemRepository) {}

  async getSections() {
    return this.menuItemRepo.getAllActiveSections();
  }

  async getItem(id: number) {
    return this.menuItemRepo.getMenuItemById(id)
  }
}
