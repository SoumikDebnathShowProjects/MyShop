export const isAdminUser = (auth) => {
  return auth?.user?.role === "admin";
};
