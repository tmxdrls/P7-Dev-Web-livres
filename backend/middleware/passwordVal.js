const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
  .is().min(8,"Mot de passe trop court, 8 caractères minimum !")
  .is().max(25, "Mot de passe trop long, 25 caractères maximum !")
  .has().uppercase(2, "Il manque des majuscules, 2 minimum !")
  .has().digits(2, "Veuillez inclure au moins 2 chiffres dans votre mot de passe")
  .has().not().spaces();

  exports.validPassword = (req, res, next) => {
    const password = req.body.password;
    if (schema.validate(password)) {
        next();
    } else {
      res.status(400).json({ error: 'Le mot de passe ne respecte pas les critères de validation.' });
    }
  };


