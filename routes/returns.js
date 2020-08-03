import Joi from "joi";
import validate from "../middleware/validate.js";
import { Rental } from "../models/rental.js";
import { Movie } from "../models/movie.js";
import auth from "../middleware/auth.js";
import express from "express";
const router = express.Router();

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send("Rental not found.");

  if (rental.dateReturned)
    return res.status(400).send("Return already processed.");

  rental.return();
  await rental.save();

  await Movie.update(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.send(rental);
});

function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate(req, schema);
}

export default router;
