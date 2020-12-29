const getCleanUsers = users => {
    if (!Array.isArray(users)) users = [users]

    return users.map( user => {
        const {name,email} = user;
        const id = user._id; 
            return {id,name,email};
    })
}
module.exports = {getCleanUsers}