const navbar = {
    props: {
        'page' : String,
        'isLoggedIn' : Boolean,
    },
    template: `
        <nav class="col-2 vh-100 sticky-top p-0 d-flex justify-content-between flex-column overflow-scroll">
            <div class="container">
                <a href="/" class="navbar-brand d-block my-4 mx-auto text-center link-light text-decoration-none">
                    <i class="bi bi-egg me-1 fs-3"></i>
                    <span class="fs-3 bold align-middle">LiftingSpirits</span>
                </a>
                <div class="input-group mt-2 my-4">
                    <input class="form-control " type="search" value="Search" id="search">
                    <button class=" input-group-text" type="button">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <a :class="{'nav-link':true, 'active':page=='home'}" href="index.html">
                            <i class="bi bi-house me-2"></i>
                            <span class="align-middle">Home</span>
                        </a>
                    </li>
                    <li class="category mt-4 my-2 ms-1">
                        Discover
                    </li>
                    <li class="nav-item">
                        <a :class="{'nav-link':true, 'active':page=='drinks'}" href="drinks.html">
                            <i class="bi bi-cup-straw me-2"></i>
                            <span class="align-middle">Drinks</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a :class="{'nav-link':true, 'active':page=='events'}" href="events.html">
                            <i class="bi bi-calendar-event me-2"></i>
                            <span class="align-middle">Events</span>
                        </a>
                    </li>
                    <li class="category mt-4 my-2 ms-1">
                        Community
                    </li>
                    <li class="nav-item">
                        <a :class="{'nav-link':true, 'active':page=='friends'}" href="friends.html">
                            <i class="bi bi-people me-2"></i>
                            <span class="align-middle">Friends</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a :class="{'nav-link':true, 'active':page=='chats'}" href="chats.html">
                            <i class="bi bi-chat-left-dots me-2"></i>
                            <span class="align-middle">Chats</span>
                        </a>
                    </li>
                    <li class="category mt-4 my-2 ms-1">
                        Concoctions
                    </li>
                    <li class="nav-item">
                        <a :class="{'nav-link':true, 'active':page=='concoctions'}" href="my-concoctions.html">
                            <i class="bi bi-list-nested me-2"></i>
                            <span class="align-middle">My Concoctions</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a :class="{'nav-link':true, 'active':page=='create'}" href="create-a-concoction.html">
                            <i class="bi bi-plus-square me-2"></i>
                            <span class="align-middle">Create a concoction</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="container">
                <ul class="nav nav-pills flex-column mb-3">
                    <li :class="{'nav-item':true, 'd-none':!isLoggedIn}">
                        <a :class="{'nav-link':true, 'active':page=='profile'}" href="profile.html">
                            <img class="img profile" src="https://t4.ftcdn.net/jpg/05/62/99/31/360_F_562993122_e7pGkeY8yMfXJcRmclsoIjtOoVDDgIlh.jpg">
                            <span class="align-middle">Profile</span>
                        </a>
                    </li>
                    <li :class="{'nav-item':true, 'd-none':!isLoggedIn}">
                        <a :class="{'nav-link':true}" href="#">
                            <i class="bi bi-plus-square me-2"></i>
                            <span class="align-middle">Logout</span>
                        </a>
                    </li>
                    <li :class="{'nav-item':true, 'd-none':isLoggedIn}">
                        <a class="nav-link text-center" href="#">
                            <span class="align-middle">Log in</span>
                        </a>
                    </li>
                    <li :class="{'nav-item':true, 'my-1':true, 'd-none':isLoggedIn}">
                        <a class="nav-link text-center active" href="#">
                            <span class="align-middle">Create an account</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    `
};