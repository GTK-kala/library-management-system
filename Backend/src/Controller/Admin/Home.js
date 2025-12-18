export const HomeRoute = (req, res) => {
  return res.status(200).json({
    message: "Server is running on /home route",
  });
};
