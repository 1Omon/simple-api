import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import * as bcrypt from "bcrypt"
import { Comment } from "./comment.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    email: string;
    
    @Column({nullable: false, unique: true})
    name: string;

    @Column({nullable: false})
    password: string;

    @OneToMany(type=>Comment, comment=>comment.user)
    comments: Comment[]

    @BeforeInsert()
    async hashPassword (){
        this.password = await bcrypt.hash(this.password, 10)
    }
}