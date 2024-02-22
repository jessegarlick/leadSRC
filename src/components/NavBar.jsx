export default function NavBar() {
    return (
        <div>
            <nav>
                <h1>Lead SRC</h1>
                <NavLink to="/">Home</NavLink>
                <NavLink to="solar">Go Solar</NavLink>
                <NavLink to="process">Our Process</NavLink>
                <NavLink to="about">About</NavLink>
                <NavLink to="leads">Buy Leads</NavLink>
                <NavLink to="contact">Contact Us</NavLink>


            </nav>
        </div>
    )
}