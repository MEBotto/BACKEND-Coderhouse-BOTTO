import { config } from "../env.config.js";
import { authService } from "../../services/factory.js";
import { Strategy } from "passport-github2";
import logger from "../../utils/logger.js"

const GitHubStrategy = new Strategy(
  {
    clientID: config.githubClientID,
    clientSecret: config.githubSecret,
    callbackURL: config.githubCallbackURL,
    scope: ["user:email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await authService.getAccountByGitHubId(profile._json.id);
      if (!user) {
        let newUser = {
          first_name: profile._json.name,
          photo: profile._json.avatar_url,
          registerWith: profile.provider,
          role: "user",
          github_id: profile._json.id,
        };

        let result = await authService.createAccount(newUser);
        done(null, result);
      } else {
        done(null, user);
      }
    } catch (error) {
      done(error);
      logger.error(error);
    }
  }
);

export default GitHubStrategy;
