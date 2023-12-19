"""
+-----------------+--------------------------+------+-----+---------+----------------+
| Field           | Type                     | Null | Key | Default | Extra          |
+-----------------+--------------------------+------+-----+---------+----------------+
| ModifierID      | int                      | NO   | PRI | NULL    | auto_increment |
| Name            | varchar(100)             | NO   |     | NULL    |                |
| DisplayText     | varchar(100)             | NO   |     | NULL    |                |
| Description     | varchar(255)             | YES  |     | NULL    |                |
| IsRequired      | tinyint(1)               | NO   |     | NULL    |                |
| MaxSelection    | int                      | YES  |     | NULL    |                |
| ModifierType    | enum('RADIO','CHECKBOX') | YES  |     | NULL    |                |
| DefaultOptionID | int                      | YES  |     | NULL    |                |
| DisplayOrder    | int                      | NO   |     | NULL    |                |
| IsActive        | tinyint(1)               | NO   |     | NULL    |                |
| IsAvailable     | tinyint(1)               | NO   |     | NULL    |                |
+-----------------+--------------------------+------+-----+---------+----------------+
"""

modifiers = [
    {
        "Name": "toppings",
        "Description": "Select your favorite toppings",
        "IsRequired": 1,
        "MaxSelection": 5,
        "DefaultOptionID": 1,
        "ModifierType": "CHECKBOX",
        "DisplayText": "Toppings Options"
    },
    {
        "Name": "size",
        "Description": "Choose the size of the pizza",
        "ModifierType": "RADIO",
        "DisplayText": "Size Options"
    }
]

res = "INSERT INTO Modifiers (Name, Description, IsRequired, MaxSelection, DefaultOptionID, DisplayOrder, IsActive, IsAvailable, ModifierType, DisplayText) VALUES \n"

for i in range(len(modifiers)):
    modifier = modifiers[i]
    Name = f'"{modifier["Name"]}"'
    Description = f'"{modifier["Description"]}"' if "Description" in modifier else "NULL"
    IsRequired = modifier["IsRequired"] if "IsRequired" in modifier else 0
    MaxSelection = modifier["MaxSelection"] if "MaxSelection" in modifier else "NULL"
    DefaultOptionID = modifier["DefaultOptionID"] if "DefaultOptionID" in modifier else "NULL"
    DisplayOrder = modifier["DisplayOrder"] if "DisplayOrder" in modifier else i
    IsActive = modifier["IsActive"] if "IsActive" in modifier else 1
    IsAvailable = modifier["IsAvailable"] if "IsAvailable" in modifier else 1
    ModifierType = f'"{modifier["ModifierType"]}"'
    DisplayText = f'"{modifier["DisplayText"]}"'

    res += f"""({Name}, {Description}, {IsRequired}, {MaxSelection}, {DefaultOptionID}, {DisplayOrder}, {IsActive}, {IsAvailable}, {ModifierType}, {DisplayText})"""

    if i == len(modifiers) - 1:
        res += ";"
    else: 
        res += ", \n"

# Save result to a txt file to just paste into mysql
with open("modifiers.sql", "w+") as f:
    f.write(res)
