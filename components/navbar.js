import { username } from "/js/check_login.js"
export default {
    props: {
        'page' : String,
        'isLoggedIn' : Boolean,
    },
    data () {
        return {
            username
        }
    },
    template: `
        <nav class="col-md-3 col-lg-2 col-12 navbar navbar-expand-md sticky-top p-0 d-flex justify-content-between flex-column background" id="sidebar" style="">
            <div class="col-12 d-flex flex-column justify-content-between p-2 h-100">
                <div class="w-75 row col-sm-11 col-md-12 navbar-brand d-md-block my-3 fs-5 align-self-center text-md-center text-left">
                    <div class="col-10 col-md-12 d-flex flex-column justify-content-center mx-auto">

                        <a class="text-decoration-none">
                            <i class="bi bi-egg me-1"></i>
                            <span class="font-weight-bold">LiftingSpirits</span>
                        </a>
                    </div>
                    <button class="navbar-toggler col-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" aria-controls="collapsibleNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse flex-column justify-content-between h-100" id="collapsibleNavbar">
                    <ul class="col-12 nav nav-pills flex-column mb-auto">
                        <li class="nav-item">
                            <a :class="{'nav-link':true, 'active':page=='home'}" href="/">
                                <i class="bi bi-house me-2"></i>
                                <span class="align-middle">Home</span>
                            </a>
                        </li>
                        <li class="category mt-3 my-2 ms-1">
                            Discover
                        </li>
                        <li class="nav-item">
                            <a :class="{'nav-link':true, 'active':page=='drinks'}" href="/drinks.html">
                                <i class="bi bi-cup-straw me-2"></i>
                                <span class="align-middle">Drinks</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a :class="{'nav-link':true, 'active':page=='events'}" href="/events.html">
                                <i class="bi bi-calendar-event me-2"></i>
                                <span class="align-middle">Events</span>
                            </a>
                        </li>
                        <li class="category mt-3 my-2 ms-1">
                            Community
                        </li>
                        <li class="nav-item">
                            <a :class="{'nav-link':true, 'active':page=='friends'}" href="/friends.html">
                                <i class="bi bi-people me-2"></i>
                                <span class="align-middle">Activity</span>
                            </a>
                        </li>
                        <li class="category mt-3 my-2 ms-1">
                            Concoctions
                        </li>
                        <li class="nav-item">
                            <a :class="{'nav-link':true, 'active':page=='concoctions'}" href="/my_concoctions.html">
                                <i class="bi bi-list-nested me-2"></i>
                                <span class="align-middle">My Concoctions</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a :class="{'nav-link':true, 'active':page=='create'}" href="/create_concoction.html">
                                <i class="bi bi-plus-square me-2"></i>
                                <span class="align-middle">Create a concoction</span>
                            </a>
                        </li>
                    </ul>
                    <div class="container p-0">
                        <ul class="col-12 nav nav-pills flex-column mb-3">
                            <li :class="{'nav-item':true, 'd-none':!isLoggedIn}" @click="$emit('navigate')">
                                <router-link :class="{'nav-link':true, 'active':page=='profile'}" :to="'/user/'+username">
                                    <i class="bi bi-person me-2"></i>
                                    <span class="align-middle pl-1">Profile</span>
                                </router-link>
                            </li>
                            <li :class="{'nav-item':true, 'd-none':!isLoggedIn}">
                                <a :class="{'nav-link':true}" href="login.html">
                                    <i class="bi bi-plus-square me-2"></i>
                                    <span class="align-middle">Logout</span>
                                </a>
                            </li>
                            <li :class="{'nav-item':true, 'd-none':isLoggedIn}">
                                <a class="nav-link text-center" href="/login.html">
                                    <span class="align-middle">Log in</span>
                                </a>
                            </li>
                            <li :class="{'nav-item':true, 'my-1':true, 'd-none':isLoggedIn}">
                                <a class="nav-link text-center active" href="/register.html">
                                    <span class="align-middle">Create an account</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    `
};