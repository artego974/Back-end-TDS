import { User } from "../model/User";
import { Request,Response } from "express";
import { AppDataSource } from "../db/data-source";
import bcrypt from "bcryptjs";

const userRepository = AppDataSource.getRepository(User);

export class UserController{
    async create(req:Request, res:Response){
        const{email, name,password} = req.body;

        if(!email || !password ||!name){
            res.status(400).json({message:"todos campos sao necessarios"})
            return;
        }
        const existEmail = await userRepository.findOneBy({email:email})

        if(existEmail){
            res.status(409).json({message:"email ja existe"})
        }
        const user = new User(email,password,name)
        const newUser = userRepository.create(user)
        await userRepository.save(newUser)
        res.status(201).json({message:"usuário criado com sucesso"})
        return;
    }
    
}