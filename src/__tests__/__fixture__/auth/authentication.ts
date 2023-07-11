import { faker } from "@faker-js/faker";
export const AuthenticationFakeData = {
  validCredentials: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  invalidCredentials: {
    email: "121Deep1@yahoo.com",
    password: "18oO9wlzQDWCMolU",
  },
  invalidEmail: faker.person.fullName(),
  invalidPassword: faker.person.fullName(),
  shortPassword: faker.internet.password({ length: 7 }),
};
