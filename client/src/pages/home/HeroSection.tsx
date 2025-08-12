import { Button } from "@mui/material";


const ButtonStyle = {
    backgroundColor: '#00BCD4',
    '&:hover': {
        backgroundColor: '#0097A7',
    },
    borderRadius: '30px 35px',
    color: 'white',
    padding: '0.5rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
};
const HeroSection = () => {
    return (
        <section className="w-full bg-[#F8F8F8]  py-15">
            <div className="max-w-screen-xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Bienvenido a su Biblioteca Virtual
                </h1>
                <p className="text-gray-600 mb-8">
                    Tu biblioteca nunca lució tan bien.<br />
                    Libros de ciencia, matemáticas, tecnología y muchos más.
                </p>
                <Button sx={ButtonStyle} className="hover:transform hover:scale-102 transition duration-300 ease-in-out  ">
                    Comenzar
                </Button>
            </div>
        </section>
    );
};

export default HeroSection;
