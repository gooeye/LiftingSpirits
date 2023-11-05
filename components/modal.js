export default {
    props: {
        show: Boolean
    },
    template: `
    <transition name="modal">
        <div v-if="show" class="modal-mask">
        <div class="modal-container rounded-xl">
            <div class="modal-header">
            <slot name="header">default header</slot>
            </div>

            <div class="modal-body">
            <slot name="body">default body</slot>
            </div>

            <div class="modal-footer">
            <slot name="footer">
                default footer
                </slot>
            <button class="btn btn-primary"
            @click="$emit('close')"
            >OK</button>
            </div>
        </div>
        </div>
    </transition>
    `
}
