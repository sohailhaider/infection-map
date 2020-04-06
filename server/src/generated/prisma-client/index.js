"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Visit",
    embedded: false
  },
  {
    name: "Location",
    embedded: false
  },
  {
    name: "Duration",
    embedded: false
  },
  {
    name: "CandidateLocation",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466/maps/dev`,
  secret: `mysecret42`
});
exports.prisma = new exports.Prisma();
