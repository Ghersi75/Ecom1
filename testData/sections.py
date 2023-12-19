"""
+--------------+--------------+------+-----+---------+----------------+
| Field        | Type         | Null | Key | Default | Extra          |
+--------------+--------------+------+-----+---------+----------------+
| SectionID    | int          | NO   | PRI | NULL    | auto_increment |
| Name         | varchar(100) | NO   |     | NULL    |                |
| DisplayName  | varchar(100) | NO   |     | NULL    |                |
| DisplayOrder | int          | NO   |     | NULL    |                |
| IsActive     | tinyint(1)   | NO   |     | NULL    |                |
| IsAvailable  | tinyint(1)   | NO   |     | NULL    |                |
+--------------+--------------+------+-----+---------+----------------+
"""

def CreateSections(sections) -> str:
  res = "INSERT INTO Sections (Name, DisplayOrder, IsActive, IsAvailable, DisplayName) VALUES \n"

  for i in range(len(sections)):
    section = sections[i]
    Name = f"""\"{section["Name"]}\"""" if "Name" in section else "NULL"
    DisplayOrder = section["DisplayOrder"] if "DisplayOrder" in section else i
    IsActive = section["IsActive"] if "IsActive" in section else 1
    IsAvailable = section["IsAvailable"] if "IsAvailable" in section else 1
    DisplayName = f"""\"{section["DisplayName"]}\"""" if "DisplayName" in section else "NULL"

    res += f"({Name}, {DisplayOrder}, {IsActive}, {IsAvailable}, {DisplayName})"

    if i == len(sections) - 1:
      res += ";"
    else: 
      res += ", \n"

  return res

sections = [
    {
        "Name": "deals",
        "DisplayName": "Deals and Coupons"
    },
    {
        "Name": "popular",
        "DisplayName": "Popular Items"
    },
    {
        "Name": "specials",
        "DisplayName": "Specials"
    },
    {
        "Name": "pizzas",
        "DisplayName": "Pizzas"
    },
    {
        "Name": "pizza_by_the_slice",
        "DisplayName": "Pizza By The Slice"
    },
    {
        "Name": "appetizers",
        "DisplayName": "Appetizers"
    },
    {
        "Name": "soups",
        "DisplayName": "Soups"
    },
    {
        "Name": "salads",
        "DisplayName": "Salads"
    },
    {
        "Name": "sandwiches",
        "DisplayName": "Sandwiches"
    },
    {
        "Name": "grinders",
        "DisplayName": "Grinders"
    },
    {
        "Name": "grinders_grill",
        "DisplayName": "Grinders From The Grill"
    },
    {
        "Name": "wraps",
        "DisplayName": "Wraps"
    },
    {
        "Name": "calzones_strombolis",
        "DisplayName": "Calzones & Strombolis"
    },
    {
        "Name": "pasta_dinners",
        "DisplayName": "Pasta Dinners"
    },
    {
        "Name": "desserts",
        "DisplayName": "Desserts"
    },
    {
        "Name": "drinks",
        "DisplayName": "Drinks"
    }
]

# print(len(sections))

res = CreateSections(sections)

# Save result to a txt file to just paste into mysql
f = open("sections.sql", "w+")
f.write(res)
f.close()