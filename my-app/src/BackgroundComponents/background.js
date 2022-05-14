import '../App.css';

export default function background() {

return(
    <svg className="blob-svg" width="700" height="600" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"
         filter="url(#blob-filter)">
        <defs>
            <filter id="blob-filter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                               result="goo"/>
                <feBlend in="SourceGraphic" in2="goo"/>
            </filter>
            <mask id="blob-mask">
                <ellipse className="ellipse1"></ellipse>
                <ellipse className="ellipse2"></ellipse>
                <circle className="circle1"></circle>
                <circle className="circle2"></circle>
                <circle className="circle3"></circle>
                <circle className="circle4"></circle>
            </mask>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="matrix(-440.643 439.505 -439.505 -440.643 762.505 247.708)">
                <stop offset="0.2" stop-color="#AD00FF"/>
                <stop offset="1" stop-color="#FFA800"/>
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="600" height="600" mask="url(#blob-mask)" fill="url(#gradient)"/>
    </svg>
    )
}
