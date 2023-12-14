"""
+-------------------+--------------------------+------+-----+------------------+----------------+
| Field             | Type                     | Null | Key | Default          | Extra          |
+-------------------+--------------------------+------+-----+------------------+----------------+
| modifier_id       | int                      | NO   | PRI | NULL             | auto_increment |
| name              | varchar(100)             | NO   |     | modifier         |                |
| description       | varchar(255)             | YES  |     | NULL             |                |
| is_required       | tinyint(1)               | NO   |     | 0                |                |
| max_selection     | int                      | YES  |     | NULL             |                |
| default_option_id | int                      | YES  |     | NULL             |                |
| display_order     | int                      | NO   |     | 0                |                |
| is_active         | tinyint(1)               | NO   |     | 0                |                |
| is_available      | tinyint(1)               | NO   |     | 0                |                |
| modifier_type     | enum('RADIO','CHECKBOX') | NO   |     | NULL             |                |
| display_text      | varchar(100)             | NO   |     | Modifier Section |                |
+-------------------+--------------------------+------+-----+------------------+----------------+
"""

modifiers = [
    {
        "name": "toppings",
        "description": "Select your favorite toppings",
        "is_required": 1,
        "max_selection": 5,
        "default_option_id": 1,
        "modifier_type": "CHECKBOX",
        "display_text": "Toppings Options"
    },
    {
        "name": "size",
        "description": "Choose the size of the pizza",
        "modifier_type": "RADIO",
        "display_text": "Size Options"
    }
]

res = "INSERT INTO modifiers (name, description, is_required, max_selection, default_option_id, display_order, is_active, is_available, modifier_type, display_text) VALUES \n"

for i in range(len(modifiers)):
    modifier = modifiers[i]
    name = f'"{modifier["name"]}"'
    description = f'"{modifier["description"]}"' if "description" in modifier else "NULL"
    is_required = modifier["is_required"] if "is_required" in modifier else 0
    max_selection = modifier["max_selection"] if "max_selection" in modifier else "NULL"
    default_option_id = modifier["default_option_id"] if "default_option_id" in modifier else "NULL"
    display_order = modifier["display_order"] if "display_order" in modifier else i
    is_active = modifier["is_active"] if "is_active" in modifier else 1
    is_available = modifier["is_available"] if "is_available" in modifier else 1
    modifier_type = f'"{modifier["modifier_type"]}"'
    display_text = f'"{modifier["display_text"]}"'

    res += f"""({name}, {description}, {is_required}, {max_selection}, {default_option_id}, {display_order}, {is_active}, {is_available}, {modifier_type}, {display_text})"""

    if i == len(modifiers) - 1:
        res += ";"
    else: 
        res += ", \n"

# Save result to a txt file to just paste into mysql
with open("modifiers.sql", "w+") as f:
    f.write(res)
