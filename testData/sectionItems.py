"""
+--------------+------------+------+-----+---------+----------------+
| Field        | Type       | Null | Key | Default | Extra          |
+--------------+------------+------+-----+---------+----------------+
| ComboID      | int        | NO   | PRI | NULL    | auto_increment |
| SectionID    | int        | NO   | MUL | NULL    |                |
| ItemID       | int        | NO   | MUL | NULL    |                |
| DisplayOrder | int        | NO   |     | NULL    |                |
| IsActive     | tinyint(1) | NO   |     | NULL    |                |
| IsAvailable  | tinyint(1) | NO   |     | NULL    |                |
+--------------+------------+------+-----+---------+----------------+
"""

def insertIntoSection(section_id: int, sectionItems: list[dict[str, int]]) -> str:
  res = "INSERT INTO SectionItems (DisplayOrder, IsActive, IsAvailable, SectionID, ItemID) VALUES \n"

  for i in range(len(sectionItems)):
    currItem = sectionItems[i]

    DisplayOrder = currItem["DisplayOrder"] if "DisplayOrder" in currItem else i
    IsActive = currItem["IsActive"] if "IsActive" in currItem else 1
    IsAvailable = currItem["IsAvailable"] if "IsAvailable" in currItem else 1
    ItemID = currItem["ItemID"] if "ItemID" in currItem else Exception("Missing item_id")

    res += f"""({DisplayOrder}, {IsActive}, {IsAvailable}, {section_id}, {ItemID})"""

    if i == len(sectionItems) - 1:
      res += ";"
    else: 
      res += ", \n"

  return res


"""
SELECT SectionID FROM Sections WHERE Name = "popular";
+-----------+
| SectionID |
+-----------+
|         2 |
+-----------+
"""
popularSectionId = 2
"""
SELECT ItemID, Name FROM MenuItems;
+--------+----------------------------+
| ItemID | Name                       |
+--------+----------------------------+
|      1 | pizza_specialty_buffalo    |
|      2 | pizza_specialty_margherita |
+--------+----------------------------+
"""
popularSectionItems = [
  {
    "ItemID": 1,
  },
  {
    "ItemID": 2
  }
]

res = insertIntoSection(popularSectionId, popularSectionItems)

# Save result to a txt file to just paste into mysql
f = open("sectionItems.sql", "w+")
f.write(res)
f.close()