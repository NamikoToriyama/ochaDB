var sqlite3 = require('sqlite3').verbose()
var bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(express.static('public'));
app.set('view engine', 'pug')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

var db = new sqlite3.Database('gunosy.db')

app.get('/', function (req, res, next) {
    var query = "\
    select c.category_name, t.topic_title, t.content, t.author\
    from topic t \
    LEFT OUTER JOIN category c ON c.category_id = t.category_id;\
    ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    })
                  
});
//人気記事
app.get('/pop', function (req, res, next) {
    var query = "\
    select t.click, t.topic_title, t.content, t.author\
    from topic t \
    where CAST(t.click AS INT) >= 100000;\
    ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    })
    
});

// 芸能関係
app.get('/artist', function (req, res, next) {
    var query = "\
    select t.topic_id, t.topic_title, t.content, t.author\
    from topic t \
    where t.category_id = 'ca001';\
    ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    })
    
});

// newsを取ってくる
app.get('/news', function (req, res, next) {
    var query = "\
    select t.topic_id, t.topic_title, t.content, t.author\
    from topic t \
    where t.category_id = 'ca002';\
    ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    })
    
});

// 政治
app.get('/economics', function (req, res, next) {
    var query = "\
    select t.topic_id, t.topic_title, t.content, t.author\
    from topic t \
    where t.category_id = 'ca003';\
    ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    })
    
});

// グルメ
app.get('/eat', function (req, res, next) {
    var query = "\
    select t.topic_id, t.topic_title, t.content, t.author\
    from topic t \
    where t.category_id = 'ca004';\
    ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    }) 
});

// 健康
app.get('/health', function (req, res, next) {
    var query = "\
    select t.topic_id, t.topic_title, t.content, t.author\
    from topic t \
    where t.category_id = 'ca005';\
    ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    })
    
});

// テスト用・消してもいいよ
// app.get('/eat1', function (req, res, next) {
//     var query = "\
//     select t.topic_id, t.topic_title, t.content, t.author\
//     from topic t \
//     where t.category_id = 'ca004';\
//     ";
//         console.log("DBG:" + query);
//     db.all(query, {}, function (err, rows) {
//         if (err) {
//             console.log("ERROR: " + err.message);
//         }
//         res.render('test', { // ここでtest.pugを返す
//             results: rows
//         })
//     }) 
// });

app.get('/quiz', function (req, res, next) {
    var query = "\
    select q.quiz_id, q.quiz_title, q.content\
    from quiz q;\
    ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('test', { // ここでtest.pugを返す
            results: rows
        })
    }) 
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))
