const catchAsync = require('../utils/catchAsync');
const WorkExperience = require('../models/WorkExperienceModel');
const AppError = require('../utils/appError');

exports.addWorkExp = catchAsync(async (req, res, next) => {

    req.body.username = req.user.username;
    const workExp = await WorkExperience.create(req.body);
    res.status(200).json(workExp);
});

exports.updateWork = catchAsync(async (req, res, next) => {

    let workExp = await WorkExperience.findOne({ where: { id: req.params.id, username: req.user.username } });

    if (req.user.username != workExp.username)
        return next(new AppError(`Not allowed to perform this action`, 403));

    if (workExp == null)
        return next(new AppError(`WorkExperience does not exist for this blog`, 404));

    workExp = await WorkExperience.update(req.body, { returning: true, where: { id: req.params.id, username: req.user.username } });

    res.status(200).json(workExp[1][0]);
});

exports.deleteWork = catchAsync(async (req, res, next) => {
    const workExp = await WorkExperience.findOne({ where: { id: req.params.id, username: req.user.username } });

    if (workExp == null)
        return next(new AppError(`WorkExperience not found`, 404));

    if (req.user.username != workExp.username)
        return next(new AppError(`Not allowed to perform this action`, 403));

    await WorkExperience.destroy({ where: { id: req.params.id, username: req.user.username } });

    res.status(200).json({
        message: "Successfully deleted"
    })
});

exports.getWorkExperiences = catchAsync(async (req, res, next) => {
    const username = req.params.username;
    const workExp = await WorkExperience.findAll({ where: { username } });
    if (workExp.length == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json({
        status: 'success',
        workExp
    });
});