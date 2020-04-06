
const { APP_SECRET, getUserId } = require('../../utils.js');

module.exports = {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    emailExists: async (parent, args, context) => {
        return context.prisma.$exists.user({
          email: args.email,
        });
    },
    getUserVisits: async (parent, args, context) => {
        const userId = getUserId(context); 
        return context.prisma.user({id: userId}).visits();
    },
    getAllVisits: async (parent, args, context) => {
        return context.prisma.visits();
    }
}