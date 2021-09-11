const Education = require('../models/EducationModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createEducation = catchAsync(async (req, res, next) => {
    const username = req.user.username;
    req.body.username = username;
    const education = await Education.create(req.body);
    res.status(200).json({
        status: 'success',
        education
    });
});


exports.getEducationDetails = catchAsync(async (req, res, next) => {
    const username = req.params.username;
    const education = await Education.findAll({
        where: {
            username
        }
    });
    // if (education.length == 0)
    //     return next(new AppError(`No educaton found for this user`, 404));
    res.status(200).json({
        status: 'success',
        education
    });
});

exports.updateEducation = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let education = await Education.findOne({
        where: {
            id
        }
    });
    if (!education)
        return next(new AppError(`Education with this id does not exist`, 404));
    if (req.user.username != education.username)
        return next(new AppError(`Not allowed to perform this action`, 403));
    education = await Education.update(req.body,
        {
            where: { id },
            returning: true
        });

    res.status(200).json({
        status: 'success',
        education: education[1][0]
    });
});

exports.deleteEducation = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const education = await Education.findOne({
        where: {
            id
        }
    });
    if (!education)
        return next(new AppError(`Education with this id does not exist`, 404));
    if (req.user.username != education.username)
        return next(new AppError(`Not allowed to perform this action`, 403));
    await Education.destroy({
        where: {
            id
        }
    });
    res.status(200).json({
        status: 'success',
        message: 'Education Deleted'
    });
});