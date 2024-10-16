import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService:UserService,
        private readonly commentService: CommentService
    ){}

    @Get("/all")
    findAll(){
        return 'all users'
    }

    @Get(":id")
    findOne(@Param("id") id: number){
        return this.userService.findOne(id)
    }

    // @Post()
    // postTest(@Body() body:any){
    //     return body
    // }

    // @Post("create")
    // create(@Body("name") name:string){
    //     return name
    // }

    @Post("create")
    create(@Body() createUserDto:CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Put(":id")
    update(@Param('id') id:number, @Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id, updateUserDto)
    }

    @UseGuards(JwtGuard)
    @Get("/:id/comments")
    getUserComments(@Param('id') id: string){
        return this.commentService.findUserComments(id)
    }
}
