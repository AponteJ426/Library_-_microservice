import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (

        <div className="bg-gray-100 p-4 ">
            <Slider {...settings}>
                <div >
                    <img
                        src="/sextoPisoEdi.png"
                        alt="sextoPiso Editorial"
                        className="h-35 w-20 mx-2  px-2 "

                    />
                </div>
                <div>
                    <img
                        src="/teseoEdi.png"
                        alt="teseo Editorial"
                        className="h-20 w-35 mx-2  px-2"

                    />
                </div>
                <div>
                    <img
                        src="/eLibroEdi.png"
                        alt="eLibro Editorial"
                        className="h-20  w-35 mx-2  px-4"

                    />
                </div>
                <div>
                    <img
                        src="/educacionEdi.png"
                        alt="educacion Editorial"
                        className="h-20 w-35 mx-2  "

                    />
                </div>
                <div>
                    <img
                        src="/octaedroEdi.png"
                        alt="octaedro Editorial"
                        className="h-30 w-35   "

                    />
                </div>
                <div>
                    <img
                        src="/libroTotalEdi.png"
                        alt="libroTotal Editorial"
                        className="h-25 w-35 mx-2  "

                    />
                </div>
            </Slider>
        </div>
    );
}

export default HomePage;
