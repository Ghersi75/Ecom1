"""
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| section_id    | int          | NO   | PRI | NULL    | auto_increment |
| name          | varchar(100) | NO   |     | NULL    |                |
| display_order | int          | NO   |     | 0       |                |
| is_active     | tinyint(1)   | NO   |     | 0       |                |
| is_available  | tinyint(1)   | NO   |     | 0       |                |
| display_text  | varchar(100) | NO   |     | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+
"""

sections = [
  {
    "name": "deals",
    "display_order": 0,
    "display_text": "Deals and Coupons"
  },
  {
    "name": "popular",
    "display_order": 1,
    "display_text": "Popular Items"
  },
  {
    "name": "pizzas",
    "display_order": 2,
    "display_text": "Pizzas"
  },
  {
    "name": "grinders",
    "display_order": 3,
    "display_text": "Grinders"
  },
  {
    "name": "appetizers",
    "display_order": 4,
    "display_text": "Appetizers"
  },
]

res = "INSERT INTO sections (name, display_order, is_active, is_available, display_text) VALUES \n"

for i in range(len(sections)):
  section = sections[i]

  if i == len(sections) - 1:
    res += f"""("{section["name"]}", {section["display_order"]}, 1, 1, "{section["display_text"]}");"""
  else: 
    res += f"""("{section["name"]}", {section["display_order"]}, 1, 1, "{section["display_text"]}"), \n"""

# Save result to a txt file to just paste into mysql
f = open("sections.sql", "w+")
f.write(res)
f.close()