const User = {
    props: {
        'profileBanner' : String,
        'profileIcon' : String,
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
    `
}
const routes = [
    {path: '/user/:id', component: User},
    {path: '/', component: {template: ""}}
]