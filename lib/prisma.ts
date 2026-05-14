import "dotenv/config";
// import { PrismaClient } from "../generated/prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };