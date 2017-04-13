var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })
const methodOverride = require('method-override')
const session = require('express-session');

var db = pgp('postgres://raymondhendricks@localhost:5432/magic_card_db')

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

app.use(session({
  secret: 'MagicCards',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
//home page
app.get('/', function(req, res){
  if(req.session.user){
    let data = {
      "logged_in": true,
      "username": req.session.user.username
    };
    res.render('index', data)
  } else {
    res.render('index')
  }
})

app.post('/login', function(req, res){
  let data = req.body;
  let auth_error = {
    "error" : "Authorization Failed: Invalid email / password"
  };
  db
    .one("SELECT * FROM users WHERE username = $1", [data.username])
    .catch(function(){
    res.render('index', auth_error);
  })
    .then(function(user){
    bcrypt.compare(data.password, user.password, function(err, cmp){
      if(cmp){
        req.session.user = user;
        res.redirect("/");
      } else {
        res.render('index', auth_error);
      }
    });
  });
});
// build card here
app.get('/card', function(req,res){
  if(req.session.user){
    db.any('SELECT * FROM colors')
      .then(function(data){
      let card_data = {
        "logged_in": true,
        "username": req.session.user.username,
        title: "Fill out the info for your card",
        colors: data
      }
      res.render('card/index', card_data)
    })
  } else {
    res.render('card/index')
  }
})
app.post('/card', upload.single('backgroundImg'), function(req,res){
  let newCard = req.body;
  let username = req.session.user.id;
  let file = req.file.filename;
  db.none('INSERT INTO built (id_color, id_rarity, titleText, flavorText, backgroundImg, id_attack, id_defend, id_username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [newCard.id_color, newCard.rarity, newCard.titleText, newCard.Ftext, file, newCard.attack, newCard.defend, username])
    .then(function(){
    res.redirect('/final')
  });
})
// final page shows card
app.get('/final', function(req,res){
  if(req.session.user){
    let username = req.session.user.id
    db.any('SELECT * FROM built JOIN colors ON id_color = colors.id JOIN rarity ON id_rarity = rarity.id WHERE id_username = $1 ORDER BY built_id DESC;',[username])
      .then(function(data){
      let builtCard = {
        "logged_in": true,
        "username": req.session.user.username,
        title: "Your built cards",
        colors: data
      } 
      res.render('final/index', builtCard)
    })
  } else {
    res.render('final/index')
  }
})
app.get('/final/:id', function(req,res){
  if(req.session.user){
    let id = Number(req.params.id);
    let username = req.session.user.id;
    db.one('SELECT * FROM built JOIN colors ON id_color = colors.id JOIN rarity ON id_rarity = rarity.id WHERE built_id = $1 AND id_username = $2;', [id, username])
      .catch(function(){
      res.send('This is not your card')
    })
      .then(function(data){
      let builtCard = {
        "logged_in": true,
        "username": req.session.user.username,
        title: "built cards",
        colors: data
      } 
      res.render('final/show', builtCard)
    })
  } else {
    res.render('final/index')
  }
})
app.put('/final/:id', function(req, res){
  let id = req.params.id;
  db
    .none('UPDATE built SET flavortext = $1, titletext = $2, id_attack = $3, id_defend = $4 WHERE built_id = $5',
      [req.body.flavortext, req.body.titletext, req.body.id_attack, req.body.id_defend, id]
    ).catch(function(){
      res.send('Failed to update user.');
    }).then(function(){
      res.redirect('/final/'+id);
    });
});
app.get('/final/delete/:id', function(req, res){
  let id = req.params.id
  db
    .none('DELETE FROM built WHERE built_id = $1', [id])
    .catch(function(){
      res.send('Failed to delete card.');
    })
    .then(function(){
      res.redirect('/final');
    });
});

app.get('/signup', function(req, res){
  res.render('signup/index');
});

app.post('/signup', function(req, res){
  let data = req.body;
  let created = {
    "user" : "New user created! Sign in"
  };
  bcrypt
    .hash(data.password, 15, function(err, hash){
    db.none(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [data.username, hash]
    ).catch(function(e){
      res.send('Failed to create user: ' + e);
    }).then(function(){
      res.render('index', created);
    });
  });
});

app.get('/logout', function(req, res){
  req.session.user = false;
  res.redirect("/");
});

app.listen(3000, function(){
  console.log('Running!')
})