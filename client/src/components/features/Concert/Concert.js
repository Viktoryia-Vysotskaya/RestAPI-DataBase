import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadSeatsRequest, getSeats } from '../../../redux/seatsRedux';

import './Concert.scss';

const Concert = ({ performer, price, genre, day, image }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);

  useEffect(() => {

    dispatch(loadSeatsRequest());
  }, [dispatch]);

  // Counting taken and free seats
  const allSeats = 50;
  const takenSeats = seats.filter(seat => seat.day === day).length;
  const freeSeats = allSeats - takenSeats;

  return (
    <article className="concert">
      <Row noGutters>
        <Col xs="6">
          <div className="concert__image-container">
            <img className="concert__image-container__img" src={image} alt={performer} />
          </div>
        </Col>
        <Col xs="6">
          <div className="concert__info">
            <img className="concert__info__back" src={image} alt={performer} />
            <h2 className="concert__info__performer">{performer}</h2>
            <h3 className="concert__info__genre">{genre}</h3>
            <p className="concert__info__tickets">Only {freeSeats} ticket{freeSeats !== 1 ? 's' : ''} left!</p>
            <p className="concert__info__day-n-price">Day: {day}, Price: {price}$</p>
          </div>
        </Col>
      </Row>
    </article>
  );
};

export default Concert;