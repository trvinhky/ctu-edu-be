const ROLES = {
    USER: 'user',
    TEACHER: 'teacher',
    ADMIN: 'admin'
}

const TYPE = {
    MULTIPLE: "multiple",
    ONE: "one"
}

const CATEGORY = {
    FILE: "file",
    IMAGE: "image",
    VIDEO: "video",
    AUDIO: "audio"
}

const STATUS = {
    PENDING: 'chờ xác nhận',
    CONFIRM: 'xác nhận',
    CANCEL: 'hủy'
}

module.exports = { ROLES, CATEGORY, TYPE, STATUS }