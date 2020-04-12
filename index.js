const express = require('express');
const path = require('path');
const port = 1996;
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine' , 'ejs');

app.set('views',path.join(__dirname,'views' ));
app.use(express.urlencoded());

app.use(express.static('assets'));

var contactList = [
    {
        name : 'Ashutosh ',
        number: '8876567809'
    },
    {
        name : 'Ronin',
        number:'5673456978'
    },
]

app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in fetching contacts from the db");
            return;
        }
        return res.render('home',{
                 title :"Contact List",
                 contact_list : contacts

    });
    // return res.render('home',{
    //      title :"Contact List",
    //      contact_list : contactList
        }); 
});
app.get('/practice',function(req,res){
    return res.render('practice',{ title :"Playground"
       }); 
});
app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     number: req.body.number
    // })
    // or
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        number: req.body.number
    },function(err,newContact){
        if(err){
            console.log("Error in creating a contact");
            return;
        }
        console.log("*******",newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');
});
app.get('/delete-contact', function(req,res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting contact from database");
            return;
        }
        return res.redirect('/');
    });

    // let contactIndex = contactList.findIndex(contact => contact.number == number);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');
});
app.listen(port,function(err){
    if(err){
        console.log('error in running server',err);
        return;
    }
    console.log('Server is up and rolling on port :' ,port );
});