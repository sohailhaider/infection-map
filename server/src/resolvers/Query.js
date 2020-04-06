module.exports = {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    emailExists: async (parent, args, context) => {
        return context.prisma.$exists.user({
          email: args.email,
        });
    }
}