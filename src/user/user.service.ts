import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo:Repository<User>){}
    async findOne(id: number){
        return await this.userRepo.findOne({where: {id: id}})
    }

    async create(createUserDto:CreateUserDto){
        const user = await this.userRepo.create(createUserDto)
        return await this.userRepo.save(user)
    }

    async update(id:number, updateUserDto: UpdateUserDto){
        return await this.userRepo.update(id, updateUserDto)
    }

    async findOneWithUserName(username: string) {
        return await this.userRepo.findOne({where: {email: username}})
    }
}
