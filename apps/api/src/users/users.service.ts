import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { User } from './users.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { SecurityUtil } from 'common/utils/security.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly securityUtil: SecurityUtil,
  ) {}

  async getUser(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async updateProfile(userId: string, updatedDto: UpdateUserDto) {
    const { password, email, isAdmin } = updatedDto;

    const user = await this.getUser(userId);
    const emailInUse = await this.userModel.findOne({ email });

    if (emailInUse && emailInUse._id.toString() !== user._id.toString()) {
      throw new BadRequestException('Email is already in use.');
    }

    user.email = email;

    if (password) {
      user.password = await this.securityUtil.hashText(password);
    }

    if (typeof isAdmin !== 'undefined') {
      user.isAdmin = isAdmin;
    }

    return {
      user: await user.save(),
    };
  }

  async getCount() {
    return {
      total: await this.userModel.countDocuments().exec(),
    };
  }

  async delete(userId: string) {
    return {
      user: await this.userModel.findByIdAndDelete(userId, {
        new: true,
      }),
    };
  }

  async addFavourite(userId: string, movieId: Types.ObjectId) {
    const user = await this.userModel.findById(userId);
    const favouriteIds = user.favourites.map((favourite) => (
      favourite.toString()
    ));

    if (favouriteIds.includes(movieId.toString())) {
      return { user };
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      user._id,
      { $push: { favourites: movieId } },
      { new: true },
    );

    return {
      user: updatedUser,
    };
  }

  async removeFavourite(userId: string, movieId: Types.ObjectId) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { favourites: movieId } },
      { new: true },
    );

    return {
      user: updatedUser,
    };
  }

  async getFavourites(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'favourites',
        populate: {
          path: 'genres',
        },
      })
      .exec();
    const favourites = user.favourites;

    return {
      favourites,
    };
  }

  async list(search?: string) {
    let options = {};

    if (search) {
      options = {
        $or: [
          { email: new RegExp(search, 'i') },
        ],
      };
    }

    const total = await this.userModel.countDocuments(options).exec();
    const users = await this.userModel
      .find(options)
      .select('-password -updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec();

    return {
      users,
      total,
    };
  }
}
