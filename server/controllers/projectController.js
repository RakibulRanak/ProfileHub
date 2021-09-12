const Project = require('../models/ProjectModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createProject = catchAsync(async (req, res, next) => {
    const username = req.user.username;
    req.body.username = username;
    const project = await Project.create(req.body);
    res.status(200).json({
        status: 'success',
        project
    });
});


exports.getProjectDetails = catchAsync(async (req, res, next) => {
    const username = req.params.username;
    const project = await Project.findAll({
        where: {
            username
        }
    });
    // if (project.length == 0)
    //     return next(new AppError(`No educaton found for this user`, 404));
    res.status(200).json({
        status: 'success',
        project
    });
});

exports.updateProject = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let project = await Project.findOne({
        where: {
            id
        }
    });
    if (!project)
        return next(new AppError(`Project with this id does not exist`, 404));
    if (req.user.username != project.username)
        return next(new AppError(`Not allowed to perform this action`, 403));
    project = await Project.update(req.body,
        {
            where: { id },
            returning: true
        });

    res.status(200).json({
        status: 'success',
        project: project[1][0]
    });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const project = await Project.findOne({
        where: {
            id
        }
    });
    if (!project)
        return next(new AppError(`Project with this id does not exist`, 404));
    if (req.user.username != project.username)
        return next(new AppError(`Not allowed to perform this action`, 403));
    await Project.destroy({
        where: {
            id
        }
    });
    res.status(200).json({
        status: 'success',
        message: 'Project Deleted'
    });
});