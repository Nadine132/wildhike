const bcrypt = require("bcryptjs");
const { User } = require("./models"); // Asegúrate de que la ruta sea correcta

const users = [
  { email: "bautistanadin@gmail.com", password: "bautista" },
  { email: "adrianruesca@gmail.com", password: "ruesca" },
  { email: "Antonia@gmail.com", password: "123456" },
];

const hashPasswords = async () => {
  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.update(
        { password: hashedPassword },
        { where: { email: user.email } }
      );
      console.log(`Password for ${user.email} updated successfully!`);
    }
  } catch (error) {
    console.error("Error hashing passwords:", error);
  }
};

// Ejecutar la función
hashPasswords().finally(() => {
  process.exit(0); // Salir del proceso después de que se complete la tarea
});
