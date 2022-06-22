
import db from "../models/index";
import CRUDServices from "../services/CRUDServices";



let getHomePage =  (req,res) => {        
    return res.render('homepage.ejs');
    
}

let getCrud = (req,res) => {
    return res.render('crud.ejs');
}

let insertUser = async (req,res) => {
    let message = await CRUDServices.createNewUser(req.body);  
    console.log(message)
    return res.send('form insert');
}

let getUsers =async (req, res) => {
    let data = await CRUDServices.getAllUser();
    console.log(data)
    return res.render('index.ejs',{
        datatable: data
    });
}

let editUser = async (req, res) => {
    
    let userid = req.query.id;
    if(userid){
        let userData = await  CRUDServices.getUserById(userid);
        return res.render('edit.ejs',{
            user: userData
        });
    }else{
        return res.send('User not found');
    }
   
}


let updateUser = async (req, res) => {
    
        let data = req.body;
        await  CRUDServices.updateUserData(data);
        return res.send('update succesfully');
   
}

let getAboutPage = (req, res) => {
    return res.render('about/aboutpage.ejs');
}

//object: key, value
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCrud: getCrud,
    insertUser: insertUser,
    getUsers: getUsers,
    editUser: editUser,
    updateUser: updateUser
}