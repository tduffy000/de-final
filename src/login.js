import { ForbiddenError,
         AuthenticationError } from "apollo-server";
import db from "../models";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import regeneratorRuntime from "regenerator-runtime";

export default class Login {

  constructor( db ) {
    this.DB = db;
    this.user_manager = new Users( db );
    this.APP_SECRET = "App Secret Key ; For example only! Don't define one in code!!!";
  }

  genRandomString(length) {
   return crypto
     .randomBytes(Math.ceil(length / 2))
     .toString('hex') /** convert to hexadecimal format */
     .slice(0, length); /** return required number of characters */
  };

  sha512(password, salt) {
    var hash = crypto.createHmac(
     'sha512',
     salt,
    ); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
     salt: salt,
     passwordHash: value,
    };
  };

  genSaltHashPassword(userpassword) {
    var salt = this.genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = this.sha512(userpassword, salt);
    return passwordData;
  };

  async createUserSession(userID) {
    var s = await this.DB.UserSession.findOrCreate({
      userID: userID
    });
    return s;
  };

  async destroyUserSession(userID) {
    var r = await this.DB.UserSession.destroy({
      where: {userID: userID}
    });
    return r;
  }

  async getUserFromToken(token) {
    try {
      const {id, sessionID} = jwt.verify(token, this.APP_SECRET);
      var user = await this.user_manager.get(id);
      var session = await this.DB.UserSession.findByPk(sessionID);
      if (!session) {
        throw new AuthenticationError('Invalid Session');
      }
      return [user, session.id];
    } catch(error) {
      if (error instanceof jwt.TokenExpiredError) {
        const { sessionID } = jwt.decode(token);
        this.destroyUserSession( sessionID );
        throw new AuthenticationError('Session Expired')
      }
      throw new AuthenticationError('Bad Token');
    }
  }

  // TODO: add secret implementation
  async generateToken(user, secret = null, expiresIn = 60 * 10) {
    const session = await this.createUserSession(user.id);
    const token = jwt.sign({ id: user.id, sessionID: session.id }, this.APP_SECRET, {
          expiresIn})
    return {
      user: user,
      token: token
    }
  }

  omitSecrets(user) {
    var result = {};
    for (var x in user) {
      if ( x !== "passwordHash" && x !== "salt" ) {
        result[x] = user[x];
      }
    }
    return result;
  }

  async loginUser(emailAddress, password) {
    const user = await this.user_manager.findUserByEmail(emailAddress);
    if(!user) {
      throw new AuthenticationError("Bad Login or Password");
    }
    const hashedPassword = this.sha512(password, user.salt).passwordHash;
    if (hashedPassword !== user.passwordHash) {
      throw new AuthenticationError("Bad Login or Password");
    }

    var t = await this.generateToken(user);
    return {
      user: this.omitSecrets(t.user),
      token: t.token,
    };
  };

  async logoutUser( user ) {
    return this.destroyUserSession(user.id);
  };

}
