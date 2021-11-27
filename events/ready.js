module.exports = client => {
  client.user.setStatus("idle");
  console.log(`${client.user.id}                                                                                                                                                                     `)
client.user.setActivity(`Lrows 🧡`, { type: "PLAYING"});  
};