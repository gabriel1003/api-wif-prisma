import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersRepository {

  constructor( private readonly prisma: PrismaService ) {
  }

  async create( createUserDto: CreateUserDto ): Promise<UserEntity> {

    return this.prisma.user.create({

      data: createUserDto,
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {

    return await this.prisma.user.findMany({

      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findOne( id: number ): Promise<UserEntity> {

    return this.prisma.user.findUnique({

      where: {
        id,
      },
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async update( id: number, updateUsersDto: UpdateUserDto ): Promise<UserEntity> {

    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUsersDto,
      include: {
        posts: {
          select: {
            title: true,
createdAt: true,
          },
        },
      },
    });
  }

  async remove( id: number ): Promise<UserEntity> {

    return this.prisma.user.delete({

      where: {
        id,
      },
    });
  }


}