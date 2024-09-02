"""
+---------------+------------+------+-----+---------+----------------+
| Field         | Type       | Null | Key | Default | Extra          |
+---------------+------------+------+-----+---------+----------------+
| combo_id      | int        | NO   | PRI | NULL    | auto_increment |
| display_order | int        | NO   |     | 0       |                |
| is_active     | tinyint(1) | NO   |     | 0       |                |
| is_available  | tinyint(1) | NO   |     | 0       |                |
| section_id    | int        | NO   | MUL | NULL    |                |
| item_id       | int        | NO   | MUL | NULL    |                |
+---------------+------------+------+-----+---------+----------------+
"""

def insertIntoSection(section_id: int, sectionItems: list[dict[str, int]]) -> str:
  res = "INSERT INTO section_items (display_order, is_active, is_available, section_id, item_id) VALUES \n"

  for i in range(len(sectionItems)):
    currItem = sectionItems[i]

    display_order = currItem["display_order"] if "display_order" in currItem else i
    is_active = currItem["is_active"] if "is_active" in currItem else 1
    is_available = currItem["is_available"] if "is_available" in currItem else 1
    item_id = currItem["item_id"] if "item_id" in currItem else Exception("Missing item_id")

    res += f"""({display_order}, {is_active}, {is_available}, {section_id}, {item_id})"""

    if i == len(sectionItems) - 1:
      res += ";"
    else: 
      res += ", \n"

  return res


"""
SELECT item_id, name FROM menu_items;
+---------+----------------------------+
| item_id | name                       |
+---------+----------------------------+
|       2 | pizza_cheese               |
|       3 | pizza_specialty_shkodra    |
|       4 | pizza_specialty_buffalo    |
|       5 | pizza_specialty_margherita |
+---------+----------------------------+
"""
popularSectionId = 4
popularSectionItems = [
  {
    "item_id": 2,
  },
  {
    "item_id": 3
  },
  {
    "item_id": 4
  },
  {
    "item_id": 5
  },
]

res = insertIntoSection(popularSectionId, popularSectionItems)

# Save result to a txt file to just paste into mysql
f = open("sectionItems.sql", "w+")
f.write(res)
f.close()