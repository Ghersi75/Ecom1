"""
+---------------+---------------+------+-----+---------+----------------+
| Field         | Type          | Null | Key | Default | Extra          |
+---------------+---------------+------+-----+---------+----------------+
| item_id       | int           | NO   | PRI | NULL    | auto_increment |
| name          | varchar(100)  | NO   |     | NULL    |                |
| description   | varchar(500)  | YES  |     | NULL    |                |
| image_link    | varchar(2048) | YES  |     | NULL    |                |
| base_price    | mediumint     | YES  |     | NULL    |                |
| display_order | int           | NO   |     | 0       |                |
| is_active     | tinyint(1)    | NO   |     | 0       |                |
| is_available  | tinyint(1)    | NO   |     | 0       |                |
| is_featured   | tinyint(1)    | NO   |     | 0       |                |
| display_text  | varchar(100)  | NO   |     | NULL    |                |
| display_price | mediumint     | YES  |     | NULL    |                |
+---------------+---------------+------+-----+---------+----------------+
"""

menuItems = [
  {
    "name": "pizza_specialty_buffalo",
    "description": "Our homemade buffalo chicken pizza. White pizza topped with buffalo chicken, our special blend of mozzarella cheese, and blue cheese as a sauce substitute.",
    "image_link": "https://img.freepik.com/premium-photo/aesthetic-dripping-tasty-pizza-slice-generative-ai_863013-1954.jpg",
    "display_text": "Buffalo Chicken Pizza",
    "display_price": 1699
  },
  {
    "name": "pizza_specialty_margherita",
    "description": "Our homemade buffalo margherita pizza. White pizza topped with fresh tomatoes, fresh basil, and fresh garlic",
    "image_link": "https://img.freepik.com/premium-photo/aesthetic-dripping-tasty-pizza-slice-generative-ai_863013-1954.jpg",
    "display_text": "Margherita Pizza",
    "display_price": 1399
  }
]

res = "INSERT INTO menu_items (name, description, image_link, base_price, display_order, is_active, is_available, display_text, display_price) VALUES \n"

for i in range(len(menuItems)):
  currItem = menuItems[i]

  name = f"""\"{currItem["name"]}\"""" if "name" in currItem else ""
  description = f"""\"{currItem["description"]}\""""if "description" in currItem else "NULL"
  image_link = f"""\"{currItem["image_link"]}\"""" if "image_link" in currItem else "NULL"
  base_price = currItem["base_price"] if "base_price" in currItem else "NULL"
  # This wont be perfect, but works as default if lazy
  display_order = currItem["display_order"] if "display_order" in currItem else i
  is_active = currItem["is_active"] if "is_active" in currItem else 1
  is_available = currItem["is_available"] if "is_available" in currItem else 1
  display_text = f"""\"{currItem["display_text"]}\"""" if "display_text" in currItem else "NULL"
  display_price = currItem["display_price"] if "display_price" in currItem else "NULL"
  res += f"""({name}, {description}, {image_link}, {base_price}, {display_order}, {is_active}, {is_available}, {display_text}, {display_price})"""

  if i == len(menuItems) - 1:
    res += ";"
  else: 
    res += ", \n"

# Save result to a txt file to just paste into mysql
f = open("menuItems.sql", "w+")
f.write(res)
f.close()