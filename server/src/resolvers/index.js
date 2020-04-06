const Query = require('./Query.js')
const Mutation = require('./Mutation.js')

module.exports = {
    Query,
    Mutation,
    User: {
        visits: async ({id}, args, context) => {
            return context.prisma.user({id}).visits();
        }
    },
    Visit: {
        location: async({id}, args, context) => {
            return context.prisma.visit({id}).location();
        },
        duration: async({id}, args, context) => {
            return context.prisma.visit({id}).duration();
        },
        user: async({id}, args, context) => {
            return context.prisma.visit({id}).user();
        },
    },
    Location: {
        visit: async({id}, args, context) => {
            return context.prisma.location({id}).visit();
        },
    },
    Duration: {
        visit: async({id}, args, context) => {
            return context.prisma.duration({id}).visit();
        }
    }
}