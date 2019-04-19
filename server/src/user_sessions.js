import jwt from "jsonwebtoken";

export default class UserSessions {

  constructor() {
    this.userSessions = [];
    this.nextID = 0;
  }

  getSession(sessionID) {
    const i = _.findIndex(this.userSessions, u => u.id === sessionID);
    return i === -1 ? null : this.userSessions[i];
  }

  createSession(userID, secret, expiresIn = 60 * 10) {
    const session = { id: this.nextID++, userID: userID };

    const token = jwt.sign({ id: userID, sessionID: session.id }, secret, {
      expiresIn
    });

    this.userSessions.push(session);
    return token;
  }

  invalidateSession(sessionID) {
    this.userSessions = _.remove(this.userSessions, s => s.id === sessionID);
  }
};
