import { ForbiddenError,
         AuthenticationError } from "apollo-server";
import db from "../models"; // TODO: should the db get passed into the constructor?
import crypto from "crypto";
import jwt from "jsonwebtoken";

export default class Login {

  // TODO: remove hard-coded testing variables
  constructor() {
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

  createUserSession(userID) {
    // insert into usersession table
    return db.UserSession.create({
      userID: userID
    }).then( (r) => {
      return JSON.parse(JSON.stringify(r))
    });
  };

  destroyUserSession(userID) {
    return db.UserSession.destroy({
      where: {userID: userID}
    }).then( (r) => {
      return JSON.parse(JSON.stringify(r))
    })
  }

  async getUserFromToken(token) {
    try {
      const {id, sessionID} = jwt.verify(token, this.APP_SECRET);
      /*
       * TODO: a better way to do this with a database is to
       * join the Users table with the UserSessions table on
       * users.id = user_sessions.user_id where session_id = sessionID
       * this would get both the user and the sessionID in one query
       */
      var user = await db.User.findByPk(id).then((r) => {
                                return JSON.parse(JSON.stringify(r));
                               });
      var session = await db.UserSession.findByPk(sessionID).then((r) => {
                                          return JSON.parse(JSON.stringify(r))
                                         });
      if (!session) {
        throw new AuthenticationError('Invalid Session');
      }
      return [user, session.id];
    } catch(error) {
      if (error instanceof jwt.TokenExpiredError) {
        // token expired => invalidate session
        const { sessionID } = jwt.decode(token);
        this.destroyUserSession( sessionID ); // TODO: test
        throw new AuthenticationError('Session Expired')
      }
      // bad/null token => disallow access
      throw new AuthenticationError('Bad Token');
    }
  }

  // TODO: add secret implementation
  async generateToken(user, secret = null, expiresIn = 60 * 10) {
    // insert into usersession table
    const session = await this.createUserSession(user.id);

    // sign token => return along with user
    const token = jwt.sign({ id: user.id, sessionID: session.id }, this.APP_SECRET, {
          expiresIn})
    return {
      user: user,
      token: token
    }
  }

  // removes password-related fields before sending client-side
  omitSecrets(user) {
    var result = {};
    for (var x in user) {
      if ( x !== "passwordHash" && x !== "salt" ) {
        result[x] = user[x];
      }
    }
    return result;
  }

  // TODO: use key (email) to find unique one; right now this returns an array
  findUserByEmail(emailAddress) {
    return db.User.findAll({
      where: {
        email: emailAddress
      }
    }).then( (u) => {
      return JSON.parse(JSON.stringify(u))[0]
    });
  };

  async loginUser(emailAddress, password) {
    // Get user from db by emailAddress
    const user = await this.findUserByEmail(emailAddress);
    if(!user) {
      throw new AuthenticationError("Bad Login or Password");
    }

    // hash the password with the user salt
    // @see: https://en.wikipedia.org/wiki/Salt_(cryptography)
    const hashedPassword = this.sha512(password, user.salt).passwordHash;

    // compare the hashed password against the one in the user record
    if (hashedPassword !== user.passwordHash) {
      throw new AuthenticationError("Bad Login or Password");
    }

    // TODO: check if user already has a session (?)/ how do we pass back the token then?
    // create userSession & token
    let t = await this.generateToken(user);
    return {
      user: this.omitSecrets(t.user),
      token: t.token,
    };
  };

  async logoutUser( user ) {
    return this.destroyUserSession(user.id);
  };

}
