import { Router } from "express";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../../utils.js";

export default class CustomRouter {
  constructor () {
    this.router = Router();
    this.init();
  }

  getRouter () {
    return this.router;
  }

  init () { }

  // GET

  get (path, policies, ...callbacks) {
    this.router.get(
      path, 
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  // POST

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  };

  // PUT

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  };

  // DELETE
  
  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  };

  applyCallbacks (callbacks) {
    return callbacks.map((callback) => (...params) => {
      try {
        if (typeof callback === 'function') {
          callback.apply(this, params);
        } else {
          console.warn('Callback is not a function');
        }
      } catch (error) {
        console.error(error);
        // params[1] hace referencia al res
        params[1].status(500).send(error);
      } 
    })
  }

  handlePolicies = policies => (req, res, next) => {
    //Validate if you have public access:
    if (policies[0] === "PUBLIC") return next();

    //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth:");
    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).send({ error: "User not authenticated or missing token." });
    }

    const token = authHeader.split(' ')[1]//Se hace el split para retirar la palabra Bearer.

    // //The JWT token is stored in the authorization headers:
    // let cookieToken = null;
    // if (req && req.cookies) {
    //   cookieToken = req.cookies['jwtCookieToken'];
    // } else {
    //   return res.status(403).send({ error: "User not authenticated or missing token." })
    // }

    // if (!cookieToken) {
    //   return res.status(403).send({ error: "User not authenticated or missing token." })
    // }

    jwt.verify(token, PRIVATE_KEY, (error, credential) => {
      if (error) return res.status(401).send({ error: "Invalid Token, unauthorized!", erro: error });
      //Token OK
      const user = credential.user;
      //It is verified that within the policies there is the user.role that arrives with this user
      if (!policies.includes(user.role.toUpperCase())) return res.status(401).send({ error: "This user doesn't have the required privileges, verify your roles!" });
      //If the user.role is within policies, you can enter
      req.user = user;
      console.log(req.user);
      next();
    })
  }

  generateCustomResponses = (req, res, next) => {
    //Custom Responses
    res.sendSuccess = payload => res.status(200).send({ status: "Success", payload });
    res.sendInternalServerError = error => res.status(500).send({ status: "Error", error });
    res.sendClientError = error => res.status(400).send({ status: "Client Error, bad request.", error });
    res.sendUnauthorizedError = error => res.status(403).send({ error: "User not authenticated or missing token." });
    res.sendForbiddenError = error => res.status(401).send({ error: "Invalid Token or user with no access, Unauthorized please verify your roles!" });
    next();
  }
}