'use strict';
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/UserModel');
const Credential = require('../models/CredentialModel');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const sendEmail = require('./../utils/sendEmail');
const Education = require('../models/EducationModel');
const WorkExperience = require('../models/WorkExperienceModel');
const Sequelize = require('sequelize');
const Project = require('../models/ProjectModel');


exports.registerUser = catchAsync(async (req, res, next) => {
  const Op = Sequelize.Op;
  const { email, username,name } = req.body;
  console.log(email,username)
  let user = await Credential.findOne({
    where: 
      { email }
  });
  if (user)
    return next(new AppError('Email is already used!', 405));
  user = await User.findOne({
    where: 
      { username }
  });
  console.log(user)
  if (user)
    return next(new AppError('User Already Exist!', 405));
  const randompassword = generator.generate({
    length: 10,
    numbers: true
  });
  const message = `<div>Hey ${username}, Your account is created for ProfileHub.Your password is <h1>${randompassword}</h1><br> 
                          Please change this password after first login.</div>`;

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(randompassword, salt);
  user = await User.create({ username,name});

  let er = false;
  await Credential.create({ email, password,username }).catch(err => {
    console.log(err)
    User.destroy({ where: { username } })
    er = true;
  });
  if (er)
    return next(new AppError('Not A Valid Email!', 405));

  sendEmail(email, 'Greetings from ProfileHub', message);
  res.status(201).json({
    status: 'success',
    pass: randompassword,
    user
  });
});


exports.getSingleUser = catchAsync(async (req, res, next) => {
  const username = req.params.username || req.user.username;
  const user = await User.findOne({
    where: {
      username
    }, include: [Credential, Education, WorkExperience,Project],
  });
  if (user == null)
    return next(new AppError(`User with Username : ${username} not found!`, 404));
  user.credential.password = undefined;
  res.status(200).json({
    status: 'success',
    user
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const username = req.user.username;
  const user = await User.update(req.body,
    {
      where: { username },
      returning: true
    });
  res.status(200).json({
    status: 'success',
    user: user[1][0]
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const reg_no = req.params.reg_no;
  const user = await User.findOne({
    where: {
      reg_no
    }
  });
  if (user == null)
    return next(new AppError(`User does not exist`, 404));
  User.destroy({
    where: {
      reg_no
    }
  });
  res.status(200).json({
    status: 'success',
    message: 'User deleted'
  });
});

exports.setAdmin = catchAsync(async (req, res, next) => {
  const { role, reg_no } = req.body;
  let user = await User.findOne({
    where: {
      reg_no
    }
  });
  if (user == null)
    return next(new AppError(`User does not exist`, 404));
  user = await Credential.update({ role },
    {
      where: { reg_no },
      returning: true
    });
  res.status(200).json({
    status: 'success',
    message: `User has been made ${role}`
  });
});

exports.setStatus = catchAsync(async (req, res, next) => {
  const { status, reg_no } = req.body;
  let user = await User.findOne({
    where: {
      reg_no
    }
  });
  if (user == null)
    return next(new AppError(`User does not exist`, 404));
  user = await Credential.update({ status },
    {
      where: { reg_no },
      returning: true
    });
  res.status(200).json({
    status: 'success',
    message: `User has been made ${status}`
  });
});

exports.removeAdmin = catchAsync(async (req, res, next) => {
  const reg_no = req.params.reg_no;
  let user = await User.findOne({
    where: {
      reg_no
    }
  });
  if (user == null)
    return next(new AppError(`User does not exist`, 404));
  user = await Credential.update({ role: 'user' },
    {
      where: { reg_no },
      returning: true
    });
  res.status(200).json({
    status: 'success',
    message: `User with reg_no: ${reg_no} is removed from admin/superadmin`
  });
});


