import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async(resolve,reject) =>{
        try {
            let hashPasswordFromBcryptjs = await hashUserPassword(data.password);
            await db.User.create(
                {
                email: data.email,
                password: hashPasswordFromBcryptjs,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true: false,
                roleId: data.roleId
                }
            )
            resolve('create user sucsesfully!')
        } catch (error) {
           reject(error);
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) =>{   
        try {
            let hashUserPassword = await bcrypt.hashSync(password,salt);
            resolve(hashUserPassword);
        } catch (error) {
            reject(error);   
        }
    })
}

let getAllUser = () => {
    return new Promise( async (resolve,reject) => {
        try {
            let allusers = db.User.findAll({
                raw:true,
            });
            resolve(allusers)
        } catch (error) {
            reject(error);
        }
    });
}
let getUserById = (id) => {
    return new Promise( async (resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {id : id},
                raw: true,
            });
            if(user){
                resolve(user)
            }else{
                resolve({})
            }
           
        } catch (error) {
            reject(error);
        }
    });
}

let updateUserData = (data) => {
    return new Promise( async (resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: { id : data.id }
            });
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                
                await user.save();
                resolve();
            }else{
                resolve();
            }
           
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserData: updateUserData
}