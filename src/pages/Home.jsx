import { useNavigate } from "react-router-dom";
import SolarButton from "../components/SolarButton";

function Home() {
    const navigate = useNavigate()
    return (
        <div>
            <h2>SOLAR CALCULATOR</h2>
            <h1>Wondering what solar might cost you?</h1>
            <h3>We’ll estimate your upfront costs, savings, and financing options — no commitment required.</h3>
            <SolarButton />
            <h1>Solar financing</h1>
            <h2>Learn how you can pay over time and make your clean energy dreams a reality. Review your solar financing options today.</h2>
            <p onClick={() => navigate(`/blog`)}>Learn about solar financing</p>
            <h3>Solar tax credits & rebates</h3>
            <h4>We'll help you navigate all of your savings opportunities with our state-specific guide.</h4>

            <p onClick={() => navigate(`/blog`)}>Explore solar credits and rebates </p>
        </div>
         
    )
}

export default Home
         
           
