/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

let _ = require('underscore');


module.exports = (app) => {

    // Handle POST to create a user session (i.e. log on)
    app.post('/v1/session', function(req, res) {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(400).send({ error: 'username and password required' });
        } else {
            let user = _.findWhere(app.users, { username: req.body.username.toLowerCase() });
            if (!user || user.password !== req.body.password) {
                if (user) console.log(`Password: ${user.password} vs. ${req.body.password}`);
                else console.log(`User not found: ${req.body.username}: [${app.users.map((user)=>user.username)}]`);
                res.status(401).send({ error: 'unauthorized' });
            } else {
                res.status(201).send({
                    username:       user.username,
                    primary_email:  user.primary_email
                });
            }
        }
    });

    // Handle POST to create a new user account
    app.post('/v1/user', function(req, res) {
        let data = req.body;
        console.log(data)
        if(!data||
           !data.primary_email||
           !data.username||
           !data.password) {
               res.status(400).send({ errror: 'username,password,primary email missing'})
           }
        else {
            let user = _.findWhere(app.users, { username: data.username})
            if (user) {
                res.status(400).send({ error: 'user exists'})
            } else {
            let newUser = _.pick(data, 'username', 'primary_email', 'password')
            app.users.push(newUser)
            res.status(201).send({
                username: newUser.username
            })
            }
        }
    });


    // Handle POST to fetch user information
    // app.post('/v1/session', function(req, res) {
    //     console.log("printing app.users");
    //     console.log(app.users);
    //     let data = req.body
    //     console.log("data is ");
    //     console.log(data);
    //     let user = _.findWhere(app.users, { username: data.username });
    //     console.log("user info is:");
    //     console.log(user);
    //     if (!user) {
    //         res.status(404).send({ error: 'unknown user' });
    //     } else {
    //         user = _.pick(user, 'username', 'password', 'primary_email');
    //         if (!user.password != data.password) {
    //             res.status(404).send({ error: 'incorrect password' });
    //         }
    //         res.status(200).send(user);
    //     }
    // });

    // Handle POST to create a new game
    app.post('/v1/game', function(req, res) {
        let data = req.body;
        if (!data ||
            !data.game ||
            !data.color ) {
            res.status(400).send({ error: 'game and color fields required' });
        } else {
            let newGame = _.pick(data, 'game', 'draw', 'color');
            newGame = _.extend(newGame, {
                id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                type: data.game,
                color: data.color,
                draw: data.draw,
                start: Date.now(),
                duration: Math.floor(Math.random() * 500),
                winner: '',
                score: Math.floor(Math.random() * 100),
                cards_remaining: Math.floor(Math.random() * 52),
                active: Math.floor(Math.random() *100) < 50,
                moves: [
                    { duration: Math.floor(Math.random() * 500), player: "tumbler", move: "Ace to K4" },
                    { duration: Math.floor(Math.random() * 500), player: "eagle", move: "Queen to K7" },
                    { duration: Math.floor(Math.random() * 500), player: "rawhide", move: "One to K6" }
                ]
            });
            app.games.push(newGame);
            res.status(201).send({
                id: newGame.id
            });
        }
    });

    // Handle GET to fetch game information
    app.get('/v1/game/:id', function(req, res) {
        let game = _.findWhere(app.games, { id: req.params.id.toLowerCase() });
        if (!game) {
            res.status(404).send({ error: 'unknown game id' });
        } else {
            res.status(200).send(game);
        }
    });

};