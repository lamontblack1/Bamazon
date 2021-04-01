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
  read("products")
});

function startPrompts() {
    inquirer.prompt([
       {
            type: "input",
            name: "item_id",
            message: "What is the ID of the product you would like to buy?",
            validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
            }
        },
        {
            type: "input",
            name: "qty",
            message: "How many would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answers) {
        checkQtyForOrder(answers.item_id, answers.qty)
    });
};

//read function starts off with showing the table then starting the prompts
//this is a function where if the second argument is not passed it will just select and display all records, otherwise use object with criteria
function read(tableName, objCriteria) {
    console.log
    if (objCriteria) {
        connection.query(
            "SELECT * FROM " + tableName + " WHERE ?",
            objCriteria,
            function (err, res) {
                if (err) throw err;
                printToConsole(res);
                startPrompts();
            });   
        } else {
        connection.query("SELECT * FROM " + tableName, function(err, res) {
        if (err) throw err;
            // Log all results of the SELECT statement
            printToConsole(res);
            startPrompts();
        });    
    }
};

function checkQtyForOrder(itemID, requestQty) {
    let queryURL = "SELECT * from products where item_id = " + itemID
     connection.query(queryURL, function(err, res) {
         if (err) throw err;
         if (res) {
             //Check if there is enough, if so, exec order
             let qtyInStock = res[0].stock_quantity
             if (qtyInStock < requestQty) {
                 console.log("Insufficient Quantity! There are only " + qtyInStock + " of these in stock. Your order has been cancelled.")
                 read("products")
             } else {
                execOrder(itemID, requestQty, qtyInStock, res[0].price)
             }
         }
    });  
}

function execOrder(itemID, requestQty, qtyInStock, itemPrice) {
    let queryURL = "UPDATE products SET ? WHERE ?"
     connection.query(
        queryURL,
        [
        {
            stock_quantity: (qtyInStock - requestQty)
        },
        {
            item_id: itemID
        }
        ],
        function (err, res) {
        if (err) throw err;
            console.log("\nOrder fulfilled!")
            console.log("The cost of your order is $" + itemPrice * requestQty + "\n")
         read("products")
    });  
};

//the npm render to table didn't work for me so I just started making my own decent render
function printToConsole(result) {
    let colWidths = [3, 40, 20, 6, 4]
    let fields = ["item_id", "product_name", "department_name", "price", "stock_quantity"]
        console.log("ID  | Product                                 | Department          |Price  | Qty");
        console.log("--------------------------------------------------------------------------------------------------------")
        for (let i = 0; i < result.length; i++) {
            const lineElement = result[i];
            let consoleLine = ""
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
            console.log("--------------------------------------------------------------------------------------------------------\n")

};