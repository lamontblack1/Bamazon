# [Bamazon](https://github.com/lamontblack1/Bamazon)

This is a command line node app that uses the npm mySql package to connect to a database and manipulate data as needed. 

# Why this project is useful
This app allows the user to see product inventory, make orders, and accordingly updates the stock quantity. It allows a manager to query department statistics.

# Technologies Used
* [npm mySql package](https://www.npmjs.com/package/mysql)
* [npm inquirer package](https://www.npmjs.com/package/inquirer)
* [mySql Database](https://www.mysql.com/)

I could not find a very straightforward package that would render a table in the console that was quick to use, so I felt it would be quicker to create my own function to do that. Here is my code below/ It is not perfect since one must add additional width to the columns manually, but it works quite well:

    ```js
    function printToConsole(result) {
        let colWidths = [0, 25, 10, 2, 0, 0]
        let fields = []
        for (const property in result[0]) {
            let x = fields.push(property);
            colWidths[x-1] += property.length
        }
        let consoleLine = ""
        for (let j = 0; j < fields.length; j++) {
            consoleLine += fields[j];
            const colWidth = colWidths[j]
                for (let k = fields[j].length; k < colWidth+1; k++) {
                    consoleLine += " "
                };
            consoleLine += "|"
        }
        console.log(consoleLine)
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
    ```

# How users can get started with this project
This is a command line app that is run in Node. It can be run entering the following in the terminal:

node bamazonCustomer.js
or
node bamazonSupervisor.js

# Screen Shots of the Working App

### Both functions of bamazonCustomer.js
![image of unfulfilled order](https://lamontblack1.github.io/Bamazon/images/customerInsufficient.jpg)

![image of fulfilled order](https://lamontblack1.github.io/Bamazon/images/customerFulfilled.jpg)

### Both functions of bamazonSupervisor.js
![image of unfulfilled order](https://lamontblack1.github.io/Bamazon/images/manager.jpg)

