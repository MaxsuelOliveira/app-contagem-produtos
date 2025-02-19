const Login = async (email, password, uuid, device) => {
  return await fetch("https://coletor.webart3.com/login/empresa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password: password,
      uuid,
      describe: device,
    }),
  });
};

export { Login };
