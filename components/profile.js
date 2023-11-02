const User = {
    props: {
        'profileBanner' : String,
        'profileIcon' : String,
        <!-- 'drinks'    : Object -->
    },
    template: `
        <div :style="{height: '200px', backgroundImage: 'url(' + profileBanner + ')',  backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}" class="position-relative">
            <div class="position-absolute bottom-0 left p-3 ps-5 w-100 d-flex align-items-center">
                <div :style="{height: '100px', width: '100px', backgroundImage: 'url(' + profileIcon + ')',  backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}" class="rounded-circle border border-2 d-inline-block"></div>
                <div class="d-inline-block flex-column justify-center ms-3">
                    <h1 class="d-block fs-4 text-capitalize">{{ $route.params.id }}</h1>
                    <button class="btn btn-secondary d-block">{{1 ? "Edit" : "2"}}</button>
                </div>
            </div>
        </div>
        <div class="container sticky-top background2">
            <nav class="navbar navbar-expand">
                <div class="container-fluid justify-content-center">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link active link-fancy" aria-current="page" href="#activity">Activity</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link link-fancy" href="#list">List</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link link-fancy" href="#tracking">Tracking</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="container px-5">
            <div class="container rounded-3 background3 p-4 shadow-sm mb-4" id="activity">
                Activity Placeholder
            </div>
            <div class="container rounded-3 background3 p-4 shadow-sm mb-4" id="list">
                List Placeholder
                <table>
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">Name of Drink</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Type of Drink</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
            <div class="container rounded-3 background3 p-4 shadow-sm mb-4" id="tracking">
                
            </div>
        </div>
    `
}
const routes = [
    {path: '/user/:id', component: User},
    {path: '/', component: {template: ""}}
]