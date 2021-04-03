var mysql = require("mysql");
let inquirer = require("inquirer");

let dbName = "bamazon";

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "passphrase",
  database: dbName
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startPrompts()
});

function startPrompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function (answers) {
         switch (answers.action) {
            case "View Product Sales by Department":
            productSalesByDept()
                break;
            
            case "Create New Department":
            createDept()
                break;
        }
    });
};

function productSalesByDept() {
    let queryURL = "SELECT Departments.department_id, Departments.department_name, " +
        "Departments.over_head_costs, Sum(Products.product_sales) AS product_salesOfSum, " +
        "Sum(Products.product_sales) - departments.over_head_costs AS TotalProfit " +
        "FROM Departments INNER JOIN Products ON Departments.department_name = Products.department_name " +
        "GROUP BY Departments.department_id, Departments.department_name, Departments.over_head_costs;"
    connection.query(queryURL, function(err, res) {
        if (err) throw err;
            // Log all results of the SELECT statement
            printToConsole(res);
            startPrompts();
        });
};

function createDept() {
    inquirer.prompt([
       {
            type: "input",
            name: "deptName",
            message: "What is the name of the new department?",
        },
        {
            type: "input",
            name: "overhead",
            message: "What is the overhead cost of this department?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answers) {
        let queryURL = "INSERT INTO departments (department_name, over_head_costs) " +
            "VALUES ('" + answers.deptName + "', " + answers.overhead + ")"
    connection.query(queryURL, function(err, res) {
        if (err) throw err;
            // Log all results of the SELECT statement
            console.log("\nDepartment added! \n")
            startPrompts();
        });
    });
}

function printToConsole(result) {
    //this array defines how many 'spaces' to add to each column in addition to the length of the column label
    let colWidths = [0, 10, 0, 0, 0]
    let fields = []
        for (const property in result[0]) {
            let x = fields.push(property);
            colWidths[x-1] += property.length
        }
        let consoleLine = "\n"
            for (let j = 0; j < fields.length; j++) {
                consoleLine += fields[j];
                const colWidth = colWidths[j]
                    for (let k = fields[j].length; k < colWidth+1; k++) {
                        consoleLine += " "
                    };
                consoleLine += "|"
            }
        console.log(consoleLine)
         // console.log("ID  | Product                                 | Department          |Price  | Qty | Sales |");
        console.log("-------------------------------------------------------------------------------------------------------------------")
        for (let i = 0; i < result.length; i++) {
            const lineElement = result[i];
            consoleLine = ""
            for (let j = 0; j < fields.length; j++) {
                const fieldValue = lineElement[fields[j]].toString();
                consoleLine += fieldValue;
                const colWidth = colWidths[j]
                    for (let k = fieldValue.length; k < colWidth+1; k++) {
                        consoleLine += " "
                    };
                consoleLine += "|"
            }
            console.log(consoleLine)
            // console.log(element.item_id + "  |  " + element.product_name + "  |  " + element.department_name + "  |  " + element.price + "  |  " + element.stock_quantity)
        }
            console.log("--------------------------------------------------------------------------------------------------------------------\n")

};