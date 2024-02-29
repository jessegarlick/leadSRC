import BuyerForm from "../components/BuyerForm.jsx";
 
function Solar() {
    return (
        <div>
            <div >
                <h2>Join us in pioneering a cleaner, more sustainable future powered by the sun!</h2>
            </div>

            <div>
                <h3>Fill out our survey</h3>
                <h5>In minutes, your query will be sent to pre-screened and trustworthy installers in your area. Your contact information will stay private.</h5>
            </div>

            <div>
                <h3>Review your quotes</h3>
                <h5>Installers in your area will build out customized pricing options sent right to your EnergySage dashboard.</h5>
            </div>

            <div>
                <h3>Compare & save</h3>
                <h5>You're in control. Choose the quote that's the right fit for you.</h5>
            </div>
            <BuyerForm />
        </div>
    )
}

export default Solar