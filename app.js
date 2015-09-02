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

  // db.run('DROP TABLE IF EXISTS CategoryFavorites')

  // db.run('CREATE TABLE CategoryFavorites ' +
  //   '( FavoriteID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
  //   'CategoryID INTEGER  NOT NULL );'
  // );

  // db.run('INSERT INTO CategoryFavorites (CategoryID) ' +
  //   'VALUES (2), (4), (6), (8);'
  // )

  db.run('', function () {
    console.log('=========');
    console.log('Category Descriptions');
    console.log('=========');
  })

  db.each('SELECT Description FROM Categories ' +
    'INNER JOIN CategoryFavorites ' +
    'ON Categories.CategoryID = CategoryFavorites.CategoryID', function (err, row) {
      console.log(row.Description.toString());
    });

  //update categoryfavorites ID#2 change from Fvorite 4 to 5
  // db.run('UPDATE CategoryFavorites ' +
  //     'SET CategoryID = 5 ' +
  //     'WHERE FavoriteID = 2;' )

  //Delete Category Favs Favorite ID 3.
  // db.run('DELETE FROM CategoryFavorites ' +
  //     'WHERE FavoriteID = 3;')

  //INSET another row CategoryID = 1
  // db.run('INSERT INTO CategoryFavorites (CategoryID) ' +
  //   'VALUES (1);'
  // )



  db.close();

})
