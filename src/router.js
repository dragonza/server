import { signUp, signin } from "./controllers/authentication";
import "./services/passport";
import passport from "passport";

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate('local', { session: false });
export default app => {
  app.get("/", requireAuth, (req, res) => {
    res.send({ hi: "there" });
  });
  app.post('/signin', requireSignIn, signin);
  app.post("/signup", signUp);
};
