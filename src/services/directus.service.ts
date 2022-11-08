import { Directus } from "@directus/sdk";

//Which db to connect to, and how will user connect/login
export const directus = new Directus("https://v6a8qmt5.directus.app/", {
  auth: {
    mode: "json",
  },
});

//Authentication service. Login, registration etc.
//We create our own logout if we want to change backend service in the future
export const authService = {
  async login(email: string, password: string) {
    return await directus.auth.login({ email, password });
  },

  async logout() {
    return await directus.auth.logout();
  },

  //Read returns everything about user, but we specify here what information we want
  async currentUser() {
    return await directus.users.me.read({
      fields: ["email", "first_name", "avatar"],
    });
  },

  async register(
    firstName: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const createUserResult = await directus.users.createOne({
      first_name: firstName,
      email,
      password,
      role: "b4a6a771-01e8-4c85-9378-f0e99f458281", //Get this from directus, roles and permissions, users url
    });

    return !!createUserResult?.email; //if userresult has email, then the user was registered and return boolean value
  },
};
