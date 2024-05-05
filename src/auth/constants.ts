export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  options: { expiresIn: process.env.JWT_LIFETIME },
};

export const uilBaseUrl = process.env.UIL_BASE_URL;
