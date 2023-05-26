const User = require("../infrastructure/entities/user.entity");

const getAllAsync = async () => {
    var users = await User.find();
    var responseList = [];

    users.forEach(user => responseList.push({
        id: user._id,
        email: user.email
    }));

    var listResult = {
        list: responseList,
        totalCount: responseList.length
    };

    return listResult;
};

const getByIdAsync = async (userId) => {
    var user = await User.findById(userId);
    if (!user) {
        throw {
            statusCode: 404,
            message: `User with { id: "${userId}" } does not exist.`
        };
    }

    var userResult = {
        id: user._id,
        email: user.email
    };

    return userResult;
};

const updateAsync = async (userId, userInput) => {
    var user = await User.findById(userId);
    if (!user) {
        throw {
            statusCode: 404,
            message: `User with { id: "${userId}" } does not exist.`
        };
    }

    if (userInput.email != user.email) {
        var userWithSameEmail = await User.findOne({ email: userInput.email });
        if (userWithSameEmail) {
            throw {
                statusCode: 400,
                message: `User with { email: "${userInput.email} } already exists.`
            };
        }

        user.email = userInput.email;
    }
    
    await user.save();
};

const deleteByIdAsync = async (userId) => {
    var user = await User.findById(userId);
    if (!user) {
        throw {
            statusCode: 404,
            message: `User with { id: "${userId}" } does not exist.`
        };
    }

    await User.findByIdAndDelete(userId);
};

module.exports.getAllAsync = getAllAsync;
module.exports.getByIdAsync = getByIdAsync;
module.exports.updateAsync = updateAsync;
module.exports.deleteByIdAsync = deleteByIdAsync;