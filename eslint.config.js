import antfu from '@antfu/eslint-config'

export default antfu({
}, {
    rules: {
        'no-console': 'off',
        'no-undef-init': 'off',
        'style/indent': ['error', 4],
        'style/jsx-indent-props': ['error', 4],
        'style/jsx-indent': ['error', 4],
    },
})
