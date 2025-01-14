const Book = require ('../models/book')

const fs = require('fs');

  exports.getAllBooks = (req, res, next) => {
    Book.find().then(
      (books) => {
        res.status(200).json(books);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.getOneBook = (req, res, next) => {
    Book.findOne({
      _id: req.params.id
    }).then(
      (book) => {
        res.status(200).json(book);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.addBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    book.save()
    .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
  };

  exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message : 'unauthorized request'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Livre modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
  };

  exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message : 'unauthorized request'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
  };
  
  exports.ratingBook = (req, res, next) => {
    const { userId, rating } = req.body;
    if (rating < 0 || rating > 5) {
        res.status(400).json({ error: 'La note doit être comprise entre 0 et 5.' });
    }

    Book.findById(req.params.id)
      .then(book => {

    const userRating = book.ratings.find(elt => elt.userId === userId);

    if (userRating) {
          res.status(400).json({ error: 'Vous avez déjà noté ce livre' });
    } else {

    book.ratings.push({ userId, grade: rating });

    const totalRatings = book.ratings.length;
        
    const totalGrade = book.ratings.reduce((acc, rating) => acc + rating.grade, 0);

    book.averageRating = totalGrade / totalRatings;
  
    book.save()
        .then(updatedBook => {
            res.status(200).json(updatedBook);
        })
        .catch( error => {
            res.status(500).json({ error });
        });
    }});
 };

 exports.bestRatingBook = (req, res, next) => {
  Book.find()
    .sort({averageRating: -1})
    .limit(3)
    .then((books) => {
      res.status(200).json(books);
    }
    ).catch(
      (error) => {
      res.status(400).json({ error });
    }
  );
};