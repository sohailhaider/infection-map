const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../../utils.js');


async function signup(parent, args, context) {
  
  const userExists = await context.prisma.$exists.user({
          email: args.email,
        });
  if (userExists) {
    throw new Error('Email already exists, try login.')
  }
  
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({ ...args, password })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}

async function addVisit(parent, args, context) {
    const userId = getUserId(context);
    return context.prisma.createVisit({
      placeConfidence: args.placeConfidence, 
      centerLatE7: args.centerLatE7, 
      centerLngE7: args.centerLngE7, 
      visitConfidence: args.visitConfidence,
      user: {connect: {id: userId}}
    });
}

async function addLocation(parent, args, context) {
  return context.prisma.createLocation({
    latitudeE7: args.latitudeE7,
    longitudeE7: args.longitudeE7,
    placeId: args.placeId,
    address: args.address,
    name: args.name,
    sourceInfo: args.sourceInfo,
    visit: {connect: {id: args.visitId}}
  });
}

async function addDuration(parent, args, context) {
  return context.prisma.createDuration({
    startTimestampMs: args.startTimestampMs, 
    endTimestampMs: args.startTimestampMs,
    visit: {connect: {id: args.visitId}}
  })
}

async function deleteUserVisits(parent, args, context) {
  const userId = getUserId(context);
  await context.prisma.deleteManyLocations({
    visit: {
      user: {
        id: userId
      }
    }
  })
  await context.prisma.deleteManyDurations({
    visit: {
      user: {
        id: userId
      }
    }
  });
  const response = await context.prisma.deleteManyVisits({
    user: 
    {
      id: userId
    }
  });
  return response.count;
}

module.exports = {
    login,
    signup,
    addVisit,
    addLocation,
    addDuration,
    deleteUserVisits
}