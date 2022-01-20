// const {Pool} = require('pg');

// const pg = new Pool({
//     host: 'rds-shoefinder.cll90vwkcjxw.ap-northeast-2.rds.amazonaws.com', // server name or IP address;
//     port: 5432,
//     database: 'sheofinder_user',
//     user: 'postgres',
//     password: 'shoefinder'
// })

// pg.connect(err =>{
//     if(err) console.log(err);
//     else{
//         console.log("데이터베이스 연결 성공");
//     }
// })

// pg.query("INSERT INTO contents_info (unq_id, shoe_brand, shoe_name, shoe_size,  shoe_color) VALUES ( '77rsh1994@naver.com' , 'nike', 'nike x sacai waffle ld', 275, 'black/yellow');", (err,res)=>{
    
//     console.log(err,res)
//     pg.end()
// })


// var pg = require('pg');

// const dbconfig = {
//     host: process.env.DB_HOST, 
//     user: process.env.DB_USER, 
//     password: process.env.DB_PW, 
//     database: process.env.DB_NAME, 
//     port: process.env.DB_PORT, 
//     ssl: { 
//         rejectUnauthorized: false 
//     } 
// } 

// const client = new pg.Client(dbconfig) 

// client.connect(err => { 
//     if (err) {
//         console.log('Failed to connect db ' + err) 
//     } else { 
//         console.log('Connect to db done!') 
//     } 
// })


const pgp = require('pg-promise')(/* initialization options */)

const cn = {
    host: 'rds-shoefinder.cll90vwkcjxw.ap-northeast-2.rds.amazonaws.com', // server name or IP address;
    port: 5432,
    database: 'sheofinder_user',
    user: 'postgres',
    password: 'shoefinder'
}

const db = pgp(cn) // database instance;


db.oneOrNone("INSERT INTO contents_info (unq_id, shoe_brand, shoe_name, shoe_size,  shoe_color) VALUES ( '100rsh1994@naver.com' , 'nike', 'nike x sacai waffle ld', 275, 'black/yellow');")
    .then(user_info => {
        console.log(user_info); // print user name;
    })
    .catch(error => {
        console.log(error); // print the error;
    })

export {pgp, cn, db};