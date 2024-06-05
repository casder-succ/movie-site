import crypto from 'crypto';

import { Injectable } from '@nestjs/common';

import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class SecurityUtil {
  private readonly HASH_SALT = 10;

  /**
   * @desc Generates random string, useful for creating secure tokens
   *
   * @return {string} - random string
   */
  async getSaltyHash(): Promise<string> {
    return genSalt(this.HASH_SALT);
  }

  /**
   * @desc Generate hash from any string. Could be used to generate a hash from password
   *
   * @param text {string} - a text to produce hash from
   * @return {Promise<string>} - a hash from input text
   */
  async hashText(text: string): Promise<string> {
    const salt = await this.getSaltyHash();

    return hash(text, salt);
  }

  /**
   * @desc Compares if text and hash are equal
   *
   * @param text {string} - a text to compare with hash
   * @param hashedText {string} - a hash to compare with text
   * @return {Promise<boolean>} - are hash and text equal
   */
  async compareTextWithHash(text: string, hashedText: string): Promise<boolean> {
    return compare(text, hashedText);
  }

  /**
   * @desc Generates random string, useful for creating secure tokens
   *
   * @param tokenLength {number} - length of the token
   * @return {Promise<string>} - random string
   */
  async generateSecureToken(tokenLength = 48): Promise<string> {
    const buf = crypto.randomBytes(tokenLength);
    return buf.toString('hex');
  }
}
