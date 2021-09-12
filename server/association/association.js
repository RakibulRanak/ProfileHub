const User = require('../models/UserModel');
const WorkExperience = require('../models/WorkExperienceModel');
const Credential = require('../models/CredentialModel');
const Education = require('../models/EducationModel');
const Project = require('../models/ProjectModel');


User.hasMany(Project, { foreignKey: { name: 'username', allowNull: false } })
Project.belongsTo(User, { foreignKey: { name: 'username', allowNull: false } })

User.hasMany(Education, { foreignKey: { name: 'username', allowNull: false } })
Education.belongsTo(User, { foreignKey: { name: 'username', allowNull: false } })
User.hasOne(Credential, { foreignKey: { name: 'username', allowNull: false } })
Credential.belongsTo(User, { foreignKey: { name: 'username', allowNull: false } })

//User.hasMany(Achievement, { foreignKey: { name: "username", allowNull: false } });
User.hasMany(WorkExperience, { foreignKey: { name: "username", allowNull: false } });
WorkExperience.belongsTo(User, { foreignKey: { name: 'username', allowNull: false } });

