"""
+--------------+---------------+------+-----+---------+----------------+
| Field        | Type          | Null | Key | Default | Extra          |
+--------------+---------------+------+-----+---------+----------------+
| ItemID       | int           | NO   | PRI | NULL    | auto_increment |
| Name         | varchar(100)  | NO   |     | NULL    |                |
| BasePrice    | mediumint     | YES  |     | NULL    |                |
| DisplayPrice | mediumint     | YES  |     | NULL    |                |
| DisplayText  | varchar(100)  | NO   |     | NULL    |                |
| Description  | varchar(500)  | YES  |     | NULL    |                |
| ImageLink    | varchar(2048) | YES  |     | NULL    |                |
| IsActive     | tinyint(1)    | NO   |     | NULL    |                |
| IsAvailable  | tinyint(1)    | NO   |     | NULL    |                |
| DisplayOrder | int           | NO   |     | NULL    |                |
| IsFeatured   | tinyint(1)    | NO   |     | 0       |                |
+--------------+---------------+------+-----+---------+----------------+
"""

menuItems = [
  {
    "Name": "pizza_specialty_buffalo",
    "Description": "Our homemade buffalo chicken pizza. White pizza topped with buffalo chicken, our special blend of mozzarella cheese, and blue cheese as a sauce substitute.",
    "ImageLink": "https://img.freepik.com/premium-photo/aesthetic-dripping-tasty-pizza-slice-generative-ai_863013-1954.jpg",
    "DisplayText": "Buffalo Chicken Pizza",
    "DisplayPrice": 1699
  },
  {
    "Name": "pizza_specialty_margherita",
    "Description": "Our homemade buffalo margherita pizza. White pizza topped with fresh tomatoes, fresh basil, and fresh garlic",
    "ImageLink": "https://img.freepik.com/premium-photo/aesthetic-dripping-tasty-pizza-slice-generative-ai_863013-1954.jpg",
    "DisplayText": "Margherita Pizza",
    "DisplayPrice": 1399
  }
]

res = "INSERT INTO MenuItems (Name, Description, ImageLink, BasePrice, DisplayOrder, IsActive, IsAvailable, DisplayText, DisplayPrice) VALUES \n"

for i in range(len(menuItems)):
  currItem = menuItems[i]

  Name = f"""\"{currItem["Name"]}\"""" if "Name" in currItem else ""
  Description = f"""\"{currItem["Description"]}\""""if "Description" in currItem else "NULL"
  ImageLink = f"""\"{currItem["ImageLink"]}\"""" if "ImageLink" in currItem else "NULL"
  BasePrice = currItem["BasePrice"] if "BasePrice" in currItem else "NULL"
  # This wont be perfect, but works as default if lazy
  DisplayOrder = currItem["DisplayOrder"] if "DisplayOrder" in currItem else i
  IsActive = currItem["IsActive"] if "IsActive" in currItem else 1
  IsAvailable = currItem["IsAvailable"] if "IsAvailable" in currItem else 1
  DisplayText = f"""\"{currItem["DisplayText"]}\"""" if "DisplayText" in currItem else "NULL"
  DisplayPrice = currItem["DisplayPrice"] if "DisplayPrice" in currItem else "NULL"
  res += f"""({Name}, {Description}, {ImageLink}, {BasePrice}, {DisplayOrder}, {IsActive}, {IsAvailable}, {DisplayText}, {DisplayPrice})"""

  if i == len(menuItems) - 1:
    res += ";"
  else: 
    res += ", \n"

# Save result to a txt file to just paste into mysql
f = open("menuItems.sql", "w+")
f.write(res)
f.close()