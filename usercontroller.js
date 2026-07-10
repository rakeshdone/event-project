const bcryptjs = require("bcryptjs");
const userModel = require("../model/userModel");
const blogModel = require("../model/blogModel");

const regForm = (req, resp) => {
  resp.render("register");
};

const register = async (req, resp) => {
  try {
    const { uname, email, pass } = req.body;
    const hashPassword = await bcryptjs.hash(pass, 10);
    await userModel.create({ uname, email, pass: hashPassword });
    resp.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

const logForm = (req, resp) => {
  resp.render("login");
};

const login = async (req, resp) => {
  try {
    const { uname, pass } = req.body;
    const user = await userModel.findOne({ uname });
    if (user && (await bcryptjs.compare(pass, user.pass))) {
      req.session.uname = uname;
      resp.redirect("/dashboard");
    } else {
      resp.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const dashboard = async (req, resp) => {
  if (!req.session.uname) {
    resp.redirect("/login");
  } else {
    const blogs = await blogModel.find();
    resp.render("dashboard", { uname: req.session.uname, blogs });
  }
};

const logout = (req, resp) => {
  req.session.destroy(() => {
    resp.redirect("/login");
  });
};

module.exports = { regForm, register, logForm, login, dashboard, logout };
