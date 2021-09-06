const User = require('../models/UserModel');
const WorkExperience = require('../models/WorkExperienceModel');
const Role = require('../models/RoleModel');
const Credential = require('../models/CredentialModel');
const Education = require('../models/EducationModel');



User.hasMany(Education, { foreignKey: { name: 'reg_no', allowNull: false } })
Education.belongsTo(User, { foreignKey: { name: 'reg_no', allowNull: false } })
User.hasOne(Credential, { foreignKey: { name: 'reg_no', allowNull: false } })
Credential.belongsTo(User, { foreignKey: { name: 'reg_no', allowNull: false } })

User.hasMany(Role, { foreignKey: { name: "reg_no", allowNull: false } });
//User.hasMany(Achievement, { foreignKey: { name: "reg_no", allowNull: false } });
User.hasMany(WorkExperience, { foreignKey: { name: "reg_no", allowNull: false } });
WorkExperience.belongsTo(User, { foreignKey: { name: 'reg_no', allowNull: false } });
Role.belongsTo(User, { foreignKey: { name: 'reg_no', allowNull: false } })
