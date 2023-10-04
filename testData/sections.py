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

def CreateSections(sections) -> str:
  res = "INSERT INTO sections (name, display_order, is_active, is_available, display_text) VALUES \n"

  for i in range(len(sections)):
    section = sections[i]
    name = f"""\"{section["name"]}\"""" if "name" in section else "NULL"
    display_order = section["display_order"] if "display_order" in section else i
    is_active = section["is_active"] if "is_active" in section else 1
    is_available = section["is_available"] if "is_available" in section else 1
    display_text = f"""\"{section["display_text"]}\"""" if "display_text" in section else "NULL"

    res += f"({name}, {display_order}, {is_active}, {is_available}, {display_text})"

    if i == len(sections) - 1:
      res += ";"
    else: 
      res += ", \n"

  return res

sections = [
    {
        "name": "deals",
        "display_text": "Deals and Coupons"
    },
    {
        "name": "popular",
        "display_text": "Popular Items"
    },
    {
        "name": "specials",
        "display_text": "Specials"
    },
    {
        "name": "pizzas",
        "display_text": "Pizzas"
    },
    {
        "name": "pizza_by_the_slice",
        "display_text": "Pizza By The Slice"
    },
    {
        "name": "appetizers",
        "display_text": "Appetizers"
    },
    {
        "name": "soups",
        "display_text": "Soups"
    },
    {
        "name": "salads",
        "display_text": "Salads"
    },
    {
        "name": "sandwiches",
        "display_text": "Sandwiches"
    },
    {
        "name": "grinders",
        "display_text": "Grinders"
    },
    {
        "name": "grinders_grill",
        "display_text": "Grinders From The Grill"
    },
    {
        "name": "wraps",
        "display_text": "Wraps"
    },
    {
        "name": "calzones_strombolis",
        "display_text": "Calzones & Strombolis"
    },
    {
        "name": "pasta_dinners",
        "display_text": "Pasta Dinners"
    },
    {
        "name": "desserts",
        "display_text": "Desserts"
    },
    {
        "name": "drinks",
        "display_text": "Drinks"
    }
]

print(len(sections))

res = CreateSections(sections)

# Save result to a txt file to just paste into mysql
f = open("sections.sql", "w+")
f.write(res)
f.close()