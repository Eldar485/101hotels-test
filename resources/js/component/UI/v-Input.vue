<template>
    <div :class="styleType">
        <input :placeholder="placeholder" :type="type" :value="value" @input="updateInput">
    </div>
</template>

<script>
export default {
    name: 'v-input',
    props: {
        value: [String, Number, Object],
        styleType: {
            type: String,
            required: true,
            default: () => 'input-text'
        },
        placeholder: {
            type: String
        },
        type: {
            type: String
        }
    },
    methods: {
        updateInput(event) {
            this.$emit('update:value', event.target.value)
        }
    }
}
</script>

<style scoped lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}

:active, :hover, :focus {
    outline: 0;
    outline-offset: 0;
}

.input-count {
    input {
        font-weight: 500;
        max-width: 4rem;
        max-height: 4rem;
        width: 100%;
        height: 100%;
        text-align: center;
    }
}

.input-text {
    input {
        font-weight: 500;
        width: 100%;
        border: 0;
        border-bottom: 1px solid black;
        padding-bottom: 1rem;
        font-size: 1.06rem;

        &:focus, :active {
            border-bottom: 1px solid black;
        }
    }
}

.input-message {
    input {
        font-weight: 500;
        width: 100%;
        border: 0;
        border-bottom: 1px solid black;
        padding-bottom: 6.875rem;
        font-size: 1.06rem;

        &:focus, :active {
            border-bottom: 1px solid black;
        }
    }
}

.input-file {

}

</style>
