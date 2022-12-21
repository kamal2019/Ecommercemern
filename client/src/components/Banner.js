import Carousel from 'react-bootstrap/Carousel';

import  "../index.scss"

function Banner() {
  return (
    <div className='carousels'>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/free-photo/front-view-cyber-monday-shopping-cart-with-bags-copy-space_23-2148657638.jpg?t=st=1657816122~exp=1657816722~hmac=cbfeba137eb5b2efb315a3c380a2add0272ccfcade822edf4c1ec6bc8b396fb4&w=1380"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Our Special Products</h3>
            <p>You can buy with attractive offers</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/free-photo/front-view-online-shopping-concept_23-2148625666.jpg?t=st=1657816126~exp=1657816726~hmac=b02d80423a80300519b9e298ebddc5e5b13667f730d45d62f1394b1b2214444f&w=1060"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/premium-photo/high-angle-online-shopping-with-copy-space_23-2148625673.jpg?w=1060"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Banner;