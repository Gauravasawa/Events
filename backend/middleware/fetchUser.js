const express = require("express");
var jwt = require("jsonwebtoken");

const JWT_Secret = "faq@ManagmentS=@'System$#";

const fetchuser = (req, res, next) => {
  //Get the user from JwtToken and add id  to req obj
  const token = req.header("authToken");
  if (!token) {
    res.status(401).send({ error: "Access Denied.Invalid Token" });
  }
  try {
    const data = jwt.verify(token, JWT_Secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Access Denied. Invalid Token" });
  }
};

module.exports = fetchuser;
