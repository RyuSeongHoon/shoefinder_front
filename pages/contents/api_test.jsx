import {pgp, cn, db} from 'pages/api/rds.js';

db.oneOrNone("INSERT INTO contents_info (unq_id, shoe_brand, shoe_name, shoe_size,  shoe_color) VALUES ( '100rsh1994@naver.com' , 'nike', 'nike x sacai waffle ld', 275, 'black/yellow');")
    .then(user_info => {
        console.log(user_info); // print user name;
    })
    .catch(error => {
        console.log(error); // print the error;
    })