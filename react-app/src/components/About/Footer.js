import './index.css'
import { profileLinks1} from './About'


const About = () => {
    const { linkedin: linkedin1, github: github1, email: email1 } = profileLinks1;


    return (
        <footer className="about-footer">
            <div className='about-containers'>
                <span className="about-text">Created by Brandon Vang </span>
                <span className='About1'>
                    <a href={github1} >
                        <i className="fab fa-github"></i>
                    </a>
                    <a href={linkedin1} >
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href={`mailto:${email1}`}>
                        <i className="fas fa-envelope"></i>
                    </a>
                </span>
            </div>

        </footer>
    )
}


export default About
