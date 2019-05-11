module.exports = {
    success: (text, data) => {
        return {
            result: true,
            text: text,
            data: data
        }
    },
    fail: (detail) => {
        return {
            result: false,
            detail: detail,
        }
    }
}