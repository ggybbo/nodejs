const mysql = require('mysql2');

// 1. Run Query (createPool은 application 연결 종료시 connect을 끝는다)
// 2. 쿼리를 날릴때마다 새로운 connection을 맺는 방법, connection의 비용이 많이든다
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'gudwp4920',
  database: 'udemy'
});

module.exports = pool.promise();