var mysql    = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password:"password",
  database: "Bamazon" })

connection.connect(function(err){
  if (err) {
    console.error("Error connecting: "+err.stack);
  }
  makeTable();
});

var makeTable = function() {
  connection.query('SELECT * FROM products', function(err,res){
    if(err) throw err;
    var tab="\t";
    console.log("ItemID\tProduct Name\tDepartment Name\tPrice\t# In Stock");
    console.log("--------------------------------------------------------");

    for (var i = 0; i<res.length; i++) {
      console.log(res[i].ItemID+tab+res[i].ProductName+tab+res[i].DepartmentName+tab+res[i].Price+tab+res[i].StockQuantity);
    }
      console.log("----------------------------------------------------------");
      promptCustomer(res);
    }
  )}

var promptCustomer = function(res){
  inquirer.prompt([{
    type: 'input',
    name: 'choice',
    message: 'What would you like to purchase?'
  }]).then(function(val){
    var correct = false;

    for (var i = 0; i<res.length; i++) {
      if(res[i].ProductName == val.choice) {
        var correct = true;
        var product = val.choice;
        var id = i;

        inquirer.prompt([{
          type: 'input',
          name: 'quant',
          message: 'How many would you like to buy?'
        }]).then(function(val){

          if((res[id].StockQuantity-val.quant)>0){
            connection.query("UPDATE products SET StockQuantity='"+product+"'", function(err, res2){
              if(err) throw err;
              console.log("You purchased the product!");
              makeTable();
            })
          } else {
            console.log("Not a valid selection");
            promptCustomer(res);
          }
        })
      }
      if (val.choice=="Q" || val.choice=="q"){process.exit()}
    }
    if (i == res.length && correct == false){
      console.log("Not a valid selection");
      promptCustomer(res);
    }
  })
}
