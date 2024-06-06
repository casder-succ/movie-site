import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';

import { SecurityUtil } from 'common/utils/security.util';
import { DocumentTimestamps } from 'common/types/schema.types';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

import { User, UserDocument } from '../users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User & DocumentTimestamps>,
    private readonly securityUtil: SecurityUtil,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: LoginDto) {
    const user = await this.validateUser(authDto.email, authDto.password);

    const tokenPair = await this.issueTokenPair(String(user._id));

    return {
      user,
      ...tokenPair,
    };
  }

  async refreshTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) {
      throw new BadRequestException('Invalid refresh token.');
    }

    const payload = await this.jwtService.verifyAsync(refreshToken);

    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    const user = await this.userModel.findById(payload._id);

    const tokenPair = await this.issueTokenPair(String(user._id));

    return {
      user,
      ...tokenPair,
    };
  }

  async register(registerDto: RegisterDto) {
    const isUserExist = await this.userModel.findOne({ email: registerDto.email });

    if (isUserExist) {
      throw new BadRequestException('User already exists.');
    }

    const passwordHash = await this.securityUtil.hashText(registerDto.password);

    const createdUser = new this.userModel({
      email: registerDto.email,
      name: registerDto.name,
      password: passwordHash,
    });

    const tokenPair = await this.issueTokenPair(String(createdUser._id));

    return {
      user: createdUser,
      ...tokenPair,
    };
  }

  private async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordMatch = await this.securityUtil.compareTextWithHash(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }

  async issueTokenPair(userId: string) {
    const payload = { _id: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '15d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }
}
