const getRecipionEmail = (chatUsers, user) =>
  chatUsers?.filter((dataEmail) => dataEmail !== user.email)[0];

export default getRecipionEmail;
