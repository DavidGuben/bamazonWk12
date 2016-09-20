const mysql    = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "Bamazon"
})

var makeTable = function() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;

    var tab = "\t";
    console.log("ItemID\tProduct Name\tDepartment Name\tPrice\t# In Stock");
    console.log("--------------------------------------------------------");
    for (var i = 0;i<res.length;i++) {
      console.log(res[i].ItemID+tab+res[i].ProductName+tab+res[i].DepartmentName+tab+res[i].Price+tab+res[i].StockQuantity);
    }
    console.log("--------------------------------------------------------");
    promptManager(res);
  })
}

function addItem() {
  inquirer.prompt([{
    type: 'input',
    name: 'productName',
    message: 'What is the name of the product?'
  }, {
    type: 'input',
    name: 'department',
    message: 'What department is it in?'
  }, {
    type: 'input',
    name: 'price',
    message: 'What is the price of the item?'
  }, {
    type: 'input',
    name: 'quantity',
    message: 'How many items are available?'
  }]).then(function(val) {
    connection.query('INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity) VALUES ("'+val.productName+'","'+val.department+'",'+val.price+','+val.quantity+");", function(err,res) {
      if (err) throw err;
      console.log("Item added to Bamazon");
      makeTable();
    })
  })
}

function addQuantity() {
  inquirer.prompt([{
    type: 'input',
    name: 'productName',
    message: 'What product are you updating?'
  }, {
    type: 'input',
    name: 'newQuantity',
    message: 'How much of this item are you adding?'
  }]).then(function(val) {
    connection.query('UPDATE products SET StockQuantity=StockQuantity+'+val.newQuantity+' WHERE ProductName="'+val.productName+'"', function(err, res) {
      if (err) throw err;
      if (res.affectedRows == 0) {
        console.log("That item does not exist");
        makeTable();
      } else {
        console.log("Item's have been added to inventory");
        makeTable();
      }
    })
  })
}

function promptManager(res) {
  inquirer.prompt([{
    type: 'rawlist',
    name: 'choice',
    messsage: 'What would you like to do?',
    choices: ['Add New Item', 'Add Quantity to Existing Items']
  }]).then(function(val) {
    if(val.choice == "Add New Item") {
      addItem();
    }
    if (val.choice == "Add Quantity to Existing Items") {
      addQuantity();
    }
  })
}
makeTable();
