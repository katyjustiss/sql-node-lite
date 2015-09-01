var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./Northwind.sl3');

db.serialize(function () {

  db.run('', function () {
    console.log('=========');
    console.log('Categories');
    console.log('=========');
  })

  db.each('SELECT * FROM Categories', function (err, row) {
    console.log(row.Description.toString());
  });


  db.run('', function () {
    console.log('=========');
    console.log('Products');
    console.log('=========');
  })

  db.each('SELECT * FROM Products ' +
  'INNER JOIN Categories ' +
  'ON Products.CategoryID = Categories.CategoryID ' +
  'LIMIT 10', function (err, row) {
    console.log(row.ProductName + ' is a ' + row.CategoryName);
  });

  db.run('', function () {
    console.log('=========');
    console.log('Employee Supervisors');
    console.log('=========');
  })

  db.each('SELECT Employees.LastName, Super.LastName AS Supervisor FROM Employees ' +
  'LEFT OUTER JOIN Employees AS Super ' +
  'ON Employees.ReportsTo = Super.EmployeeID ', function (err, row) {
    if (!row.Supervisor) {
      console.log(row.LastName + ' has no supervisor');
    }
    console.log(row.LastName + '\'s ' + 'supervisor is ' + row.Supervisor);
  })

  // db.run('CREATE TABLE CategoryFavorites', function () {
  //   console.log('=========');
  //   console.log('New Favorites');
  //   console.log('=========');
  // })

  //create table


  db.close();

})
