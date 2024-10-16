const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient().$extends({
  model: {
    customer: {
      // TODO: Add register and login methods

      async register(email, password) {
        // hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        //then prisma.customer.create..... is this part of the seeding?
        const customer = await prisma.customer.create({
          data: { email, password: hashedPassword },
        });
        return customer;
      },


      async login(email, password) {
        // is this loggin in?
        // why is it happenig here?
        const customer = await prisma.customer.findUniqueOrThrow({
          where: { email },
        });
        
        const valid = await bcrypt.compare(password, customer.password);
        if (!valid) throw Error("Invalid password");
        return customer;

      }
    },
  },
});


module.exports = prisma;
