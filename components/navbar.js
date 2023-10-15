Vue.component('vertical-navbar', {
    template: `
        <nav class="col-2 position-fixed h-100 px-5/2">
            <a href="/" class="navbar-brand d-block my-5 mx-auto text-center link-light text-decoration-none">
                <i class="bi bi-egg me-2 fs-3"></i>
                <span class="fs-3 bold align-middle">LiftingSpirits</span>
            </a>
            <div class="input-group mt-2 my-4">
                <input class="form-control " type="search" value="Search" id="example-search-input">
                <button class=" input-group-text" type="button">
                    <i class="bi bi-search"></i>
                </button>
            </div>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="#">
                    <i class="bi bi-house me-2"></i>
                    <span class="align-middle">Home</span></a>
                </li>
                <li class="category mt-4 my-2 ms-1">
                    Discover
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="bi bi-cup-straw me-2"></i>
                        <span class="align-middle">Drinks</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="bi bi-calendar-event me-2"></i>
                        <span class="align-middle">Events</span>
                    </a>
                </li>
                <li class="category mt-4 my-2 ms-1">
                    Community
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                    <i class="bi bi-people me-2"></i>
                    <span class="align-middle">Friends</span>
                </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                    <i class="bi bi-chat-left-dots me-2"></i>
                    <span class="align-middle">Chats</span>
                </a>
                </li>
                <li class="category mt-4 my-2 ms-1">
                    Concoctions
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                    <i class="bi bi-list-nested me-2"></i>
                    <span class="align-middle">My Concoctions</span>
                </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                    <i class="bi bi-plus-square me-2"></i>
                    <span class="align-middle">Create a concoction</span>
                </a>
                </li>
            </ul>
        </nav>
    `
});